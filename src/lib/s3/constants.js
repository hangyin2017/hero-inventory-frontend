const BUCKET_NAME = 'hero-inventory-item-image';

const REGION = 'ap-southeast-2';
const BASE_URL = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com`;

const IDENTITY_POOL_ID = 'ap-southeast-2:2ab03726-216c-46bd-b263-5cc2e8ab7d63';

export { BUCKET_NAME, REGION, BASE_URL, IDENTITY_POOL_ID };
