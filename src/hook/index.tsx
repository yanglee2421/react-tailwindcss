import React, { useRef, useEffect, useReducer } from "react";
import { Skeleton } from "antd";

/**
 * Hook for generating class names
 * @param style CssModule
 * @returns function that returns a class name
 */
export function useClass(style: CSSModuleClasses) {
  type className = string | string[] | Record<string, boolean>;
  const classFn = (className: className) => {
    const arrStr = (arr: string[]) =>
      arr.map((item) => style[item] || item).join(" ") + " ";

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
  return useRef(classFn).current;
}

/**
 * Hooks for lazy loading of RC
 * @param callback same as React.lazy
 * @returns React.Suspense
 */
export function useLazy(callback: Parameters<typeof React.lazy>[0]) {
  const Inner = React.lazy(callback);
  return (
    <React.Suspense fallback={<Skeleton active />}>
      <Inner />
    </React.Suspense>
  );
}

/**
 * Hook for listening to browser theme changes
 * @param callback Executed when RC is mounted and browser theme is switched
 */
export function useDark(callback: (mediaQuery: MediaQueryList) => void) {
  useEffect(() => {
    const queryDark = matchMedia("(prefers-color-scheme: dark)");
    callback(queryDark);
    const controller = new AbortController();
    const { signal } = controller;
    queryDark.addEventListener("change", () => callback(queryDark), { signal });
    return () => controller.abort();
  }, []);
}

/**
 * Hooks for manipulating Object State
 * @param init initialState
 * @returns A set function that don't need to return a value
 */
export function useObject<T>(init: T) {
  const type = toStringTag(init);
  const allowTypes = ["object", "array"];
  const isAllowType = allowTypes.includes(type);
  if (!isAllowType) new Error("initialState can only be object or array");

  type reducer<T> = (pa: T, act: (param: T) => void) => T;
  return useReducer<reducer<T>, T>(
    (state, act) => {
      try {
        const target = structuredClone(state);
        act(target);
        return target;
      } catch {
        throw new Error("useObject can`t handle this type");
      }
    },
    init,
    (init) => init
  );
}

function toStringTag(target: unknown) {
  return Object.prototype.toString
    .call(target)
    .replace(/\[object (\w+)\]/, "$1")
    .toLocaleLowerCase();
}

/**
 * Hook for monitoring dom resize
 * @param callback Executed when dom is mounted and dom size changes
 * @returns ref used to specify dom
 */
export function useResize<T extends HTMLElement>(
  callback: (param: { width: number; height: number }) => void | Function
) {
  const resizeRef = useRef<T>(null);

  useEffect(() => {
    const dom = resizeRef.current;
    if (!(dom instanceof HTMLElement))
      throw new Error("resizeRef必须指向一个htmlelement");

    let clearFn: Function | void;
    const obverser = new ResizeObserver(
      ([
        {
          contentBoxSize: [{ inlineSize: width, blockSize: height }],
        },
      ]) => {
        typeof clearFn === "function" && clearFn();
        clearFn = callback({ width, height });
      }
    );
    obverser.observe(dom);

    return () => {
      typeof clearFn === "function" && clearFn();
      obverser.unobserve(dom);
      obverser.disconnect();
    };
  }, []);

  return resizeRef;
}

/**
 * A hook for extracting and generating hyperlinks from a string
 */
export function useLink() {
  return useRef(getLink).current;
}

function getLink(str: unknown) {
  if (typeof str !== "string") return "Some errors occurred, please try again";

  const reg =
    /^(?<prefix>.*)(?<link>https?\:\/\/.+\.\w{2,3}(\:\d{2,5})?)(?<suffix>.*)$/gis;
  const res = reg.exec(str);
  if (!res) return str;
  const { groups } = res;
  if (!groups) return str;

  const { link } = groups;
  const a = (
    <a key={link} href={link} target="_blank">
      {link}
    </a>
  );

  return Object.values({ ...groups, link: a });
}
