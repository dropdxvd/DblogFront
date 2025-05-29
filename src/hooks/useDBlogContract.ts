import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { useState } from 'react';
import { beginCell, toNano, Address} from 'ton-core';
import { Dictionary} from "@ton/core";
import { TonClient } from '@ton/ton';
import { getHttpEndpoint } from '@orbs-network/ton-access';



const CONTRACT_ADDRESS = 'kQCnIAMJkhrwPMl8ucT3omASIGvFElx0DcXpjimVOyyE4DnP';

export function useDBlogContract() {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  const [posts, setPosts] = useState<{ index: number; text: string }[]>([]);
  const [balance, setBalance] = useState('0');

  const fetchPosts = async () => {
  try {
    const endpoint = await getHttpEndpoint({ network: 'testnet' });
    const client = new TonClient({ endpoint });
    const contractAddress = Address.parse(CONTRACT_ADDRESS);

    const result = await client.runMethod(contractAddress, 'AllPosts');

    
    const slice = result.stack.readCell().beginParse();

	const dict = Dictionary.loadDirect(Dictionary.Keys.Int(257), {
		parse: (src) => ({ text: src.loadStringTail() }),
			serialize: () => { throw new Error("Not implemented"); }
	}, slice);

    const parsedPosts: { index: number; text: string }[] = [];

    for (const key of dict.keys()) {
      const post = dict.get(key) as { text: string };
      if (post) {
        parsedPosts.push({ index: Number(key), text: post.text });
      }
    }

    setPosts(parsedPosts);
  } catch (err) {
    console.error('Ошибка при получении постов:', err);
  }
};


  const fetchBalance = async () => {
    try {
      const endpoint = await getHttpEndpoint({ network: 'testnet' });
      const client = new TonClient({ endpoint });
      const contract = Address.parse(CONTRACT_ADDRESS);

      const result = await client.runMethod(contract, 'Balance');
      const stack = result.stack;
      const nanotons = BigInt(stack.readNumber());
      setBalance((Number(nanotons) / 1e9).toFixed(3) + ' TON');
    } catch (err) {
      console.error(' Ошибка при получении баланса:', err);
    }
  };

  const sendPost = async (text: string) => {
    try {
      if (!wallet?.account?.address) {
        console.warn('Кошелёк не подключён');
        return;
      }

      if (!text || text.trim().length === 0) {
        console.warn('Пустой пост — не отправляем');
        return;
      }

      if (text.length > 120) {
        console.warn('Слишком длинный пост, обрезаем');
        text = text.slice(0, 120);
      }

      const cell = beginCell()
        .storeUint(0x5b3b21dd, 32)
        .storeRef(beginCell().storeStringTail(text))
        .endCell();

      const payload = cell.toBoc().toString('base64');

      await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 60,
        messages: [
          {
            address: CONTRACT_ADDRESS,
            amount: toNano('2').toString(),
            payload,
          },
        ],
      });

      console.log('Транзакция отправлена:', text);

      
      fetchPosts();
    } catch (err) {
      console.error('Ошибка при отправке поста:', err);
    }
  };

  return {
    posts,
    balance,
    sendPost,
    fetchPosts,
    fetchBalance,
  };
}


