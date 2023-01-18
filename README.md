# nodejs-AWS-KMS
AWS-KMS implementation using nodejs.

# Encryption
A function was created to encrypt the text.

# Dcryption
A function was created to dcrypt the text.

While using the decryption method it needs the encrypted data inside in Buffer format as a base64 string. ==> Buffer.from(enter your encrypted data, 'base64')

# SETUP for .env file
Add ==> AWS_REGION

Add ==> AWS_KMS_ACCESS_KEY_ID

Add ==> AWS_KMS_SECRET_KEY

Add ==> AWS_KMS_KEY_ID