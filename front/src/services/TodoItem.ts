import axios from "axios";
import { ICreateTodoItem } from "../interfaces/ICreateTodoItem";
import { ITodoItem } from "../interfaces/ITodoItem";
import API_URL from "../vite-env.d";
const baseURL = `${API_URL}/todoitems`;

export const getTodoList = async () => {
  return await axios.get(`${baseURL}`);
};

export const deleteTodoItem = async (id: number) => {
  return await axios.delete(`${baseURL}/${id}`);
};

export const updateTodoItem = async (id: number, todoItem: ITodoItem) => {
  return await axios.put(`${baseURL}/${id}`, todoItem);
};

export const createTodoItem = async (todoItem: ICreateTodoItem) => {
    return await axios.post(baseURL, todoItem);
};

export const getTodoItem = async (id: number) => {
  return await axios.get(`${baseURL}/${id}`);
};
