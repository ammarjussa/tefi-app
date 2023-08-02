import { Msg } from '@terra-money/terra.js';
import useFee from '../utils/useFee';

export const getTxOptions = (msgs: Msg[], memo = undefined) => {
  const { gasPrice } = useFee(msgs.length);
  const gasPrices = `${gasPrice}uusd`;
  const tax = '0';
  const fee = tax;
  const txOptions = {
    msgs,
    memo: memo,
    gasPrices,
    fee,
    purgeQueue: true,
  };
  return txOptions;
};
