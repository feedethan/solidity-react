import {
  time,
  loadFixture,
} from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs';
import { expect } from 'chai';
// import { ethers } from 'hardhat';

describe('Test My NFT', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const MyNFT = await ethers.getContractFactory('MyNFT');
    const nft = await MyNFT.deploy();

    return { nft, owner, otherAccount };
  }

  describe('Mint--', function () {
    it('Should mint right?', async function () {
      const { nft, owner } = await loadFixture(deployOneYearLockFixture);
      const addr = await owner.getAddress();
      // await nft.mint(addr, 'http://aa.com');
      await nft.mint(addr, 'http://aa.com');
      expect(await nft.tokenURI(0)).to.equal('http://aa.com');
    });
  });
});
