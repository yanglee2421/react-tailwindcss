import { Button, Card, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useJokeQuery } from "@/api/api-rtkq";

export function JokeCard() {
  const { data, isFetching, refetch } = useJokeQuery();

  return (
    <Card title="JokeCard">
      <Spin
        spinning={isFetching}
        tip="笑话加载中。。。"
        size="large"
        indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}
      >
        <p className="text-end">
          <Button onClick={() => refetch()} type="link">
            下一条
          </Button>
        </p>
        <p>{data?.rows}</p>
      </Spin>
    </Card>
  );
}
