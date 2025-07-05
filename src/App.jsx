import { useEffect, useReducer, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import NewTodoTask from "./components/NewTodoTask/NewTodoTask";
import TodoList from "./components/TodoList/TodoList";
import { act } from "react";
import { HandlerContext } from "./components/contexts/handler-contexts";

let count = 4;

function uniqueId() {
  count = count + 1;
  return count;
}

const INITAL_TODOS = [
  {
    id: 1,
    task: "Read a book",
    dueDate: new Date("2023-02-28"),
    isFinished: false,
  },
  {
    id: 2,
    task: "Buy dog food",
    dueDate: new Date("2024-06-14"),
    isFinished: true,
  },
  {
    id: 3,
    task: "Go to cinema",
    dueDate: new Date("2023-05-20"),
    isFinished: true,
  },
  {
    id: 4,
    task: "Print homework",
    dueDate: new Date("2024-07-26"),
    isFinished: true,
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.newTodo];
    case "DELETE_TODO":
      return state.filter((e) => e.id !== action.id);
    case "EDIT_TODO": {
      const newTodoList = [...state];
      const index = newTodoList.findIndex((e) => e.id === action.editid);
      if (index !== -1) {
        newTodoList[index] = { ...action.todo };
      }
      return newTodoList;
    }
    default:
      return state;
  }
}

function App() {
  const [todoList, dispatch] = useReducer(reducer, {}, () => {
    const localTodo = localStorage.getItem("todo");
    if (localTodo === null) {
      return INITAL_TODOS;
    }
    return JSON.parse(localTodo).map((e) => {
      return {
        ...e,
        dueDate: new Date(e.dueDate),
      };
    });
  });
  const [curYear, setCurYear] = useState("2023");
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todoList));
  }, [todoList]);

  const addNewTodo = (newTodo) => {
    const newTodoItem = {
      ...newTodo,
      id: uniqueId(),
    };
    dispatch({
      type: "ADD_TODO",
      newTodo: newTodoItem,
    });
  };

  const deleteHandler = (id) => {
    dispatch({
      type: "DELETE_TODO",
      id: id,
    });
  };

  const editHandler = (id, todo) => {
    dispatch({
      type: "EDIT_TODO",
      editid: id,
      todo: todo,
    });
  };

  return (
    <HandlerContext.Provider
      value={{
        addNewTodo: addNewTodo,
        deleteHandler: deleteHandler,
        editHandler: editHandler,
      }}
    >
      <div className="App">
        <Header value={curYear} onChange={(e) => setCurYear(e.target.value)} />
        {isShow ? (
          <NewTodoTask setIsShow={setIsShow}  />
        ) : (
          <div style={{ marginTop: "10px" }}>
            <button onClick={() => setIsShow(true)}>Add new Todo</button>
          </div>
        )}
        <TodoList
          editHandler={editHandler}
          deleteHandler={deleteHandler}
          currentYear={curYear}
          todoList={todoList}
        />
      </div>
    </HandlerContext.Provider>
  );
}

export default App;
