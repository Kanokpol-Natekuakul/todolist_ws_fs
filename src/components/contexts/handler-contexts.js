import { createContext } from "react";

export const HandlerContext = createContext({
    addNewTodo: (NewTodo) => {},
    deleteHandler: (id) => {},
    editHandler: (id,todo) => {},
})