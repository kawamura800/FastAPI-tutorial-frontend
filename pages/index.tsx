"use client"
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState<Todo[]>([]);
  const [text, setText] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const url = [
    "http://127.0.0.1:8000/",
    "http://127.0.0.1:8000/todos"
  ];

  //  Todoオブジェクトの型定義
  type Todo = {
    content: string;
    id: number; //key指定のため
    deadline: string;
  };

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
  const getTodos = () => {
    axios.get(url[1]).then((res) => {
      setData(res.data)
      console.log(data.map((todo) => {
        return todo.content
      }))
    })
  }

  // Todoを追加
  const addTodos = () => {
    axios.post(url[1]).then()
  }


  return (
    <main>
      <h1>Todo</h1>
      {/* {if文のような条件式 ? trueだった場合の処理 : falseだった場合の処理} */}
      <div>
        <button onClick={getTodos}>GET Todo</button> 
      </div>


      <div>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <input
                  type="text"
                  value={todo.content}
                  // onChange={(e) => editTodo(todo.id, e.target.value)}
                />
                <input
                  type="date"
                  // min={nowDateString}
                  value={todo.deadline}
                  // onChange={(e) => editDate(todo.id, e.target.value)}
                />

                {/* <button
                  onClick={() => {
                    deleteTodo(todo.id);
                  }}
                >
                  削除
                </button> */}
              </li>
            ))}
          </ul>
        </div>
    </main>
  )
}
