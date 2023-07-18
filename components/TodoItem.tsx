import React from 'react'
import { Todo } from '@/pages/schema';
import { nowDateTypeString } from '@/pages/validate';
import { TrashIcon } from '@heroicons/react/24/solid';

const TodoItem = ({
  sortedTodo,
  handleContent,
  handleUpdate,
  handleDeadline,
  handleChecked,
  handleDelete
}: {
  sortedTodo: Todo[],
  handleContent: any
  handleUpdate: any
  handleDeadline: any,
  handleChecked: any,
  handleDelete: any
}) => {

  return (
    <>
      <div>TodoItem</div>
      <div>
        <ul className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
          {sortedTodo.map((todo: { id: React.Key | null | undefined; content: string | number | readonly string[] | undefined; checked: boolean | undefined; deadline: string | number | readonly string[] | undefined; }) => (
            <li
              className="border-b py-4 px-6 text-xl font-medium flex items-center justify-between"
              key={todo.id}
            >
              <input
                className="w-full py-2 px-4 text-gray-700"
                type="text"
                value={todo.content}
                disabled={todo.checked}
                onChange={(e) => {
                  handleContent(todo.id, e.target.value);
                }}
                onBlur={() => handleUpdate(todo)}
              />
              <input
                className="w-full py-2 px-4 text-gray-700"
                type="date"
                min={nowDateTypeString}
                value={todo.deadline}
                disabled={todo.checked}
                onChange={(e) => {
                  handleDeadline(todo.id, e.target.value);
                }}
                onBlur={() => handleUpdate(todo)}
              />
              <input
                type="checkbox"
                className="cursor-pointer h-10 w-10"
                onClick={() => {
                  handleChecked(todo.id, todo.checked);
                }}
                onChange={() => handleUpdate(todo)}
                defaultChecked={todo.checked ? true : false}
              />
              <button
                className=""
                onClick={() => {
                  handleDelete(todo.id);
                }}
              >
                <TrashIcon className="h-6 w-6" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default TodoItem