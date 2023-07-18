import React, { MouseEvent } from 'react'
import { nowDateTypeString } from '@/pages/validate';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

const InputForm = ({
  text,
  date,
  changeText,
  changeDate,
  handleAdd
}: {
  // 型定義
  text: string,
  date: string;
  changeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAdd: (e: MouseEvent<HTMLButtonElement>) => void;
}) => {

  return (
    <>
      <form className="w-full flex items-center bg-white rounded-lg mb-6 shadow-lg overflow-hidden">
        <input
          className="w-full py-2 px-4 text-gray-700"
          type="text"
          placeholder="Todoを入力"
          // required
          value={text}
          onChange={changeText}
        />
        <input
          className="w-full py-2 px-12"
          type="date"
          min={nowDateTypeString}
          value={date}
          onChange={changeDate}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white"
          type="submit"
          onClick={handleAdd}
        >
          <PlusCircleIcon className="h-8 w-8" />
        </button>
      </form>

    </>
  )
}

export default InputForm