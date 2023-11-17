# vite-react

[Live Preview](https://yanglee2421.github.io/react-antd)

## Get Stated

## Installation

```bash
pnpm create @yanglee2421/app
```

## Effect

### 应当使用的情况

1. 输出 react state 用以控制外部系统
2. 常见的外部系统：
   - 网络 API
   - DOM、BOM

### 不应使用的情况

1. 没有外部系统（例如：侦听部分 state 的变化，更改另一部分 state，全程没有外部系统参与）
