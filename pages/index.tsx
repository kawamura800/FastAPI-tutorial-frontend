"use client";
import axios from "axios";
import InputForm from "@/components/InputForm";
import TodoItem from "@/components/TodoItem";
import { MouseEvent, useEffect, useState, createContext } from "react";
import { Todo, UpdateTodo, CreateTodo } from "./schema";

export const TodoContext = createContext<Todo[]>([]);

export default function Home() {
  // setTextでtextを更新。初期値は空で定義
  const [text, setText] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // 初期画面でTodo一覧を取得
  useEffect(() => {
    getTodos();
  }, []);

  //  changeText関数
  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value); //  e.target.valueで入力されたものを取り出しtextを変更
  };

  //  日付を取得するchangeDate関数
  const changeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDate(e.target.value); //  e.target.valueで入力されたものを取り出しdateを変更
  };

  // Todoを取得
  const getTodos = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/todos`)
      .then((res) => {
        setTodos(res.data);
        console.log(todos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Todo[]を並べ替え
  const sortedTodo = todos.sort((a, b) => a.id - b.id);

  // Todoを追加
  const handleAdd = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    if (!text.trim()) {
      alert("Todoを入力してください");
      return;
    }
    if (date == "") {
      alert("期日を選択してください");
      return;
    }
    const newTodo: CreateTodo = {
      content: text,
      deadline: date,
      checked: false,
    };
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/todos`, newTodo)
      .then((res) => {
        console.log(res);
        setText("");
        setDate("");
        getTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Todoの編集
  const handleContent = (id: number, content: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.content = content;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  // deadlineの編集
  const handleDeadline = (id: number, deadline: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.deadline = deadline;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  // checkedの変更
  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  //  Todoの更新
  const handleUpdate = async (todo: Todo) => {
    const newTodo: UpdateTodo = {
      content: todo.content, //対象のtodoをとってくる
      deadline: todo.deadline,
      checked: todo.checked,
    };
    await axios
      .put(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/todos/${todo.id}`, newTodo)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //  Todoの削除
  const handleDelete = async (id: number) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/todos/${id}`, {
        params: { id: id },
      })
      .then((res) => {
        console.log(res);
        getTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-indigo-700">
      <div className="max-w-md mx-auto flex flex-col items-center justify-center pt-20">
        <main>
          <h1 className="text-4xl font-bold text-white mb-8">Todo</h1>

          <InputForm
            text={text}
            date={date}
            changeText={changeText}
            changeDate={changeDate}
            handleAdd={handleAdd} />

          <TodoItem
            sortedTodo={sortedTodo}
            handleContent={handleContent}
            handleUpdate={handleUpdate}
            handleDeadline={handleDeadline}
            handleChecked={handleChecked}
            handleDelete={handleDelete} />

          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white"
              onClick={getTodos}
            >
              GET Todo
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}