import React from 'react';

interface PostListProps {
  posts: { index: number; text: string }[];
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="p-6 bg-white rounded-2xl shadow-md border text-gray-500">
        ‍Постов пока нет.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.index}
          className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition"
        >
          <div className="text-sm text-gray-500 mb-2">#{post.index}</div>
          <div className="text-gray-900 text-base">{post.text}</div>
        </div>
      ))}
    </div>
  );
}

