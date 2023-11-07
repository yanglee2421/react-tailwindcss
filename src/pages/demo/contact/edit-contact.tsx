// React Imports
import React from "react";

export function EditContact({ savedContact, onSave }: EditContactProps) {
  const [name, setName] = React.useState(savedContact.name);
  const [email, setEmail] = React.useState(savedContact.email);

  return (
    <section>
      <label>
        姓名：{" "}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        邮箱：{" "}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <button
        onClick={() => {
          const updatedData = {
            id: savedContact.id,
            name: name,
            email: email,
          };
          onSave(updatedData);
        }}
      >
        保存
      </button>
      <button
        onClick={() => {
          setName(savedContact.name);
          setEmail(savedContact.email);
        }}
      >
        重置
      </button>
    </section>
  );
}

export interface EditContactProps {
  onSave(savedContact: SavedContact): void;
  savedContact: SavedContact;
}

export interface SavedContact {
  id: number;
  name: string;
  email: string;
}
