import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../types/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function DoneList() {
  const list = useSelector((state: ReduxState) => state.todo.list);

  const doneList = list.filter((li) => li.done === true);
  console.log("============완료", doneList);
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
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
