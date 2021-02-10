import AWS from 'aws-sdk';
import { BUCKET_NAME, REGION, BASE_URL, IDENTITY_POOL_ID } from './constants';

AWS.config.region = REGION;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IDENTITY_POOL_ID,
});

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: BUCKET_NAME}
});

const upload = (imageKey, file) => {
  return new AWS.S3.ManagedUpload({
    params: {
      Bucket: BUCKET_NAME,
      Key: imageKey,
      Body: file,
      ACL: 'public-read',
    }
  }).promise();
};

const s3Lib = {
  s3,
  upload,
}

export default s3Lib;
// export { upload };