# GitHub에 배포하기

## 1. GitHub 저장소 생성

1. GitHub에서 새 저장소 생성 (예: `Expo_LiquidGlass`)
2. 저장소 URL을 `package.json`의 `repository.url`에 업데이트

## 2. 빌드 및 커밋

```bash
# 빌드 실행 (build 폴더 생성)
npm run build

# Git 초기화 (아직 안 했다면)
git init
git add .
git commit -m "Initial commit: Expo Liquid Glass library"

# GitHub에 푸시
git remote add origin https://github.com/YOUR_USERNAME/Expo_LiquidGlass.git
git branch -M main
git push -u origin main
```

## 3. example 프로젝트에서 설치

`example/package.json`을 수정:

```json
{
  "dependencies": {
    "expo-liquid-glass": "git+https://github.com/YOUR_USERNAME/Expo_LiquidGlass.git"
  }
}
```

그리고 설치:

```bash
cd example
npm install --legacy-peer-deps
```

## 4. npm 패키지로 배포 (선택사항)

나중에 npm에 배포하고 싶다면:

```bash
# npm 로그인
npm login

# 배포
npm publish
```

그러면 다음과 같이 설치 가능:

```bash
npm install expo-liquid-glass
```

## 참고사항

- `build/` 폴더는 GitHub에 포함되어야 합니다 (빌드된 JavaScript 파일)
- `example/` 폴더는 `.npmignore`에 포함되어 npm 패키지에는 포함되지 않습니다
- GitHub에서 설치할 때는 `prepare` 스크립트가 자동으로 실행되어 빌드됩니다

