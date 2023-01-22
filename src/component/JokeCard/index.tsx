import { Button, Card, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useJokeQuery } from "@/api/api-rtkq";

export function JokeCard() {
  const { data, isFetching, refetch } = useJokeQuery();

  return (
    <Card title="JokeCard">
      <Spin
        spinning={isFetching}
        tip="加载中。。。"
        size="large"
        indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}
      >
        <p>{data?.rows}</p>
        <p className="text-center pt-2">
          <Button onClick={() => refetch()} type="primary" className="w-100">
            下一条
          </Button>
        </p>
      </Spin>
    </Card>
  );
}
