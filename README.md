# 프로젝트명: Custard 🍮
![Custard](./Untitled.png) 

## 프로젝트 정보
### 0. 소개
> Custard (Custom + Flashcard)

미드, 단어장, 전공서적, 신문 기사, 어떤 정보든 나만의 교재로 만드는 커스텀 플래시카드 웹 어플리케이션입니다.

※ 배포 링크 :  https://custard-deploy.web.app/

### 1. 설치 및 사용 방법

(1) 코드 복사

> 본 레파지토리를 https://github.com/YounglanHong/FinalProject_Deploy.git 주소를 활용하여 로컬 환경에 clone 합니다. 
```
git clone https://github.com/YounglanHong/FinalProject_Deploy.git
```
(2) 패키지 설치
```
npm install
```
(3) 실행
```
// Custard-client 
cd client
npm start

// Custard-server
npm start
```

### 2. 주요 변경 사항 
* firebase 익명 로그인 기능 추가
  - 사용자가 비회원으로 어플리케이션의 기능을 확인할 수 있도록
  
* 카테고리 & 덱 페이지 구조 개선
  - Material-ui Treeview 사용하여 안정적인 트리 구조로 개선

* 카테고리, 덱, 카드 페이지 form input(입력창) 개선
  - Formik 라이브러리 사용하여 모든 페이지의 입력창 state 관리

* 카드에 추가하는 파일 타입 중 csv(table)은 제외
  - 사용자가 카드 형식에 맞추어 엑셀 파일을 작성해야하는 불편함이 있어서
  
* 카드에 추가하는 파일 타입 중 OCR(텍스트 인식) 페이지에 로딩바 추가
  - 사용자가 텍스트 인식의 진행 상황 파악할 수 있도록


### 3. 사용 스택
#### Front-End
* React & React Hook
* Tesseract.js
* Material-UI

#### DB & Deployment
* firebase 

***


