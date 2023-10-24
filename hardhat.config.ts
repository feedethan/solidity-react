import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const config: HardhatUserConfig = {
  solidity: '0.8.19',
  paths: {
    // create-react-app只能读取src目录下的文件，因此把编译结果放这里
    artifacts: './src/artifacts',
  },
};

export default config;
