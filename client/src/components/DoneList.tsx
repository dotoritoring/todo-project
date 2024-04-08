import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../types/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { done, init } from "../store/module/todo";

export default function DoneList() {
  const list = useSelector((state: ReduxState) => state.todo.list);
  const dispatch = useDispatch();

  const doneList = list.filter((li) => li.done === true);

  async function patchTodo(id: number) {
    console.log("수정");
    const res = await axios.patch(
      `${process.env.REACT_APP_API_SERVER}/todo/${id}`
    );
    dispatch(done(id));
  }
  async function deleteDone(id: number) {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_SERVER}/todo/${id}`
    );
    const doneList = list.filter((li) => li.id !== id);
    console.log("=================삭제 완료 후", doneList);
    dispatch(init(doneList));
  }
  return (
    <section className="DoneList">
      <h2>완료한 일</h2>
      {doneList.length === 0 ? (
        <p>다 한게 없어요...</p>
      ) : (
        <ul>
          {doneList.map((done) => {
            return (
              <li key={done.id}>
                <span>{done.text}</span>
                <span>
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    onClick={() => patchTodo(done.id)}
                  />
                </span>
                <span>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteDone(done.id)}
                  />
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
