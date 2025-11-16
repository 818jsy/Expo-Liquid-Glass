import { NativeModules, Platform } from 'react-native';

const { ExpoLiquidGlass } = NativeModules;

export interface LiquidGlassOptions {
  blurRadius?: number;
  saturation?: number;
  brightness?: number;
  lensRadius?: number;
  lensIntensity?: number;
  surfaceAlpha?: number;
}

class LiquidGlassModule {
  /**
   * LiquidGlass 효과를 View에 적용합니다
   * @param viewTag React Native View의 태그 (ref를 통해 얻을 수 있음)
   * @param options LiquidGlass 효과 옵션
   */
  async applyEffect(
    viewTag: number,
    options?: LiquidGlassOptions
  ): Promise<void> {
    if (Platform.OS !== 'android') {
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
  async removeEffect(viewTag: number): Promise<void> {
    if (Platform.OS !== 'android') {
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
  async updateEffect(
    viewTag: number,
    options: LiquidGlassOptions
  ): Promise<void> {
    if (Platform.OS !== 'android') {
      throw new Error('LiquidGlass is only supported on Android');
    }

    if (!ExpoLiquidGlass) {
      throw new Error('ExpoLiquidGlass native module is not available');
    }

    return ExpoLiquidGlass.updateEffect(viewTag, options);
  }
}

export const LiquidGlass = new LiquidGlassModule();

export { LiquidGlassView } from './LiquidGlassView';
