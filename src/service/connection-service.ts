//@ts-nocheck
// 判断应用网络和当前metamask网络是否一致，不一致则添加网络

import { ethers } from 'ethers';
import { messageBox } from '../utils';
import { configuration } from '../config';

export const connectOnce = async () => {
  //   debugger;
  //   let provider = new ethers.providers.Web3Provider(window.ethereum);
  //   await provider.send('eth_requestAccounts', []);
  //   let signer = provider.getSigner();

  let signer = null;
  let provider;

  try {
    if (window.ethereum == null) {
      console.log('MetaMask not installed; using read-only defaults');
      provider = ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
    }
  } catch (error) {
    console.error('ERROR: ', error);
  }
  let network = await provider.getNetwork();
  let address = await signer.getAddress();
  console.log(provider, signer, network.chainId, address);
  //   console.log('-------', network, address);
  return { chainId: network.chainId, address: address, provider, signer };
};

export const trying = async () => {
  const { chainId, address, provider, signer } = await connectOnce();
  const supported = configuration().chainId.toString();
  if (chainId == supported) {
    messageBox(
      'success',
      '',
      'chainId: ' + chainId + '      account: ' + address.substring(0, 5) + '..'
    );

    return { success: true, provider, signer };
  }

  messageBox(
    'warning',
    '',
    'chainId: ' + chainId + '      account: ' + address.substring(0, 5) + '..'
  );

  return { success: false };
};

export const connect = async () => {
  let { success } = await trying();
  if (success) return;
  const conf = configuration();
  await window.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: conf.params,
  });
  await trying();
};
