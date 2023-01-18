require('dotenv').config();
const express = require('express');
const AWS = require('@aws-sdk/client-kms');
const app = express();

const kmsClient = new AWS.KMS({
  region: process.env.AWS_REGION, // AWS region.
  credentials: {
    accessKeyId: process.env.AWS_KMS_ACCESS_KEY_ID, // AWS access key
    secretAccessKey: process.env.AWS_KMS_SECRET_KEY, // AWS secret key
  },
});

const encryption = async (data) => {
  const params = {
    KeyId: process.env.AWS_KMS_KEY_ID,
    Plaintext: Buffer.from(data.toString()),
  };

  const encryptedData = await kmsClient.encrypt(params);
  const { CiphertextBlob } = encryptedData;
  const result = Buffer.from(CiphertextBlob).toString('base64');
  return result;
};

// While using the decryption method it needs the encrypted data inside in Buffer format as a base64 string. ==> Buffer.from(encrypted data, 'base64');
const decryption = async (encryptedData) => {
  const params = {
    CiphertextBlob: encryptedData,
    KeyId: process.env.AWS_KMS_KEY_ID,
  };

  const decryptedData = await kmsClient.decrypt(params);
  const { Plaintext } = decryptedData;
  return Buffer.from(Plaintext).toString();
};

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`The server is running on port ${port}...`);
})