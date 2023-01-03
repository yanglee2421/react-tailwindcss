import { useClass } from "@/hook";
import style from "./404.module.scss";
import { useCallback, useState } from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Form,
  Layout,
  Row,
  Switch,
  Space,
} from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { Counter, Models } from "@/component";
import { setIsDarkAct } from "@/redux/slice-theme";
import { useDispatch, useSelector } from "react-redux";
const cN = useClass(style);
export default () => {
  const isDark = useSelector<any, boolean>((state) => state.theme.isDark);
  const dispatch = useDispatch();
  const swhChg = useCallback(
    (params: boolean) => dispatch(setIsDarkAct(params)),
    []
  );
  const navigate = useNavigate();
  const retBtn = useCallback(() => navigate(-1), []);
  const [isShow, setIsShow] = useState(false);
  return (
    <Layout className={cN("p-1")}>
      <h1 className={cN("text-danger")}>404</h1>
      <p className={cN("text-info")}>很遗憾，这里什么也没有...</p>
      <Divider>华丽的分隔线</Divider>
      <Row gutter={10}>
        <Col span={12}>
          <Card title="主题">
            <Form>
              <Form.Item label="夜间模式">
                <Switch
                  defaultChecked={isDark}
                  onChange={swhChg}
                />
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="路由">
            <Space>
              <NavLink to="/">
                <Button>首页</Button>
              </NavLink>
              <Button onClick={retBtn}>返回</Button>
              <NavLink to="/test">
                <Button>测试</Button>
              </NavLink>
              <NavLink to="/table">
                <Button>table</Button>
              </NavLink>
              <NavLink to="/threejs">
                <Button>threejs</Button>
              </NavLink>
            </Space>
          </Card>
        </Col>
      </Row>
      <Divider>华丽的分隔线</Divider>
      <Row gutter={10}>
        <Col span={12}>
          <Counter />
        </Col>
        <Col span={12}>
          {" "}
          <Card title="弹窗">
            <Button
              onClick={() => setIsShow(() => true)}
              type="link"
            >
              打开
            </Button>
          </Card>
        </Col>
      </Row>
      <Divider>华丽的分隔线</Divider>
      <Card>
        <Empty />
      </Card>
      {isShow && (
        <Models
          onClose={() => {
            setIsShow(() => false);
          }}
          className="123"
        ></Models>
      )}
    </Layout>
  );
};
/**
 * - 挂载流程（effect未指定依赖时）
 * 1.组件函数
 * 2.effect
 * 3.return effect（卸载时才执行）
 *
 *
 *
 * - 更新流程
 * 1.组件函数
 * 2.return effect（处理上一个effect返回的return）
 * 3.effect
 */
