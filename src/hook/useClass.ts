import { useCallback, useMemo } from "react";

namespace t {
  type param = string | string[] | Record<string, boolean>;
  export type cx = (param: param) => string;
}

/**
 * 支持 string、string[]、Record 写法
 * @param style 引入的 CssModule
 * @returns 用于生成类名的函数
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
