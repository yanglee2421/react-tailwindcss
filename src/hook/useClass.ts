export default (style: CSSModuleClasses) => {
  return (className: string | string[] | Record<string, boolean>) => {
    // 数组写法
    if (Array.isArray(className)) {
      return className.map((item) => style[item] || "").join(" ");
    }
    // 字符串写法
    if (typeof className === "string") {
      return className
        .replace(/ +/g, ",")
        .split(",")
        .map((item) => style[item] || "")
        .join(" ");
    }
    // 对象写法
    return Object.keys(className)
      .filter((item) => className[item])
      .map((item) => style[item] || "")
      .join(" ");
  };
};
