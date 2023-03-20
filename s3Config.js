import { NextApiRequest, NextApiResponse} from 'next';
import S3 from 'aws-sdk/clients/s3';


// create new s3 instance
const s3 = new S3({
    region: "us-east-1",
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESSKEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRETACCESSKEY, 
    signatureVersion: "v4",
})

//Export config to set size limit of files
export const config = {
    api: {
        bodyParser: {
            sizeLimit: "8mb"
        }
    }
}