# Expo Liquid Glass

AndroidLiquidGlass Kotlin 라이브러리를 Expo/React Native에서 사용할 수 있도록 브릿징한 라이브러리입니다.

## 설치

```bash
npm install expo-liquid-glass --legacy-peer-deps
```

## 사용법

### 방법 1: 프로그래밍 방식

```typescript
import { LiquidGlass } from 'expo-liquid-glass';
import { View, findNodeHandle } from 'react-native';

const MyComponent = () => {
  const viewRef = useRef<View>(null);

  const applyEffect = async () => {
    const viewTag = findNodeHandle(viewRef.current);
    if (viewTag !== null) {
      await LiquidGlass.applyEffect(viewTag, {
        blurRadius: 20,
        saturation: 1.2,
        brightness: 1.1,
      });
    }
  };

  return <View ref={viewRef} onLayout={applyEffect} />;
};
```

### 방법 2: LiquidGlassView 컴포넌트

```typescript
import { LiquidGlassView } from 'expo-liquid-glass';

<LiquidGlassView
  style={{ width: 300, height: 200 }}
  options={{
    blurRadius: 15,
    saturation: 1.3,
  }}
>
  {/* 콘텐츠 */}
</LiquidGlassView>
```

## 요구사항

- Expo SDK 49 이상
- React Native 0.72 이상
- Android 개발 빌드 (expo-dev-client)
- **Android 전용** (iOS 미지원)

## 개발 빌드 설정

이 라이브러리는 네이티브 코드를 포함하므로 Expo 개발 빌드가 필요합니다:

```bash
npx expo install expo-dev-client
npx expo prebuild
npx expo run:android
```

## 예제 프로젝트

`example` 폴더에 테스트 예제가 포함되어 있습니다:

```bash
cd example
npm install --legacy-peer-deps
npx expo prebuild
npx expo run:android
```

## API 문서

### LiquidGlass.applyEffect(viewTag, options?)

View에 LiquidGlass 효과를 적용합니다.

**매개변수:**
- `viewTag`: React Native View의 태그 (findNodeHandle로 얻을 수 있음)
- `options`: 효과 옵션 (선택사항)
  - `blurRadius?: number` - 블러 반경
  - `saturation?: number` - 채도
  - `brightness?: number` - 밝기
  - `noise?: number` - 노이즈 강도
  - `turbulence?: number` - 난류 강도
  - `distortion?: number` - 왜곡 강도

### LiquidGlass.removeEffect(viewTag)

View에서 LiquidGlass 효과를 제거합니다.

### LiquidGlass.updateEffect(viewTag, options)

View의 LiquidGlass 효과를 업데이트합니다.
