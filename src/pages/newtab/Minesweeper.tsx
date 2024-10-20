import { minmax } from "@yotulee/run";
import {
  CircleOutlined,
  CloseOutlined,
  Filter1Outlined,
  Filter2Outlined,
  Filter3Outlined,
  Filter4Outlined,
  Filter5Outlined,
  Filter6Outlined,
  Filter7Outlined,
  Filter8Outlined,
  FilterNoneOutlined,
  FlagCircleOutlined,
  OfflineBoltOutlined,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid2,
  IconButton,
  MenuItem,
  styled,
  TextField,
} from "@mui/material";
import React from "react";

class AnimateController {
  constructor(private readonly animate: () => void) {}

  #animateId = 0;
  play() {
    this.#animateId = requestAnimationFrame(this.play.bind(this));

    this.animate();
  }
  abort() {
    cancelAnimationFrame(this.#animateId);
  }
}

const toTimeCarry = getDifferenceAndRemainder;

export function Minesweeper() {
  const [list, setList] = React.useState<Item[]>([]);
  const [bombs, setBombs] = React.useState<Set<string>>(new Set());
  const [open, setOpen] = React.useState<Set<string>>(new Set());
  const [marked, setMarked] = React.useState<Set<string>>(new Set());
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);
  const [subheader, setSubheader] = React.useState("");
  const [level, setLevel] = React.useState("");
  const startAtRef = React.useRef(0);
  const animaRef = React.useRef<AnimateController | null>(
    null,
  );

  const ha = () => {
    const [s, ms] = toTimeCarry(Date.now() - startAtRef.current, 1000);
    setSubheader(`${s}s ${ms}`);
  };

  const handleGameStart = (x: number, y: number, bombNumbers: number) => {
    React.startTransition(() => {
      const arr = [];
      const bombSet = new Set<string>();

      for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
          arr.push(new Item(j, i));
        }
      }

      while (bombSet.size < bombNumbers) {
        bombSet.add(arr[Math.floor(Math.random() * arr.length)].id);
      }

      setList(arr);
      setOpen(new Set());
      setBombs(bombSet);
      setX(x);
      setY(y);
      animaRef.current = new AnimateController(ha);
      animaRef.current.abort();
    });
  };

  const handleGameOver = (win: boolean) => {
    animaRef.current?.abort();
    const [s, ms] = toTimeCarry(Date.now() - startAtRef.current, 1000);
    setSubheader(`${s}s ${ms}`);
    setMarked(win ? bombs : new Set());
    setOpen(new Set(list.map((e) => e.id)));
  };

  const handleGameRestart = () => {
    animaRef.current?.abort();
    setList([]);
    setBombs(new Set());
    setOpen(new Set());
    setMarked(new Set());
    setX(0);
    setY(0);
    setSubheader("");
  };

  return (
    <Box>
      <Card
        sx={{
          marginInline: "auto",
          inlineSize: "fit-content",
        }}
      >
        <CardHeader
          title="minesweeper"
          titleTypographyProps={{ textTransform: "capitalize" }}
          subheader={subheader}
          action={
            <IconButton onClick={handleGameRestart}>
              <CloseOutlined />
            </IconButton>
          }
        />
        <CardContent>
          <Grid2 container spacing={6}>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                value={level}
                onChange={(e) => {
                  setLevel(e.target.value);
                  switch (e.target.value) {
                    case "easy":
                      handleGameStart(9, 9, 10);
                      break;
                    case "normal":
                      handleGameStart(16, 16, 40);
                      break;
                    case "hard":
                      handleGameStart(30, 16, 99);
                      break;
                  }
                }}
                fullWidth
                select
              >
                <MenuItem value="easy">easy</MenuItem>
                <MenuItem value="normal">normal</MenuItem>
                <MenuItem value="hard">hard</MenuItem>
              </TextField>
            </Grid2>
          </Grid2>
        </CardContent>
        <Box
          sx={() => ({
            display: "grid",
            gridTemplateColumns: `repeat(${x},minmax(30px,1fr))`,
            gridTemplateRows: `repeat(${y},minmax(30px,1fr))`,
            placeItems: "center",
          })}
        >
          {list.map((item) => (
            <Cell
              key={item.id}
              list={list}
              bombs={bombs}
              item={item}
              setOpen={setOpen}
              setMarked={setMarked}
              isOpen={open.has(item.id)}
              isMarked={marked.has(item.id)}
              handleGameOver={handleGameOver}
            />
          ))}
        </Box>
      </Card>
    </Box>
  );
}

type CellProps = {
  list: Item[];
  bombs: Set<string>;
  item: Item;
  setMarked: React.Dispatch<React.SetStateAction<Set<string>>>;
  setOpen: React.Dispatch<React.SetStateAction<Set<string>>>;
  isOpen: boolean;
  isMarked: boolean;
  handleGameOver(win: boolean): void;
};

