import React, { FC, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { connect } from '../service/connection-service';

interface IProps {}

const Connect: FC<IProps> = (props) => {
  useEffect(() => {}, []);
  const connectWallet = async () => {
    await connect();
  };

  return (
    <div>
      <button onClick={connectWallet}>connect</button>
    </div>
  );
};

export default Connect;
