import COS from 'cos-js-sdk-v5';

import { getEnvInfo } from './storage';

const { secretId, secretKey, region, bucket } = getEnvInfo() || {};
let cos = new COS({
  SecretId: secretId,
  SecretKey: secretKey,
});

export const getFileUrlByName = (name: string, owner: string): string =>
  `https://${owner}.cos.${region}.myqcloud.com/${name}`;

export interface GetFileResp {
  Contents: Array<{
    Size: string;
    Key: string;
  }>;
  Name: string;
  statusCode: number;
}

export const getFiles = (): Promise<GetFileResp> => {
  return new Promise((resolve, reject) => {
    cos.getBucket({ Bucket: bucket, Region: region }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const { statusCode } = data;
        if (statusCode === 200) {
          resolve(data);
        } else {
          reject(err);
        }
      }
    });
  });
};

export interface UpdateFileResp {
  Location: string;
  statusCode: number;
}

export interface ProgressData {
  percent: number;
  loaded: number;
  total: number;
}

export const uploadFile = (
  fileObj: File,
  onProgress?: (progressData: ProgressData) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    cos.putObject(
      {
        Bucket: bucket,
        Region: region,
        Key: fileObj.name,
        StorageClass: 'STANDARD',
        Body: fileObj,
        onProgress,
      },
      function (err, data: UpdateFileResp) {
        if (err) {
          reject(err);
        } else {
          const { Location, statusCode } = data;
          if (statusCode === 200) {
            resolve(Location);
          } else {
            reject(statusCode);
          }
        }
      }
    );
  });
};