function Cell(props: CellProps) {
  const {
    list,
    bombs,
    item,
    setMarked,
    setOpen,
    isOpen,
    isMarked,
    handleGameOver,
  } = props;

  return (
    <StyledCellOuter>
      <StyledCellInner>
        <IconButton
          size="small"
          onClick={(e) => {
            if (e.button !== 0) {
              return;
            }

            React.startTransition(() => {
              // Game over, because the bomb was clicked
              if (bombs.has(item.id)) {
                handleGameOver(false);
                return;
              }

              setMarked((prev) => {
                const nextValue = new Set(prev);
                nextValue.delete(item.id);

                return nextValue;
              });

              let nextOpen = new Set<string>();

              setOpen((prev) => {
                nextOpen = new Set(prev);
                nextOpen.add(item.id);

                const handled = new WeakSet<Item>();

                const fn = (item: Item) => {
                  if (isAroundBomb(item, list, bombs)) {
                    return;
                  }

                  if (handled.has(item)) {
                    return;
                  }

                  handled.add(item);
                  getAroundItems(item, list).forEach((el) => {
                    nextOpen.add(el.id);
                    fn(el);
                  });
                };

                fn(item);

                return nextOpen;
              });

              // Game over, only the bombs are left
              if (
                !isEqualSet(
                  bombs,
                  new Set(
                    list
                      .filter((item) => !nextOpen.has(item.id))
                      .map((item) => item.id),
                  ),
                )
              ) {
                return;
              }

              handleGameOver(true);
            });
          }}
          onContextMenu={(e) => {
            e.preventDefault();

            React.startTransition(() => {
              let nextMarked = new Set<string>();

              setMarked((prev) => {
                nextMarked = new Set(prev);
                void (nextMarked.has(item.id)
                  ? nextMarked.delete(item.id)
                  : nextMarked.add(item.id));
                return nextMarked;
              });

              // The game is over, all bombs are marked
              if (!isEqualSet(nextMarked, bombs)) {
                return;
              }

              handleGameOver(true);
            });
          }}
          disabled={isOpen}
        >
          {renderIcon(item, list, bombs, isOpen, isMarked)}
        </IconButton>
      </StyledCellInner>
    </StyledCellOuter>
  );
}

class Item {
  id: string;

  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {
    this.id = `x${this.x}y${this.y}`;
  }
}

function getDifferenceAndRemainder(
  dividend: number,
  divisor: number,
): [number, number] {
  return [Math.floor(dividend / divisor), dividend % divisor];
}

function getAroundItems(item: Item, list: Item[]) {
  return list.filter(
    (el) =>
      !Object.is(item.id, el.id) &&
      Object.is(minmax(el.x, { min: item.x - 1, max: item.x + 1 }), el.x) &&
      Object.is(minmax(el.y, { min: item.y - 1, max: item.y + 1 }), el.y),
  );
}

function isEqualSet(set1: Set<string>, set2: Set<string>) {
  return Object.is(
    [...set1.values()].sort().join(),
    [...set2.values()].sort().join(),
  );
}

function getAroundBombs(item: Item, list: Item[], bombs: Set<string>) {
  return getAroundItems(item, list).filter((el) => bombs.has(el.id)).length;
}

function isAroundBomb(item: Item, list: Item[], bombs: Set<string>) {
  return getAroundItems(item, list).some((el) => bombs.has(el.id));
}

function renderIcon(
  item: Item,
  list: Item[],
  bombs: Set<string>,
  open: boolean,
  marked: boolean,
) {
  const id = item.id;

  if (marked) {
    return <FlagCircleOutlined color="warning" fontSize="small" />;
  }

  if (!open) {
    return <CircleOutlined fontSize="small" />;
  }

  if (bombs.has(id)) {
    return <OfflineBoltOutlined color="error" fontSize="small" />;
  }

  const arroundBombs = getAroundBombs(item, list, bombs);

  switch (arroundBombs) {
    case 0:
      return <FilterNoneOutlined color="success" fontSize="small" />;
    case 1:
      return <Filter1Outlined color="info" fontSize="small" />;
    case 2:
      return <Filter2Outlined color="secondary" fontSize="small" />;
    case 3:
      return <Filter3Outlined color="primary" fontSize="small" />;
    case 4:
      return <Filter4Outlined color="action" fontSize="small" />;
    case 5:
      return <Filter5Outlined color="error" fontSize="small" />;
    case 6:
      return <Filter6Outlined fontSize="small" />;
    case 7:
      return <Filter7Outlined fontSize="small" />;
    case 8:
      return <Filter8Outlined fontSize="small" />;
  }
}

const StyledCellOuter = styled("div")(() => ({
  position: "relative",
  inlineSize: "100%",

  "&::before": {
    content: "''",
    display: "block",
    paddingInlineStart: "100%",
    paddingBlockStart: "100%",
    inlineSize: 0,
    blockSize: 0,
  },
}));

const StyledCellInner = styled("div")({
  position: "absolute",
  inset: 0,
  zIndex: 10,
  inlineSize: "100%",
  blockSize: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
