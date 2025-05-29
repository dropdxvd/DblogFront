import { useState } from 'react';

type Props = {
  onSubmit: (text: string) => void;
};

export default function PostForm({ onSubmit }: Props) {
  const [text, setText] = useState('');

  return (
    <div className="mb-4 p-6 bg-white rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold mb-3 text-gray-800">Создать пост</h2>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition"
        rows={4}
        placeholder="Напиши что-нибудь..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          onSubmit(text);
          setText('');
        }}
        className="mt-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold px-5 py-2 rounded-lg shadow hover:shadow-lg transition"
      >
        Отправить
      </button>
    </div>
  );
}

