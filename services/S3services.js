const AWS = require('aws-sdk');

exports.uploadToS3 =async (data,filename) => {
    try{
        const BUCKET_NAME = process.env.BUCKET_NAME;
        const IAM_USER_KEY = process.env.IAM_USER_KEY;
        const IAM_USER_SECRET = process.env.IAM_USER_SECRET;
    
        const s3bucket = new AWS.S3({
            accessKeyId : IAM_USER_KEY,
            secretAccessKey : IAM_USER_SECRET,
            Bucket : BUCKET_NAME
        });
    
        const params = {
            Bucket:BUCKET_NAME,
            Key:filename,
            Body: data,
            ACL: 'public-read',
            ContentType: 'text/plain'
        }
        const response = await s3bucket.upload(params).promise();
        console.log('File uploaded successfully at', response.Location);
        return response;
    }catch(err){
        
        console.log('Upload error', err);
        alert(err)
        throw err;
    }
}
