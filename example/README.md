# Expo Liquid Glass Example

이 폴더는 `expo-liquid-glass` 라이브러리의 테스트 예제 프로젝트입니다.

## 실행 방법

### 1. 개발 빌드 생성

이 라이브러리는 네이티브 코드를 포함하므로 개발 빌드가 필요합니다:

```bash
# Android 네이티브 코드 생성
npx expo prebuild

# Android 빌드 및 실행
npx expo run:android
```

### 2. 개발 서버 시작

```bash
npm start
```

## 테스트 기능

이 예제 앱은 다음 기능을 테스트합니다:

1. **프로그래밍 방식 효과 적용**: `LiquidGlass.applyEffect()` 사용
2. **LiquidGlassView 컴포넌트**: 자동으로 효과가 적용되는 컴포넌트
3. **효과 업데이트**: `LiquidGlass.updateEffect()` 사용
4. **효과 제거**: `LiquidGlass.removeEffect()` 사용

## 주의사항

- 이 라이브러리는 **Android에서만** 동작합니다.
- iOS에서는 효과가 적용되지 않습니다.
- 개발 빌드가 필요하므로 `expo-dev-client`가 설치되어 있어야 합니다.

