const objPlugins = {
  install(app, options) {
    console.log('app: ', app);
    console.log('options:', options);
    // app.component 전역 컴포넌트 추가
    // app.config.globalProperties 전역 애플리케이션 인스턴스에 속성 추가
    // app.directive 커스텀 디렉티브
    // app.provide() 리소스 추가 가능
  },
};

export default objPlugins;
