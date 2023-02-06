import { useCallback } from "react";

namespace t {
  type param = string | string[] | Record<string, boolean>;
  export type cx = (param: param) => string;
}

/**
 * Hook for generating class names
 * @param style CssModule
 * @returns function that returns the class name
 */
export function useClass(style: CSSModuleClasses) {
  return useCallback<t.cx>((className) => {
    const arrStr = (arr: string[]) =>
      arr.map((item) => style[item] || item).join(" ") + " ";
    // 数组写法
    if (Array.isArray(className)) {
      return arrStr(className);
    }
    // 字符串写法
    if (typeof className === "string") {
      const target = className.replace(/ +/g, ",").split(",");
      return arrStr(target);
    }
    // 对象写法
    const target = Object.keys(className).filter((key) => className[key]);
    return arrStr(target);
  }, []);
}
