import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';

export const toHex = (num: number) => {
  const val = Number(num);
  return `0x${val.toString(16)}`;
};

export function formatAddress(address: string) {
  return `${address.substring(0, 5)}...${address.substring(
    address.length - 4,
    address.length
  )}`;
}
export const convertToDecimal = (
  amount: string | undefined,
  decimal: string
) => {
  try {
    const _amount = !amount ? '0' : amount;
    return ethers.utils.parseUnits(_amount, decimal).toString();
  } catch (e) {
    console.log(e);
  }
};
export const convertToInt = (amount: string, decimal: string) => {
  try {
    const _amount = !amount ? '0' : amount;
    console.log(amount, decimal, 'hello');

    const result = ethers.utils.formatUnits(amount, decimal);
    console.log(result, 'helow world');

    return result;
  } catch (e) {
    console.log(e);
  }
};
