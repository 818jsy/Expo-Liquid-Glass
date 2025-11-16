export interface LiquidGlassOptions {
    blurRadius?: number;
    saturation?: number;
    brightness?: number;
    lensRadius?: number;
    lensIntensity?: number;
    surfaceAlpha?: number;
}
declare class LiquidGlassModule {
    /**
     * LiquidGlass 효과를 View에 적용합니다
     * @param viewTag React Native View의 태그 (ref를 통해 얻을 수 있음)
     * @param options LiquidGlass 효과 옵션
     */
    applyEffect(viewTag: number, options?: LiquidGlassOptions): Promise<void>;
    /**
     * LiquidGlass 효과를 제거합니다
     * @param viewTag React Native View의 태그
     */
    removeEffect(viewTag: number): Promise<void>;
    /**
     * LiquidGlass 효과를 업데이트합니다
     * @param viewTag React Native View의 태그
     * @param options 업데이트할 LiquidGlass 효과 옵션
     */
    updateEffect(viewTag: number, options: LiquidGlassOptions): Promise<void>;
}
export declare const LiquidGlass: LiquidGlassModule;
export { LiquidGlassView } from './LiquidGlassView';
