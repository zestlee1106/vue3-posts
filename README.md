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

## 2. Props, Emits

- props 와 emits 도 많이 바뀌지 않았다.
- 기존에는 props 를 받기 위해서 그냥 props 옵션만 추가했다면, 지금은 vue 에서 import 를 해와야 한다.
- defineProps 를 통해서 prop 을 정의해 주고, 그걸 템플릿 안에서 사용하면 된다.
- 만약 스크립트 내에서 사용하고 싶다면, 변수에 할당해서 사용하면 된다.

```javascript
const props = defineProps({
  title: {
    type: String,
  },
});
const test = props.title;
```

- 기존에 emits 는 그냥 `$emit('eventName', payload)` 이런 느낌이었다면, 지금은 defineEmits 를 통해서 선언을 해 줘야 한다.

```javascript
const emit = defineEmits(['handleBtnClick']);
emit('handleBtnClick');
```

## 3. Transition

- Vue 에서는 트랜지션이나 애니메이션을 쉽게 추가할 수 있도록 Transition 이라는 컴포넌트를 제공한다. (Vue2 에서도 있었음)
- v-if, v-show, dynamic component 에서만 트리거가 작동한다.
- 사용하기 위해서는 따로 import 를 할 필요가 없이 바로 가져다가 쓸 수 있다.
- slot 을 통해 전달된 컴포넌트가 생기거나 사라질 때 애니메이션을 추가해 줄 수 있다.
- name prop 을 통해 이름을 정해 줄 수 있고, 해당 이름으로 클래스 명이 바뀐다.
- 기본 클래스 명은 `v-[enter/leave]-[from/to/active]` 이고, `[name]-[enter/leave]-[from/to/active]` 이렇게 바뀔 수가 있다.

## 3-1. Transition group

- transition 을 여러개 띄워주고 싶을 수도 있는데, 그럴 때 사용하는 것이 transition group 이다.
- name 은 transition 과 똑같이 전달해 주면 된다.

## 4. Teleport

- Vue3 에서는 Teleport 라는 내장 컴포넌트가 생겼는데, 이건 특정 dom 에 컴포넌트를 위치 이동 시키는 용도이다.
- 위치 이동할 곳에 `to="#[id 이름]"` 을 넣어 아래처럼 작성한 뒤,

```html
<teleport to="#modal">
  <post-modal
    v-model="show"
    :title="modalTitle"
    :content="modalContent"
    :created-at="modalCreatedAt"
  />
</teleport>
```

- index.html 에 id 태그를 넣어 추가해 주면 된다.

```html
<div id="modal"></div>
```

- 이렇게 할 경우 현재 component 와 상관 없이 app 바깥에 위치할 수 있게 되기 때문에, css 충돌 등의 이슈가 사라지게 된다.

## 5. custom model

- vue3 부터는 v-model 사용법이 바뀌었다.
- vue2 에서는 .sync 속성으로 양방향 바인딩이 되게끔 하였다면,  
  vue3 에서는 value 는 modelValue 로 고정, emit 은 update:modelValue 로 고정되었다.
- 만약에 컴포넌트 내에서 다른 이름으로 접근하고 싶으면, vue2 처럼 computed 를 이용하면 된다.

```javascript
defineProps({
  modelValue: Boolean,
});

defineEmits(['close', 'update:modelValue']);

const show = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
```

## 6. Plugin

- 플러그인 주입하는 방법은 여러가지가 있다.
- app.component() 전역 컴포넌트 추가
- app.config.globalProperties 전역 애플리케이션 인스턴스에 속성 추가
- app.directive() 커스텀 디렉티브 추가
- app.provide() 리소스 (함수 혹은 데이터) 추가

Vue3 에서 추가되고 바뀐 건 globalProperties, provide 가 있다.  
기존에는 `Vue.prototype.$person` 처럼 Vue 객체에 접근하여 글로벌 변수를 만들었다면,  
지금은 플러그인에서 접근하여 변수를 선언할 수 있다.  

또한 globalProperties 로 글로벌 변수를 만들 경우 setup 내에서 사용이 불가능하고, created 훅에서 접근이 가능하다.  
setup 내에서 접근하고 싶다면, provide, inject 를 통해 변수를 선언해 주면 된다.