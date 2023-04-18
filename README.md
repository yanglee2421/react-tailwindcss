# vite-react

## 路由列表

- [雪飘](https://yanglee2421.github.io/vite-react/#/snow)
- [粒子](https://yanglee2421.github.io/vite-react/#/particle)

## 代码规范

- CSS

```scss
.block--modifier__element--modifier {
  flex: 1;
  overflow: hidden;
}
```

- ECMAScript

```js
/**
 * Used for processing data,
 * returning processed data without changing the original data
 * @params required
 * @return required
 */
function toFunc(params) {
  // do something
  return params;
}

/**
 * Used to perform some operations,
 * such as dom events
 * @params optional
 * @return void
 */
function handleFunc(params) {
  // do something
}

/**
 * Hook functions used within the framework
 * @params optional
 * @return optional
 */
function useFunc() {
  // do something
}

/**
 * Used to send network requests,
 * Its prefix is consistent with the request method
 * @params optional
 * @return promise
 */
function getFunc() {}
function postFunc() {}
```
