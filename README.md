# vite-react

[Live Preview](https://yanglee2421.github.io/react-antd)

## Get Stated

## Installation

```bash
pnpm create @yanglee2421/app
```

## Effect

### 应当使用的情况

1. 输出 react state 控制外部系统
2. 需要直接操作 dom 的情况
3. 调用 setTimeout 和 setInterval
4. 调用网络 API

### 不应使用的情况

1. 没有外部系统（例如：侦听部分 state 的变化，更改另一部分 state，全程没有外部系统参与）
