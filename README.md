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
- router 와 route 의 개념과, router-link 의 기능을 다시 한번 더 생각해 보게 되었다.

### router 와 route 는 뭐가 다른가요?

router는 url 에 따라 어떤 페이지를 보여줄지 매핑해 주는 라이브러리이다.  
route 는 어떤 URL 에 대한 어떤 페이지를 표시해야 하는지에 대한 매핑 정보를 나타낸다.

### router-link 의 기능은 뭔가요?

일반적으로 페이지 이동이라 함은, a tag 를 쓰기 마련이다.  
하지만 a tag 에 href 속성으로 페이지를 이동하게 되면, 리로딩을 하게 되기 때문에 SPA 로 동작을 하지 않는다.  
따라서 a 태그를 사용하는 대신 RouterLink 커스텀 컴포넌트를 이동해야 한다.
