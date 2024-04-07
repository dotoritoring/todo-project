import { Todo, TodoState } from "../../types/interface";

const initialState: TodoState = {
  list: [],
};

// let CREATE = "todo/CREATE" as const;  // string 타입 추론
const INIT = "todo/INIT" as const;
const CREATE = "todo/CREATE" as const; // (형변환), 타입이 아닌 todo/CREATE만 올 수 있음
const DONE = "todo/DONE" as const;

let count = initialState.list.length;
initialState["nextID"] = count; // 추가될 할 일의 id값을 미리 계산하여 update

export const init = (data: Todo[]) => ({
  type: INIT,
  data, //object {id, text, done}
});
export const create = (payload: { id: number; text: string }) => ({
  type: CREATE, //string
  payload, //object {id, text}
});

export const done = (id: number) => ({
  type: DONE, //string
  id, //number
});
// interface Action {
//   type: string;
//   id?: number;
//   payload?: { id: number; text: string };
// }
interface Init {
  type: typeof INIT;
  data: Todo[];
}

interface Create {
  type: typeof CREATE;
  payload: { id: number; text: string };
}
interface Done {
  type: typeof DONE;
  id: number;
}

type Action = Create | Done | Init; // type이  Create or Done or Init

export function todoReducer(state = initialState, action: Action) {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        list: action.data,
        nextID:
          action.data.length === 0
            ? 1
            : action.data[action.data.length - 1].id + 1,
      };
    case CREATE:
      if (action.payload.text.trim() === "") return state;
      return {
        ...state,
        list: state.list.concat({
          id: action.payload.id,
          text: action.payload.text,
          done: false,
        }),
        nextID: action.payload.id + 1,
      };
    case DONE:
      return {
        ...state,
        list: state.list.map((li) => {
          if (li.id === action.id) {
            return {
              ...li,
              done: true, // 기존 요소를 그대로 둔 후, done 속성만 true로 변경
            };
          } else {
            return li;
          }
        }),
      };
    default:
      return state;
  }
}
