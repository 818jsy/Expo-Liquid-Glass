# GitHub에 푸시하기

## 1. GitHub 저장소 생성

1. https://github.com/new 에서 새 저장소 생성
2. 저장소 이름: `Expo_LiquidGlass` (또는 원하는 이름)
3. Public 또는 Private 선택
4. README, .gitignore, license는 추가하지 않음 (이미 있음)

## 2. 원격 저장소 추가 및 푸시

```bash
# 원격 저장소 추가 (YOUR_USERNAME을 실제 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/Expo_LiquidGlass.git

# 브랜치 이름을 main으로 변경 (선택사항)
git branch -M main

# GitHub에 푸시
git push -u origin main
```

## 3. package.json 업데이트

GitHub 저장소 URL을 `package.json`에 반영:

```json
"repository": {
  "type": "git",
  "url": "https://github.com/YOUR_USERNAME/Expo_LiquidGlass.git"
}
```

그리고 커밋:

```bash
git add package.json
git commit -m "Update repository URL"
git push
```

## 4. example 프로젝트에서 사용

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
rm -rf node_modules/expo-liquid-glass
npm install --legacy-peer-deps
```

## 참고사항

- `prepare` 스크립트가 있어서 설치 시 자동으로 빌드됩니다
- `build/` 폴더는 GitHub에 포함되어 있으므로 바로 사용 가능합니다
- `android/build/` 폴더는 제외되어 있어 저장소가 깔끔합니다

