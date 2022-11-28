# vue3-posts

> vue3 를 공부해 보자!!!

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

---

## 1. vue router

- vue3 의 vue router4... 그렇게 많이 바뀌지는 않았다.
  - `this.$route`, `this.$router` 이렇게 사용하던 것이 `useRoute()`, `useRouter()` 요렇게 바뀐 정도?
- 뭔가의 라이브러리를 전역으로 사용하기 위해서는 main.js 의 createApp 에서 use 를 해야 한다.
- router 기능을 사용하여 router 의 view 를 보여 주려면 RouterView 컴포넌트를 추가해야 한다.
- 다이나믹 라우트는 path가 `/posts/:id` 이런 식으로 된다.

### router 와 route 는 뭐가 다른가요?

router는 url 에 따라 어떤 페이지를 보여줄지 매핑해 주는 라이브러리이다.  
route 는 어떤 URL 에 대한 어떤 페이지를 표시해야 하는지에 대한 매핑 정보를 나타낸다.

### router-link 의 기능은 뭔가요?

일반적으로 페이지 이동이라 함은, a tag 를 쓰기 마련이다.  
하지만 a tag 에 href 속성으로 페이지를 이동하게 되면, 리로딩을 하게 되기 때문에 SPA 로 동작을 하지 않는다.  
따라서 a 태그를 사용하는 대신 RouterLink 커스텀 컴포넌트를 이동해야 한다.

### Nested 라우트는 뭔가요?

중첩된 라우트이다.  
`/nested/one`, `/nested/Two` 이런 식으로 /nested 에 딸려있는 중첩된 라우트를 생성하고 싶을 때 사용하면 된다.  
nested 페이지 내부에서 라우팅을 할 곳에 `router-view` 컴포넌트를 다시 불러주고,  
router/index.vue 에서 nested 하위에 children 속성으로 one, two 를 넣어주면 된다.

### createWebHistory, createWebHashHistory 는 뭐가 다를까?

각각 히스토리 모드, 해쉬 모드를 가리킨다.

- 히스토리 모드

  - /post/create 이런 식으로 일반적인 라우팅으로 된다
  - SPA의 히스토리 모드이기 때문에, 만약에 배포를 할 경우 404 error 가 나오고,  
    해당 에러를 없애기 위해서는, vue router 공식문서에 아파치, nginx 등 설정이 나와있다.
  - SEO 에 (그나마) 최적화가 되어있다. SPA 는 긁어봤자 app.js 만 있기 때문에, 긁어 봤자이다.

- 해쉬모드
  - /#/post/create 이런 식으로 # 이 붙어있다.
  - 배포를 할 경우 어차피 index.html 로만 요청을 하기 때문에 오류가 나지 않는다.
  - 보통 url 에서의 #은 위치를 나타내기 때문에, 검색 엔진이 라우트로 인식을 하지 않는다.
  - 따라서 SEO 최적화에 좋지가 않다.
