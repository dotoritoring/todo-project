import axios from "axios";
import DoneList from "./DoneList";
import TodoList from "./TodoList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { init } from "../store/module/todo";

export default function ListContainer() {
  async function getTodoAll() {
    const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/todos`);
    console.log("=================", res.data);
    if (res.data) dispatch(init(res.data)); // 서버로부터 응답받은 데이터를 TodoState에 넣어 초기화
  }

  const dispatch = useDispatch();

  useEffect(() => {
    getTodoAll();
  }, []);

  return (
    <div className="ListContainer">
      <TodoList />
      <DoneList />
    </div>
  );
}
