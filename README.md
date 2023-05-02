# vite-react

## SOLID 原则

1. Single Responsibility Principle
2. OpenClosed Principle
3. Liskov Substitution Principle
4. Interface Segregation Principle
5. Dependency Inversion Principle

## BEM 命名

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
async function get_some() {}
async function post_some() {}
```
