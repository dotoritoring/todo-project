import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create, done } from "../store/module/todo";
import { ReduxState } from "../types/interface";
import axios from "axios";

export default function TodoList() {
  const list = useSelector((state: ReduxState) => state.todo.list);
  // console.log(list);
  const todoList = list.filter((li) => li.done === false);
  console.log("==========todoList", todoList);

  const dispatch = useDispatch();
  const todoRef = useRef<HTMLInputElement>(null);
  const nextID = useSelector((state: ReduxState) => state.todo.nextID);

  const createTodo = async () => {
    // dispatch({type:"todo/CREATE", payload:{id:3, text:todoRef.current.value}})
    // dispatch(create({ id: list.length, text: todoRef.current.value }));
    if (nextID && todoRef.current) {
      const res = await axios.post(`${process.env.REACT_APP_API_SERVER}/todo`, {
        text: todoRef.current.value,
      });
      dispatch(create({ id: nextID, text: todoRef.current.value }));
      todoRef.current.value = "";
    }
  };

  const completeTodo = async (id: number) => {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_SERVER}/todo/${id}`
    );
    dispatch(done(id));
  };
  return (
    <section className="TodoList">
      <h2>오늘의 할 일</h2>
      <div>
        <input type="text" placeholder="Todo" ref={todoRef} />
        <button onClick={createTodo}>할 일 추가</button>
      </div>
      <ul>
        {/*<li>
          <span>
            할 일1 <button>완료</button>
          </span>
        </li>
        <li>
          <span>
            할 일2 <button>완료</button>
          </span>
        </li>
        <li>
          <span>
            할 일3 <button>완료</button>
          </span>
  </li>*/}
        {todoList.map((todo) => {
          return (
            <li key={todo.id}>
              <span>{todo.text}</span>
              <button
                // onClick={() => dispatch({ type: "todo/DONE", id: todo.id })}
                onClick={() => completeTodo(todo.id)}
              >
                완료
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
