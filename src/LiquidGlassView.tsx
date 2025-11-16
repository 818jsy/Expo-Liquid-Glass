import React, { useRef, useEffect } from 'react';
import { View, ViewProps, findNodeHandle } from 'react-native';
import { LiquidGlass, LiquidGlassOptions } from './index';

export interface LiquidGlassViewProps extends ViewProps {
  options?: LiquidGlassOptions;
  enabled?: boolean;
  children?: React.ReactNode;
}

/**
 * LiquidGlass 효과를 적용하는 View 컴포넌트
 */
export const LiquidGlassView: React.FC<LiquidGlassViewProps> = ({
  options,
  enabled = true,
  children,
  ...viewProps
}) => {
  const viewRef = useRef<View>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const viewTag = findNodeHandle(viewRef.current);
    if (viewTag === null) {
      return;
    }

    LiquidGlass.applyEffect(viewTag, options).catch((error) => {
      console.warn('Failed to apply LiquidGlass effect:', error);
    });

    return () => {
      const tag = findNodeHandle(viewRef.current);
      if (tag !== null) {
        LiquidGlass.removeEffect(tag).catch((error) => {
          console.warn('Failed to remove LiquidGlass effect:', error);
        });
      }
    };
  }, [enabled, options]);

  return (
    <View ref={viewRef} {...viewProps}>
      {children}
    </View>
  );
};
