import { create as ipfsHttpClient } from 'ipfs-http-client';
import { IPFS } from '../config';
import axios from 'axios';

/**
 * 封装ipfs存储
 */

const ipfs = ipfsHttpClient({
  host: IPFS.domain,
  port: IPFS.port,
  protocol: IPFS.protocol,
});

export const addToIpfs = async (entity: any): Promise<string> => {
  // debugger;
  const added = await ipfs.add(entity);
  console.log(added);
  const cid = added.path;
  const rst = IPFS.url_prefix + cid;
  return rst;
};

export const readArticle = async (uri: string): Promise<string> => {
  const res = await axios.get(uri);
  return res.data;
};
export const storeNftImage = async (file: any) => {
  return await addToIpfs(file);
};

export const storeMeta = async (meta: any) => {
  return await addToIpfs(meta);
};

export const storeArticle = async (article: any) => {
  return await addToIpfs(article);
};
