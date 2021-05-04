import { useState } from 'react';
import { Extension } from '@terra-money/terra.js';
import { useRouter } from 'next/router';

export default () => {
  const [wallet, setWallet] = useState<any>();
  const ext = new Extension();
  const router = useRouter();
  const connect = () => {
    ext.connect();
    ext.on('onConnect', setWallet);
    router.push('/dashboard');
  };

  return { connect, wallet };
};
