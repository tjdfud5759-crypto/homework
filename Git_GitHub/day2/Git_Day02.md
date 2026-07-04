# Git/GitHub 2일차 학습 정리

## 1. GitHub란?

GitHub는 Git으로 관리한 코드를 온라인에 저장하고 공유하는 플랫폼이다.

주요 역할은 다음과 같다.

- Remote Repository 관리
- 코드 공유
- 코드 백업
- 협업

---

## 2. Repository 생성

Repository는 프로젝트 파일과 변경 이력을 저장하는 공간이다.

Repository를 만들 때 설정할 수 있는 항목은 다음과 같다.

- Public / Private
- Repository Description
- README.md
- .gitignore
- License

---

## 3. Local Repository와 Remote Repository

### Local Repository

Local Repository는 내 컴퓨터에 있는 Git 저장소이다.

### Remote Repository

Remote Repository는 GitHub에 있는 온라인 저장소이다.

전체 흐름은 다음과 같다.

```text
내 컴퓨터
Local Repository

↓

GitHub
Remote Repository
```

---

## 4. Push

`push`는 내 컴퓨터의 코드를 GitHub에 업로드하는 명령어이다.

```bash
git push
```

쉽게 말하면 다음과 같다.

```text
내 코드 → GitHub 업로드
```

---

## 5. Pull

`pull`은 GitHub에 있는 최신 코드를 내 컴퓨터로 가져오는 명령어이다.

```bash
git pull
```

쉽게 말하면 다음과 같다.

```text
GitHub 최신 코드 → 내 컴퓨터
```

`pull`은 내부적으로 `fetch + merge`의 의미를 가진다.

---

## 6. Clone

`clone`은 GitHub에 있는 프로젝트를 처음으로 내 컴퓨터에 복제하는 명령어이다.

```bash
git clone 저장소주소
```

---

## 7. Pull과 Clone의 차이

| 구분 | Clone | Pull |
|---|---|---|
| 의미 | 처음 복사 | 이후 동기화 |
| 사용 상황 | 내 컴퓨터에 Git 저장소가 없을 때 | 이미 Git 저장소가 있을 때 |
| 예시 | 처음 프로젝트를 받을 때 | 최신 코드를 가져올 때 |

---

## 8. GitHub 협업 Workflow

GitHub에서는 여러 사람이 함께 프로젝트를 관리할 수 있다.

대표적인 협업 기능은 다음과 같다.

- Issue
- Branch
- Pull Request
- Merge

---

## 9. Issue

Issue는 해야 할 일, 버그, 개선 사항을 기록하는 기능이다.

Issue가 필요한 이유는 다음과 같다.

- 작업 중복 방지
- 버그 추적
- 작업 관리
- 담당자 지정 가능

Issue에서는 다음과 같은 기능을 사용할 수 있다.

- Issue 생성
- Assignee 지정
- Label 지정
- Open / Closed 상태 관리

---

## 10. Pull Request

Pull Request는 작업한 branch의 코드를 main branch에 합쳐달라고 요청하는 기능이다.

쉽게 말하면 다음과 같다.

```text
작업이 끝났으니 이 코드를 main에 넣어주세요.
```

Pull Request를 사용하면 바로 코드를 합치지 않고, 다른 사람이 코드를 확인한 뒤 병합할 수 있다.

---

## 11. GitHub 추가 기능

### Git Log --oneline

commit 기록을 한 줄로 간단하게 확인하는 명령어이다.

```bash
git log --oneline
```

### Git Show

특정 commit의 자세한 내용을 확인하는 명령어이다.

```bash
git show 커밋ID
```

### Git Blame

파일의 각 줄을 누가 수정했는지 확인하는 명령어이다.

```bash
git blame 파일명
```

---

# HTML 기초

## 12. HTML이란?

HTML은 HyperText Markup Language의 약자이다.

HTML의 역할은 웹 페이지의 구조를 정의하는 것이다.

HTML로 만들 수 있는 요소는 다음과 같다.

- 제목
- 문단
- 이미지
- 링크
- 표
- 화면 뼈대

---

## 13. HTML 기본 구조

HTML 문서는 기본적으로 다음과 같은 구조를 가진다.

```html
<!DOCTYPE html>
<html>
<head>
    <title>문서 제목</title>
</head>
<body>
    <h1>제목</h1>
    <p>본문</p>
</body>
</html>
```

---

## 14. Head와 Body

| 구분 | 의미 |
|---|---|
| head | 사용자에게 직접 보이지 않는 정보 |
| body | 브라우저 화면에 실제로 보이는 영역 |

---

## 15. 자주 사용하는 HTML 태그

| 태그 | 의미 |
|---|---|
| h1 | 큰 제목 |
| p | 문단 |
| br | 줄바꿈 |
| hr | 가로선 |
| ul | 순서 없는 목록 |
| ol | 순서 있는 목록 |
| li | 목록 항목 |
| img | 이미지 |
| a | 링크 |
| table | 표 |
| form | 입력 폼 |

---

## 16. HTML이 브라우저에 보이는 과정

웹 페이지가 보이는 과정은 다음과 같다.

```text
서버가 HTML 전달
→ 브라우저가 HTML 해석
→ 화면 생성
```

---

## 17. 오늘 배운 내용 요약

오늘은 GitHub의 Repository, Push, Pull, Clone 개념을 학습했다.

또한 Issue와 Pull Request를 통해 GitHub에서 협업하는 흐름을 이해했다.

마지막으로 HTML의 기본 구조와 자주 사용하는 태그를 학습했다.

GitHub는 코드를 저장하고 협업하는 공간이고, HTML은 웹 페이지의 구조를 만드는 언어라는 것을 이해했다.
