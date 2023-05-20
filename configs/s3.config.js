import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.AWS_REGION
});

/**
 * creating the S3 service object
 */
export const S3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {
    Bucket: process.env.AWS_S3_BUCKET_NAME
  }
});
