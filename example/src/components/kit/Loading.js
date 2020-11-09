import React from "react";

export default function Loading(props) {
  const { loading, children } = props;

  if (loading) {
    return <p>LOADING</p>;
  } else {
    return children;
  }
}
