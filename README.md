## Init

- `main` 分支是基础脚手架
- `dev` 分支项目实现

```
# js
npx create-react-app my-app
# ts
npx create-react-app my-app --template typescript

cd my-app/
npm install --save-dev hardhat
npx hardhat

# openzeppelin
npm install @openzeppelin/contracts

# ipfs
npm install axios ipfs-http-client
```

- 运行 `npx hardhat`,未安装 `hardhat` 时自动安装，然后初始化 hardhat 项目；
- 已安装则可查看所有任务和参数；

## Hardhat Tasks

```shell
npx hardhat help

# Start a local node
npx hardhat node

# Test
npx hardhat test
npx hardhat test REPORT_GAS=true

# Compile
npx hardhat compile

# Deploy
npx hardhat run scripts/deploy.ts
npx hardhat run scripts/deploy.ts --network localhost
npx hardhat run scripts/deploy.ts --network <your-network>
```

## 开发

1. 启动项目

```
npm start
```

2. 启动开发链

```
npx hardhat node
```

3. 切换 metamask 网络到 localhost，导入账户，拷贝开发链提供的私钥，hardhat 的链 ID： 31337

4. 编译&部署

```
npx hardhat compile

# 开发时要部署在localhost
npx hardhat run scripts/deploy.ts --network localhost
```

## 存储

### IPFS

依赖 存储:ipfs-http-client 取数据:axios

```
npm i axios ipfs-http-client
```

启动

```
ipfs daemon
```

### ARWEAVE

## 目录结构

TODO

## Npm Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests]() for more information.

### `npm run build`

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
