import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersActions } from "../redux/modules/getUsers";
import { Loading } from "../components/kit";
import Users from "../components/Users";

export default function Home() {
  const dispatch = useDispatch();

  const getUsers = useSelector((state) => state.getUsers);

  useEffect(() => {
    dispatch(getUsersActions.load());
  }, []);

  return (
    <Loading loading={getUsers.loading}>
      {getUsers.data ? <Users users={getUsers.data} /> : null}
    </Loading>
  );
}
