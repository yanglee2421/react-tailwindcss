// Components Imports
import React from "react";
import { EditContact, SavedContact } from "./edit-contact";

// Clsx Imports
import clsx from "clsx";

export function Contact() {
  const [usrList, setUsrList] = React.useState(getUserList);
  const [selectedId, setSelectedId] = React.useState(1);

  const savedContact = usrList.find((item) => item.id === selectedId)!;

  const handleSave = (savedContact: SavedContact) => {
    setUsrList((prev) => {
      const list = Array.from(prev);
      const idx = list.findIndex((item) => item.id === savedContact.id);
      list.splice(idx, 1, savedContact);
      return list;
    });
  };

  const listNode = React.useMemo(() => {
    return usrList.map((item) => {
      const handleClick = () => {
        setSelectedId(item.id);
      };

      return (
        <button
          onClick={handleClick}
          className={clsx(item.id === selectedId && "font-bold")}
        >
          {item.name}
        </button>
      );
    });
  }, [usrList, selectedId, setSelectedId]);

  return (
    <>
      {listNode}
      <hr />
      <EditContact
        key={selectedId}
        savedContact={savedContact}
        onSave={handleSave}
      />
    </>
  );
}

function getUserList() {
  return [
    {
      id: 1,
      name: "Taylor",
      email: "taylor@mail.com",
    },
    {
      id: 2,
      name: "Alice",
      email: "alice@mail.com",
    },
    {
      id: 3,
      name: "Bob",
      email: "bob@mail.com",
    },
  ];
}
