package expo.modules.liquidglass

import android.view.ViewGroup
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.ComposeView
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.UIManagerModule
import io.github.kyant0.backdrop.drawBackdrop
import io.github.kyant0.backdrop.lens
import io.github.kyant0.backdrop.rememberLayerBackdrop
import io.github.kyant0.backdrop.vibrancy
import io.github.kyant0.backdrop.blur
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

data class LiquidGlassOptions(
    val blurRadius: Float = 16f,
    val saturation: Float = 1.0f,
    val brightness: Float = 1.0f,
    val lensRadius: Float = 16f,
    val lensIntensity: Float = 32f,
    val surfaceAlpha: Float = 0.3f
)

class ExpoLiquidGlassModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val liquidGlassOverlays = mutableMapOf<Int, ComposeView>()
    private val liquidGlassOptions = mutableMapOf<Int, LiquidGlassOptions>()

    override fun getName(): String {
        return "ExpoLiquidGlass"
    }

    @ReactMethod
    fun applyEffect(viewTag: Int, options: ReadableMap?, promise: Promise) {
        try {
            val uiManager = reactApplicationContext.getNativeModule(UIManagerModule::class.java)
            uiManager?.addUIBlock { nativeViewHierarchyManager ->
                val view = nativeViewHierarchyManager.resolveView(viewTag)
                if (view == null) {
                    promise.reject("VIEW_NOT_FOUND", "View with tag $viewTag not found")
                    return@addUIBlock
                }

                if (view !is ViewGroup) {
                    promise.reject("INVALID_VIEW", "View must be a ViewGroup to apply LiquidGlass effect")
                    return@addUIBlock
                }

                CoroutineScope(Dispatchers.Main).launch {
                    try {
                        // 옵션 파싱
                        val opts = parseOptions(options)
                        liquidGlassOptions[viewTag] = opts

                        // 기존 오버레이 제거
                        liquidGlassOverlays[viewTag]?.let { overlay ->
                            view.removeView(overlay)
                        }

                        // ComposeView 오버레이 생성
                        val activity = reactContext.currentActivity
                        if (activity == null) {
                            promise.reject("NO_ACTIVITY", "Current activity is null")
                            return@launch
                        }
                        
                        val composeView = ComposeView(activity).apply {
                            setContent {
                                LiquidGlassOverlay(opts)
                            }
                        }

                        // 오버레이를 View 위에 추가
                        view.addView(composeView)
                        liquidGlassOverlays[viewTag] = composeView

                        promise.resolve(null)
                    } catch (e: Exception) {
                        promise.reject("APPLY_ERROR", "Failed to apply LiquidGlass effect: ${e.message}", e)
                    }
                }
            }
        } catch (e: Exception) {
            promise.reject("ERROR", "Error applying LiquidGlass effect: ${e.message}", e)
        }
    }

    @ReactMethod
    fun removeEffect(viewTag: Int, promise: Promise) {
        try {
            val uiManager = reactApplicationContext.getNativeModule(UIManagerModule::class.java)
            uiManager?.addUIBlock { nativeViewHierarchyManager ->
                val view = nativeViewHierarchyManager.resolveView(viewTag)
                
                CoroutineScope(Dispatchers.Main).launch {
                    try {
                        liquidGlassOverlays[viewTag]?.let { overlay ->
                            if (view is ViewGroup) {
                                view.removeView(overlay)
                            }
                        }
                        liquidGlassOverlays.remove(viewTag)
                        liquidGlassOptions.remove(viewTag)
                        promise.resolve(null)
                    } catch (e: Exception) {
                        promise.reject("REMOVE_ERROR", "Failed to remove LiquidGlass effect: ${e.message}", e)
                    }
                }
            }
        } catch (e: Exception) {
            promise.reject("ERROR", "Error removing LiquidGlass effect: ${e.message}", e)
        }
    }

    @ReactMethod
    fun updateEffect(viewTag: Int, options: ReadableMap, promise: Promise) {
        try {
            if (!liquidGlassOverlays.containsKey(viewTag)) {
                promise.reject("NOT_FOUND", "LiquidGlass effect not found for view tag $viewTag")
                return
            }

            val opts = parseOptions(options)
            liquidGlassOptions[viewTag] = opts

            val uiManager = reactApplicationContext.getNativeModule(UIManagerModule::class.java)
            uiManager?.addUIBlock { nativeViewHierarchyManager ->
                CoroutineScope(Dispatchers.Main).launch {
                    try {
                        liquidGlassOverlays[viewTag]?.let { composeView ->
                            composeView.setContent {
                                LiquidGlassOverlay(opts)
                            }
                        }
                        promise.resolve(null)
                    } catch (e: Exception) {
                        promise.reject("UPDATE_ERROR", "Failed to update LiquidGlass effect: ${e.message}", e)
                    }
                }
            }
        } catch (e: Exception) {
            promise.reject("ERROR", "Error updating LiquidGlass effect: ${e.message}", e)
        }
    }

    private fun parseOptions(options: ReadableMap?): LiquidGlassOptions {
        return LiquidGlassOptions(
            blurRadius = options?.getDouble("blurRadius")?.toFloat() ?: 16f,
            saturation = options?.getDouble("saturation")?.toFloat() ?: 1.0f,
            brightness = options?.getDouble("brightness")?.toFloat() ?: 1.0f,
            lensRadius = options?.getDouble("lensRadius")?.toFloat() ?: 16f,
            lensIntensity = options?.getDouble("lensIntensity")?.toFloat() ?: 32f,
            surfaceAlpha = options?.getDouble("surfaceAlpha")?.toFloat() ?: 0.3f
        )
    }

    @Composable
    private fun LiquidGlassOverlay(options: LiquidGlassOptions) {
        val backdrop = rememberLayerBackdrop {
            drawContent()
        }

        Box(
            modifier = Modifier
                .fillMaxSize()
                .drawBackdrop(
                    backdrop = backdrop,
                    effects = {
                        vibrancy()
                        blur(options.blurRadius)
                        lens(options.lensRadius, options.lensIntensity)
                    },
                    onDrawSurface = {
                        drawRect(Color.White.copy(alpha = options.surfaceAlpha))
                    }
                )
        )
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        liquidGlassOverlays.clear()
        liquidGlassOptions.clear()
    }
}
