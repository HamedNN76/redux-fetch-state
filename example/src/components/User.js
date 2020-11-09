import React from "react";

export default function User(props) {
  const { user } = props;

  return (
    <div>
      <p>{user.name}</p>
    </div>
  );
}
