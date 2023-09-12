#! deno run

promiseAny(4);

export async function promiseAny(length = 1) {
  const allList = getList();

  const settledList: symbol[] = [];

  for (let i = 0; i < length; i++) {
    const list = allList.filter((item) => !settledList.includes(item.id));
    const taskList = list.map((item) => item.promise);

    const id = await Promise.any(taskList);

    settledList.push(id);
    console.log("end", settledList);
  }
}

function getList() {
  const list: Item[] = [];
  for (let i = 0; i < 10; i++) {
    list.push(getItem());
  }

  return list;
}

function getItem() {
  const id = Symbol();
  return {
    id,
    promise: new Promise<symbol>((res) => {
      const timeout = Math.floor(Math.random() * 1000 * 10);
      console.log(timeout);

      setTimeout(() => res(id), timeout);
    }),
  };
}
type Item = ReturnType<typeof getItem>;
