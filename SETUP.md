# Expo Liquid Glass 설정 가이드

## 프로젝트 구조

이 라이브러리는 Expo에서 AndroidLiquidGlass Kotlin 라이브러리를 사용할 수 있도록 브릿징한 네이티브 모듈입니다.

## 설치 및 사용 방법

### 1. 라이브러리 설치

```bash
npm install expo-liquid-glass
```

또는 로컬 개발 시:

```bash
npm install /path/to/expo-liquid-glass
```

### 2. Expo 개발 빌드 설정

이 라이브러리는 네이티브 코드를 포함하므로 Expo 개발 빌드가 필요합니다:

```bash
# Expo 프로젝트에 개발 빌드 설치
npx expo install expo-dev-client

# 네이티브 코드 생성
npx expo prebuild

# Android 빌드 및 실행
npx expo run:android
```

### 3. Android 프로젝트에 모듈 등록

`android/app/src/main/java/.../MainApplication.java` 파일을 열고 패키지를 등록합니다:

```java
import expo.modules.liquidglass.ExpoLiquidGlassPackage;

// ...

@Override
protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new ExpoLiquidGlassPackage() // 추가
    );
}
```

또는 React Native 0.60+ (Autolinking)를 사용하는 경우, 자동으로 링크됩니다.

### 4. 사용 예제

#### 방법 1: LiquidGlassView 컴포넌트 사용

```tsx
import { LiquidGlassView } from 'expo-liquid-glass';

<LiquidGlassView
  style={{ width: 300, height: 200 }}
  options={{
    blurRadius: 20,
    saturation: 1.2,
    brightness: 1.1,
  }}
>
  {/* 콘텐츠 */}
</LiquidGlassView>
```

#### 방법 2: 프로그래밍 방식으로 적용

```tsx
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
      });
    }
  };

  return <View ref={viewRef} onLayout={applyEffect} />;
};
```

## 옵션 설명

- `blurRadius`: 블러 반경 (기본값: 라이브러리 기본값)
- `saturation`: 채도 (기본값: 1.0)
- `brightness`: 밝기 (기본값: 1.0)
- `noise`: 노이즈 강도
- `turbulence`: 난류 강도
- `distortion`: 왜곡 강도

## 문제 해결

### 모듈을 찾을 수 없는 경우

1. `npx expo prebuild` 실행
2. Android 프로젝트 클린 빌드: `cd android && ./gradlew clean`
3. 다시 빌드: `npx expo run:android`

### AndroidLiquidGlass 라이브러리 버전 문제

`android/build.gradle`에서 버전을 명시적으로 지정:

```gradle
implementation 'com.github.Kyant0:AndroidLiquidGlass:1.0.0' // 원하는 버전
```

## 참고 자료

- [AndroidLiquidGlass 원본 라이브러리](https://github.com/Kyant0/AndroidLiquidGlass)
- [Expo 개발 빌드 문서](https://docs.expo.dev/development/introduction/)
- [React Native 네이티브 모듈 가이드](https://reactnative.dev/docs/native-modules-android)
