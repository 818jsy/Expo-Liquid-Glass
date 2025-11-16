# React Native 사용법

## 설치

```bash
npm install expo-liquid-glass --legacy-peer-deps
```

## 사용 방법

### 방법 1: LiquidGlassView 컴포넌트 사용 (권장)

가장 간단한 방법입니다. `LiquidGlassView` 컴포넌트로 감싸면 자동으로 효과가 적용됩니다.

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LiquidGlassView } from 'expo-liquid-glass';

export default function MyComponent() {
  return (
    <LiquidGlassView
      style={styles.container}
      options={{
        blurRadius: 16,
        saturation: 1.0,
        brightness: 1.0,
        lensRadius: 16,
        lensIntensity: 32,
        surfaceAlpha: 0.3,
      }}
    >
      <View style={styles.content}>
        <Text style={styles.text}>리퀴드 글래스 효과</Text>
      </View>
    </LiquidGlassView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  content: {
    flex: 1,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
```

### 방법 2: 프로그래밍 방식

`findNodeHandle`을 사용하여 View의 태그를 얻고, `LiquidGlass.applyEffect()`를 호출합니다.

```tsx
import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, findNodeHandle } from 'react-native';
import { LiquidGlass } from 'expo-liquid-glass';

export default function MyComponent() {
  const viewRef = useRef<View>(null);

  useEffect(() => {
    const applyEffect = async () => {
      const viewTag = findNodeHandle(viewRef.current);
      if (viewTag !== null) {
        try {
          await LiquidGlass.applyEffect(viewTag, {
            blurRadius: 20,
            saturation: 1.2,
            brightness: 1.1,
            lensRadius: 16,
            lensIntensity: 32,
            surfaceAlpha: 0.3,
          });
        } catch (error) {
          console.error('Failed to apply effect:', error);
        }
      }
    };

    applyEffect();

    return () => {
      const viewTag = findNodeHandle(viewRef.current);
      if (viewTag !== null) {
        LiquidGlass.removeEffect(viewTag).catch(console.error);
      }
    };
  }, []);

  return (
    <View ref={viewRef} style={styles.container}>
      <Text style={styles.text}>리퀴드 글래스 효과</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    backgroundColor: '#6200ee',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
```

### 방법 3: 동적으로 효과 업데이트

효과를 동적으로 변경하려면 `updateEffect()`를 사용합니다.

```tsx
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, findNodeHandle } from 'react-native';
import { LiquidGlass } from 'expo-liquid-glass';

export default function MyComponent() {
  const viewRef = useRef<View>(null);
  const [blurRadius, setBlurRadius] = useState(16);

  const updateBlur = async () => {
    const viewTag = findNodeHandle(viewRef.current);
    if (viewTag !== null) {
      const newBlur = blurRadius === 16 ? 32 : 16;
      setBlurRadius(newBlur);
      
      try {
        await LiquidGlass.updateEffect(viewTag, {
          blurRadius: newBlur,
        });
      } catch (error) {
        console.error('Failed to update effect:', error);
      }
    }
  };

  return (
    <View>
      <View ref={viewRef} style={styles.container}>
        <Text style={styles.text}>블러 반경: {blurRadius}</Text>
      </View>
      <Button title="블러 변경" onPress={updateBlur} />
    </View>
  );
}
```

## 옵션 설명

| 옵션 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `blurRadius` | `number` | `16` | 블러 효과의 반경 (픽셀) |
| `saturation` | `number` | `1.0` | 채도 조절 (1.0 = 기본값) |
| `brightness` | `number` | `1.0` | 밝기 조절 (1.0 = 기본값) |
| `lensRadius` | `number` | `16` | 렌즈 효과의 반경 (픽셀) |
| `lensIntensity` | `number` | `32` | 렌즈 효과의 강도 |
| `surfaceAlpha` | `number` | `0.3` | 표면 투명도 (0.0 ~ 1.0) |

## 주의사항

1. **Android 전용**: 현재 iOS는 지원하지 않습니다.
2. **ViewGroup 필요**: 효과를 적용하려면 View가 ViewGroup이어야 합니다. 일반 `View` 컴포넌트는 자동으로 ViewGroup으로 변환됩니다.
3. **개발 빌드 필요**: 네이티브 코드를 포함하므로 Expo 개발 빌드가 필요합니다.

```bash
npx expo install expo-dev-client
npx expo prebuild
npx expo run:android
```

## API 참조

### `LiquidGlass.applyEffect(viewTag, options?)`

View에 LiquidGlass 효과를 적용합니다.

**매개변수:**
- `viewTag`: React Native View의 태그 (`findNodeHandle`로 얻을 수 있음)
- `options`: 효과 옵션 (선택사항)

**반환값:** `Promise<void>`

### `LiquidGlass.removeEffect(viewTag)`

View에서 LiquidGlass 효과를 제거합니다.

**매개변수:**
- `viewTag`: React Native View의 태그

**반환값:** `Promise<void>`

### `LiquidGlass.updateEffect(viewTag, options)`

View의 LiquidGlass 효과를 업데이트합니다.

**매개변수:**
- `viewTag`: React Native View의 태그
- `options`: 업데이트할 효과 옵션

**반환값:** `Promise<void>`

### `LiquidGlassView` 컴포넌트

자동으로 효과를 적용하는 View 컴포넌트입니다.

**Props:**
- `options?`: LiquidGlassOptions - 효과 옵션
- `enabled?`: boolean - 효과 활성화 여부 (기본값: `true`)
- 기타 모든 `ViewProps` 속성 지원

