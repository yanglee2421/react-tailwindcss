// React Imports
// import React from "react";

// Antd Imports
import { Button } from "antd";

// Hooks Imports
import { useLogin } from "@/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// React Imports
import React from "react";

export function Home() {
  const login = useLogin();

  const ref = React.useRef(false);

  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["lab query"],
    async queryFn() {
      await new Promise((res) => {
        setTimeout(res, 1000 * 5);
      });

      if (ref.current) {
        throw new Error("Error query");
      }
      ref.current = true;
      return { age: 18 };
    },

    retry: false,
    // staleTime: 0,
  });
  console.log("pengding", query.isPending, query.isLoading, query.isFetching);
  console.log(
    "data",
    query.data,
    query.isSuccess,
    queryClient.getQueryData(["lab query"])
  );
  console.log("error", query.error, query.isError);

  return (
    <>
      <div>
        <Button onClick={login.signOut} danger type="primary">
          logout
        </Button>
        <Button onClick={() => query.refetch()}>refetch</Button>
      </div>
    </>
  );
}
