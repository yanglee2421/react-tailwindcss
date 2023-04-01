import { useCallback } from "react";

/**
 * Hook for generating class names
 * @param style CssModule
 * @returns function that returns a class name
 */
export function useStyle(style: CSSModuleClasses) {
  return useCallback(getClass(style), [style]);
}

type className = string | string[] | Record<string, boolean>;

function getClass(style: CSSModuleClasses) {
  const arrStr = (arr: string[]) =>
    arr.map((item) => style[item] || item).join(" ") + " ";

  return (className: className) => {
    // 字符串数组写法
    if (Array.isArray(className)) return arrStr(className);

    // 字符串写法
    if (typeof className === "string") {
      const target = className.replace(/ +/g, ",").split(",");
      return arrStr(target);
    }

    // 对象写法
    const target = Object.keys(className).filter((key) => className[key]);
    return arrStr(target);
  };
}
