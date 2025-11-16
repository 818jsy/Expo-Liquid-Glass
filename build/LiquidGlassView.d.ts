import React from 'react';
import { ViewProps } from 'react-native';
import { LiquidGlassOptions } from './index';
export interface LiquidGlassViewProps extends ViewProps {
    options?: LiquidGlassOptions;
    enabled?: boolean;
    children?: React.ReactNode;
}
/**
 * LiquidGlass 효과를 적용하는 View 컴포넌트
 */
export declare const LiquidGlassView: React.FC<LiquidGlassViewProps>;
