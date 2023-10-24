//@ts-nocheck
import { useState, useEffect } from 'react';
import { ethers, Contract } from 'ethers';
import { Connect } from './components';
import NftBrowser from './components/common/NftBrowser';
import NftMintor from './components/personal-comp/NftMintor';

import { ownedTypedNFT } from './service/nft-service';

import Lock from './artifacts/contracts/Lock.sol/Lock.json';

import './App.css';

function App() {
  const [contractAddress, setContractAddress] = useState(
    '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  );
  const [accountAddress, setAccountAddress] = useState('');

  const [myInput, setMyInput] = useState('');
  const [msgInfo, setMsgInfo] = useState('');

  // 连接metamask
  const connectMeta = async () => {
    let signer = null;
    let provider;

    try {
      if (window.ethereum == null) {
        // If MetaMask is not installed, we use the default provider,
        // which is backed by a variety of third-party services (such
        // as INFURA). They do not have private keys installed so are
        // only have read-only access
        console.log('MetaMask not installed; using read-only defaults');
        provider = ethers.getDefaultProvider();
      } else {
        // Connect to the MetaMask EIP-1193 object. This is a standard
        // protocol that allows Ethers access to make all read-only
        // requests through MetaMask.
        provider = new ethers.BrowserProvider(window.ethereum);

        // It also provides an opportunity to request access to write
        // operations, which will be performed by the private key
        // that MetaMask manages for the user.
        signer = await provider.getSigner();
        setAccountAddress(signer.address);
      }
    } catch (error) {
      console.error('ERROR: ', error);
    }
    console.log('provider: ', provider);
    console.log('signer: ', signer);
  };

  const readMsg = async () => {
    let provider;
    try {
      if (window.ethereum == null) {
        console.log('MetaMask not installed; using read-only defaults');
        provider = ethers.getDefaultProvider();
      } else {
        provider = new ethers.BrowserProvider(window.ethereum);
      }
    } catch (error) {
      console.error('ERROR: ', error);
    }
    // 只读的合约
    const lock = new Contract(contractAddress, Lock.abi, provider);

    const msg = await lock.message();
    setMsgInfo(msg);
    console.log('Contract: ', lock);
  };

  const setMsg = async () => {
    let provider;
    let signer = null;
    try {
      if (window.ethereum == null) {
        console.log('MetaMask not installed; using read-only defaults');
        provider = ethers.getDefaultProvider();
      } else {
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        setAccountAddress(signer.address);
      }
    } catch (error) {
      console.error('ERROR: ', error);
    }
    // 可改变状态的合约
    const lock = new Contract(contractAddress, Lock.abi, signer);
    const transaction = await lock.setMessage(myInput);
    const tx = await transaction.wait();
    console.log(`tx: `, tx);
  };

  const handleChange = (e) => {
    setMyInput(e.target.value);
  };

  const [nfts, setNfts] = useState<Nft[]>([]);

  useEffect(() => {
    loadNfts();
  }, []);

  const loadNfts = async () => {
    const ns = await ownedTypedNFT('image');
    if (ns.success) setNfts(ns.data);
    console.log('mounted!');
  };

  return (
    <div className="App">
      <Connect />
      <div>Contract Address is {contractAddress}</div>
      <div>Account Address is {accountAddress}</div>
      <div>Message {msgInfo}</div>
      <button onClick={connectMeta}>connect metamask</button>
      <button onClick={readMsg}>read msg</button>
      <input onChange={handleChange} value={myInput} />
      <button onClick={setMsg}>set msg</button>
      <NftMintor />

      <NftBrowser nfts={nfts} />
    </div>
  );
}

export default App;
