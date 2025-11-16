package expo.modules.liquidglass

import android.view.View
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.UIManagerModule
// TODO: AndroidLiquidGlass 라이브러리를 추가한 후 아래 import의 주석을 해제하세요
// import com.kyant.liquidglass.LiquidGlass
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class ExpoLiquidGlassModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    // TODO: AndroidLiquidGlass 라이브러리를 추가한 후 아래 타입의 주석을 해제하세요
    // private val liquidGlassInstances = mutableMapOf<Int, LiquidGlass>()

    override fun getName(): String {
        return "ExpoLiquidGlass"
    }

    @ReactMethod
    fun applyEffect(viewTag: Int, options: ReadableMap?, promise: Promise) {
        promise.reject("NOT_IMPLEMENTED", "AndroidLiquidGlass 라이브러리를 먼저 추가해주세요. android/build.gradle 파일을 확인하세요.")
        
        /* TODO: AndroidLiquidGlass 라이브러리를 추가한 후 아래 코드의 주석을 해제하세요
        try {
            val uiManager = reactApplicationContext.getNativeModule(UIManagerModule::class.java)
            uiManager?.addUIBlock { nativeViewHierarchyManager ->
                val view = nativeViewHierarchyManager.resolveView(viewTag)
                if (view == null) {
                    promise.reject("VIEW_NOT_FOUND", "View with tag $viewTag not found")
                    return@addUIBlock
                }

                CoroutineScope(Dispatchers.Main).launch {
                    try {
                        val liquidGlass = LiquidGlass(view)
                        
                        // 옵션 적용
                        options?.let { opts ->
                            if (opts.hasKey("blurRadius")) {
                                liquidGlass.blurRadius = opts.getDouble("blurRadius").toFloat()
                            }
                            if (opts.hasKey("saturation")) {
                                liquidGlass.saturation = opts.getDouble("saturation").toFloat()
                            }
                            if (opts.hasKey("brightness")) {
                                liquidGlass.brightness = opts.getDouble("brightness").toFloat()
                            }
                            if (opts.hasKey("noise")) {
                                liquidGlass.noise = opts.getDouble("noise").toFloat()
                            }
                            if (opts.hasKey("turbulence")) {
                                liquidGlass.turbulence = opts.getDouble("turbulence").toFloat()
                            }
                            if (opts.hasKey("distortion")) {
                                liquidGlass.distortion = opts.getDouble("distortion").toFloat()
                            }
                        }

                        liquidGlassInstances[viewTag] = liquidGlass
                        promise.resolve(null)
                    } catch (e: Exception) {
                        promise.reject("APPLY_ERROR", "Failed to apply LiquidGlass effect: ${e.message}", e)
                    }
                }
            }
        } catch (e: Exception) {
            promise.reject("ERROR", "Error applying LiquidGlass effect: ${e.message}", e)
        }
        */
    }

    @ReactMethod
    fun removeEffect(viewTag: Int, promise: Promise) {
        promise.reject("NOT_IMPLEMENTED", "AndroidLiquidGlass 라이브러리를 먼저 추가해주세요.")
        
        /* TODO: AndroidLiquidGlass 라이브러리를 추가한 후 아래 코드의 주석을 해제하세요
        try {
            val liquidGlass = liquidGlassInstances.remove(viewTag)
            if (liquidGlass != null) {
                CoroutineScope(Dispatchers.Main).launch {
                    try {
                        liquidGlass.release()
                        promise.resolve(null)
                    } catch (e: Exception) {
                        promise.reject("REMOVE_ERROR", "Failed to remove LiquidGlass effect: ${e.message}", e)
                    }
                }
            } else {
                promise.resolve(null)
            }
        } catch (e: Exception) {
            promise.reject("ERROR", "Error removing LiquidGlass effect: ${e.message}", e)
        }
        */
    }

    @ReactMethod
    fun updateEffect(viewTag: Int, options: ReadableMap, promise: Promise) {
        promise.reject("NOT_IMPLEMENTED", "AndroidLiquidGlass 라이브러리를 먼저 추가해주세요.")
        
        /* TODO: AndroidLiquidGlass 라이브러리를 추가한 후 아래 코드의 주석을 해제하세요
        try {
            val liquidGlass = liquidGlassInstances[viewTag]
            if (liquidGlass == null) {
                promise.reject("NOT_FOUND", "LiquidGlass effect not found for view tag $viewTag")
                return
            }

            CoroutineScope(Dispatchers.Main).launch {
                try {
                    if (options.hasKey("blurRadius")) {
                        liquidGlass.blurRadius = options.getDouble("blurRadius").toFloat()
                    }
                    if (options.hasKey("saturation")) {
                        liquidGlass.saturation = options.getDouble("saturation").toFloat()
                    }
                    if (options.hasKey("brightness")) {
                        liquidGlass.brightness = options.getDouble("brightness").toFloat()
                    }
                    if (options.hasKey("noise")) {
                        liquidGlass.noise = options.getDouble("noise").toFloat()
                    }
                    if (options.hasKey("turbulence")) {
                        liquidGlass.turbulence = options.getDouble("turbulence").toFloat()
                    }
                    if (options.hasKey("distortion")) {
                        liquidGlass.distortion = options.getDouble("distortion").toFloat()
                    }
                    
                    promise.resolve(null)
                } catch (e: Exception) {
                    promise.reject("UPDATE_ERROR", "Failed to update LiquidGlass effect: ${e.message}", e)
                }
            }
        } catch (e: Exception) {
            promise.reject("ERROR", "Error updating LiquidGlass effect: ${e.message}", e)
        }
        */
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        // TODO: AndroidLiquidGlass 라이브러리를 추가한 후 아래 코드의 주석을 해제하세요
        // liquidGlassInstances.values.forEach { it.release() }
        // liquidGlassInstances.clear()
    }
}
