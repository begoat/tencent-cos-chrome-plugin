import { storageKeyForEnvInfo } from '../config';

export interface EnvInfo {
  secretId: string;
  secretKey: string;
  bucket: string;
  region: string;
}

export const getEnvInfo = (): EnvInfo => {
  const storageVal = localStorage.getItem(storageKeyForEnvInfo);
  let result = null;
  try {
    return JSON.parse(storageVal);
  } catch {
    return result;
  }
};

export const setEnvInfo = (envInfo: EnvInfo): void => {
  localStorage.setItem(storageKeyForEnvInfo, JSON.stringify(envInfo));
};
