import React from "react";
import User from "./User";

export default function Users(props) {
  const { users } = props;

  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}
