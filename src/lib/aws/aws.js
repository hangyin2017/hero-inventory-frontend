import AWS from 'aws-sdk';

const bucketName = 'hero-inventory-item-image';

AWS.config.region = 'ap-southeast-2';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-southeast-2:2ab03726-216c-46bd-b263-5cc2e8ab7d63',
});

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: bucketName}
});

const baseUrl = `https://${bucketName}.s3.${AWS.config.region}.amazonaws.com/`;

export default s3;
export { bucketName, baseUrl };