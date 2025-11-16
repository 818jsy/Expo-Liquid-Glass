# AndroidLiquidGlass 라이브러리 설정 가이드

현재 이 모듈은 AndroidLiquidGlass 라이브러리 의존성이 설정되지 않은 상태입니다. 실제 라이브러리를 사용하려면 다음 단계를 따라주세요.

## 1. AndroidLiquidGlass 라이브러리 확인

먼저 [AndroidLiquidGlass GitHub 저장소](https://github.com/Kyant0/AndroidLiquidGlass)에서 다음 정보를 확인하세요:

- 라이브러리의 실제 패키지명
- Maven/Gradle 의존성 설정 방법
- 사용 가능한 버전

## 2. build.gradle에 의존성 추가

`android/build.gradle` 파일을 열고 `dependencies` 섹션에 라이브러리를 추가하세요:

```gradle
dependencies {
  // ... 기존 의존성들 ...
  
  // AndroidLiquidGlass 라이브러리 추가
  // 방법 1: JitPack을 통한 설치 (예시)
  implementation 'com.github.Kyant0:AndroidLiquidGlass:1.0.0'
  
  // 방법 2: 로컬 모듈인 경우
  // implementation project(':androidliquidglass')
  
  // 방법 3: Maven Central 또는 다른 저장소
  // implementation 'com.kyant:liquidglass:1.0.0'
}
```

## 3. Kotlin 코드 활성화

`android/src/main/java/expo/modules/liquidglass/ExpoLiquidGlassModule.kt` 파일을 열고:

1. `import com.kyant.liquidglass.LiquidGlass` 주석 해제
2. `liquidGlassInstances` 변수 주석 해제
3. 각 메서드 내부의 구현 코드 주석 해제

## 4. 패키지명 확인

실제 AndroidLiquidGlass 라이브러리의 패키지명이 `com.kyant.liquidglass`가 아닐 수 있습니다. 
라이브러리 문서를 확인하여 올바른 패키지명으로 import 문을 수정하세요.

## 5. API 확인

라이브러리의 실제 API가 예상과 다를 수 있습니다. 다음을 확인하세요:

- `LiquidGlass` 클래스의 생성자
- 속성명 (blurRadius, saturation 등)
- 메서드명 (release 등)

## 문제 해결

### 라이브러리를 찾을 수 없는 경우

1. 저장소가 올바르게 추가되었는지 확인 (`repositories` 섹션)
2. 라이브러리 버전이 올바른지 확인
3. 인터넷 연결 확인 (JitPack은 온라인에서 다운로드)

### 컴파일 오류가 발생하는 경우

1. 라이브러리의 실제 패키지명 확인
2. API 문서 확인
3. Kotlin 버전 호환성 확인

