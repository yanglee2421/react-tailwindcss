export default (dom: HTMLImageElement) => {
  const observer = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) {
      dom.src = "";
      observer.unobserve(dom);
    }
  });
  observer.observe(dom);
};
