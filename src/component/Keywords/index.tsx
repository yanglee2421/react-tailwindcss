import { useState, useMemo } from "react";
import { useStyle } from "@/hook";
import { Tag, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import style from "./style.module.scss";

interface KeywordsProps {
  value?: string[];
  onChange?(params: string[]): void;
}

export function Keywords(props: KeywordsProps) {
  const { value, onChange } = props;

  const cx = useStyle(style);

  const tags = useMemo(() => {
    if (!Array.isArray(value)) return;

    const color = colors();

    const handleClose = (str: string) => {
      return (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();

        const target = value.filter((item) => item !== str);
        onChange?.(target);
      };
    };

    return value.map((item, index) => (
      <Tag
        key={item}
        color={color[index % color.length]}
        closable
        onClose={handleClose(item)}
      >
        {item}
      </Tag>
    ));
  }, [value]);

  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");
  const inputElement = useMemo(() => {
    if (!showInput)
      return (
        <Tag onClick={() => setShowInput(true)} className={cx("tag-dash")}>
          <PlusOutlined />
          New Tag
        </Tag>
      );

    const handleAdd = () => {
      const arr = value || [];
      const isExist = arr.includes(input);
      const target = isExist ? arr : [...arr, input];
      onChange?.(target);
      setInput("");
      setShowInput(false);
    };

    const handleClose = () => {
      setInput("");
      setShowInput(false);
    };

    return (
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value.trim())}
        onPressEnter={handleAdd}
        onBlur={handleClose}
        autoFocus
        size="small"
        className={cx("tag-input")}
      />
    );
  }, [showInput, input]);

  return (
    <div className={cx("keywords")}>
      {tags}
      {inputElement}
    </div>
  );
}

function colors() {
  return [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple",
  ];
}
