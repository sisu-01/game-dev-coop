<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/418a63af-7e5d-463d-9211-aa32dca00335" />

<img width="418" height="331" alt="image" src="https://github.com/user-attachments/assets/8d8e42b0-0ef6-4040-b218-5699b92267f3" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/26af70c3-1624-4f51-ad99-d79d4fd4aaa0" />

<img width="497" height="809" alt="image" src="https://github.com/user-attachments/assets/92d8bbcd-2ef0-4ee3-b73d-42c1f7eea471" />

<img width="546" height="463" alt="image" src="https://github.com/user-attachments/assets/a5fa5966-f9e1-43cc-b54e-247970ff86fe" />

<a href="https://cartoon-nextjs.vercel.app">
  <img width="800" alt="logo" src="https://github.com/user-attachments/assets/a5a9d2b2-a3af-4174-a903-61d065efdd13" />
</a>

### 🤣 [만화 보러가기 (Click Here)](https://cartoon-nextjs.vercel.app)

# 카연갤 북마크

## 📖 프로젝트 소개
카툰-연재 갤러리의 게시글들을 군집화하여 시리즈별로 보기 편하게 만들어주는 사이트이다.

### 🎯 프로젝트 목표
1.  **Drag and Drop:** ㅇ.
2.  **OAUTH?** 로그인.
3.  **협업?**
---

## 🛠 기술 스택
### 프론트엔드
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>&rarr;<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" /><img src="https://img.shields.io/badge/React Bootstrap-41E0FD?style=flat-square&logo=reactbootstrap&logoColor=white"/>

### 백엔드
<img src="https://img.shields.io/badge/Node.js-5FA04E?style=flat-square&logo=nodedotjs&logoColor=white"/>&rarr;<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" /><img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" /><img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" />

### 배포
<img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" /><img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" /><img src="https://img.shields.io/badge/Ubuntu-E95420?style=flat-square&logo=ubuntu&logoColor=white" />

---

## 📓 겪언던 문제, 느낌점, 새로 알게된 정보

### CSR의 한계.
나는 openGraph를 통해 멋들어진 만화 공유 기능을 구현하고 싶었다.<br/>
하지만 React 페이지를 공유하면 index.html의 하드코딩된 meta 정보가 공유되기 때문에 내가 원하는 기능을 구현할 수 없었다.<br/>
때문에 나는 SSR인 Nextjs를 도입하여 기능을 구현하였다.

### 배포의 신 Docker Goat
Dockerfile과 yml만 만들어두면 컨테이너가 딸깍 하고 나온다<br/>
파일 그대로 다른 서버에서 똑같이 배포하면 에러 없이 같은 결과물 나온다.<br/>
ㄹㅇ 신세계다.

### 배포의 신 Vercel Goat
연동된 github branch에 push하면 자동으로 배포가 된다.<br/>
무료 요금제도 있는데 속도도 나쁘지 않다.<br/>
이걸 왜 지금에서야 알았을까.

### 군집화(clustering)
만화 제목이 담긴 텍스트 뭉치들을 가공하여 시리즈로 묶을 수 있다니 놀랍다.
1.  MeCab으로 제목을 전처리
2.  TF-IDF로 벡터화
3.  DBSCAN으로 군집화

## 💭 개선하고 싶은 점
### DBSCAN 알고리즘의 한계
DBSCAN은 데이터들의 밀도를 기반으로 군집화하는 알고리즘이다.<br/>
하지만 모든 데이터(만화)들의 밀도가 동일하지는 않다.<br/>
때문에 고정된 eps로 군집화 하면 모든 군집들에 동일한 퀄리티를 기대할 수 없다<br/>
내가 찾아본 개선 방법은 아래와 같다.
1.  HDBSCAN 사용하기
2.  DBSCAN 두 번 돌리기
3.  DBSCAN 후 HDBSCAN 사용하기

등이 있다.<br/>
마음 같아선 전부 해보고싶지만 시간이 없다 어흑흑
