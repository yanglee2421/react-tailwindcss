export function toStyles(styles: CSSModuleClasses) {
  return (key: string) => Reflect.get(styles, key) || key;
}
