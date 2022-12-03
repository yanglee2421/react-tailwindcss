import style from "./child.module.scss";
export default () => {
  console.log("子组件生成了虚拟DOM");

  return (
    <div>
      <p>这是子组件</p>
    </div>
  );
};
