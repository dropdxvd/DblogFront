import { TonConnectUIProvider, TonConnectButton } from '@tonconnect/ui-react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import { useDBlogContract } from './hooks/useDBlogContract';
import { useEffect } from 'react';

export default function App() {
  const { posts, balance, fetchPosts, fetchBalance, sendPost } = useDBlogContract();

  useEffect(() => {
    fetchPosts();
    fetchBalance();
  }, []);

  return (
    <TonConnectUIProvider manifestUrl="/tonconnect-manifest.json">
      <div className="min-h-screen bg-gray-100 overflow-x-hidden">
        
        <header className="bg-gradient-to-r from-white to-gray-100 shadow-md p-4 border-b border-gray-200 rounded-b-2xl">
          <div className="w-full px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">DBlog</h1>
            <TonConnectButton />
          </div>
        </header>

        
        <main className="w-full px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="md:col-span-1 space-y-6">
            <PostForm onSubmit={sendPost} />

            <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-200 text-gray-800">
              <h2 className="text-xl font-semibold mb-2">Баланс контракта:</h2>
              <p>{balance}</p>
            </div>
          </div>

          
          <div className="md:col-span-2">
            <PostList posts={posts} />
          </div>
        </main>
      </div>
    </TonConnectUIProvider>
  );
}

