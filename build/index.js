"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiquidGlassView = exports.LiquidGlass = void 0;
const react_native_1 = require("react-native");
const { ExpoLiquidGlass } = react_native_1.NativeModules;
class LiquidGlassModule {
    /**
     * LiquidGlass 효과를 View에 적용합니다
     * @param viewTag React Native View의 태그 (ref를 통해 얻을 수 있음)
     * @param options LiquidGlass 효과 옵션
     */
    async applyEffect(viewTag, options) {
        if (react_native_1.Platform.OS !== 'android') {
            throw new Error('LiquidGlass is only supported on Android');
        }
        if (!ExpoLiquidGlass) {
            throw new Error('ExpoLiquidGlass native module is not available');
        }
        return ExpoLiquidGlass.applyEffect(viewTag, options || {});
    }
    /**
     * LiquidGlass 효과를 제거합니다
     * @param viewTag React Native View의 태그
     */
    async removeEffect(viewTag) {
        if (react_native_1.Platform.OS !== 'android') {
            throw new Error('LiquidGlass is only supported on Android');
        }
        if (!ExpoLiquidGlass) {
            throw new Error('ExpoLiquidGlass native module is not available');
        }
        return ExpoLiquidGlass.removeEffect(viewTag);
    }
    /**
     * LiquidGlass 효과를 업데이트합니다
     * @param viewTag React Native View의 태그
     * @param options 업데이트할 LiquidGlass 효과 옵션
     */
    async updateEffect(viewTag, options) {
        if (react_native_1.Platform.OS !== 'android') {
            throw new Error('LiquidGlass is only supported on Android');
        }
        if (!ExpoLiquidGlass) {
            throw new Error('ExpoLiquidGlass native module is not available');
        }
        return ExpoLiquidGlass.updateEffect(viewTag, options);
    }
}
exports.LiquidGlass = new LiquidGlassModule();
var LiquidGlassView_1 = require("./LiquidGlassView");
Object.defineProperty(exports, "LiquidGlassView", { enumerable: true, get: function () { return LiquidGlassView_1.LiquidGlassView; } });
