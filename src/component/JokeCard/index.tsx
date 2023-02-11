import { Avatar, Button, Card, Skeleton } from "antd";
import { useJokeQuery } from "@/api/api-rtkq";
import avatar from "@/assets/image/avatar/sakura.jpg";

export function JokeCard() {
  const { data, isFetching, refetch } = useJokeQuery();
  return (
    <Card
      title="Let`s fun"
      hoverable
      extra={
        <Button onClick={() => refetch()} type="link">
          More
        </Button>
      }
    >
      <Skeleton loading={isFetching} active avatar>
        <Card.Meta
          avatar={<Avatar src={avatar} />}
          title="Joke"
          description={data?.rows}
        />
      </Skeleton>
    </Card>
  );
}
