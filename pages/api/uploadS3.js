
import S3 from 'aws-sdk/clients/s3';
import {withIronSession} from 'next-iron-session';

// create new s3 instance
const s3 = new S3({
    region: "us-east-1",
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESSKEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRETACCESSKEY, 
    signatureVersion: "v4",
})

async function handler(req, res) {
   
    if (req.method === 'POST') {

        try{
            console.log("authenticate body getUsers:", req)
            const user = await req.session.get('user'); // the user specific cookie is sent with the request. This how they look it up. 
    
            console.log('authenticate: ', user)
            if(!user || !user.uid || !user.accessToken){
                console.log("session not valid")
                res.json({status: 401})
    
            }else{
                //valid authentication
                console.log("session valid")


                //Insert into S3 bucket and retrieve urls. Checks if file is uploaded. Use same links for each user?
                try {
                    console.log("bodyxyz", req.body)
                    let { profilePic1Name, profilePic1Type, profilePic2Name, profilePic2Type, profilePic3Name, profilePic3Type  } = req.body;
                    
                    const timestamp = Date.now().toString();
                    const S3Key = user.uid + `/${timestamp}profilePic1`
                        
                    const profile1Params = {
                    Bucket: process.env.NEXT_PUBLIC_S3_Name,
                    Key: S3Key,
                    Expires: 600,
                    ContentType: profilePic1Type,
                    };
                    const url1 = await s3.getSignedUrlPromise("putObject", profile1Params);
                    // const profile2Params = {
                    //     Bucket: process.env.NEXT_PUBLIC_S3_Name,
                    //     Key: profilePic2.name,
                    //     Expires: 600,
                    //     ContentType: profilePic2.type,
                    // };
                    // const profile3Params = {
                    //     Bucket: process.env.NEXT_PUBLIC_S3_Name,
                    //     Key: profilePic3.name,
                    //     Expires: 600,
                    //     ContentType: profilePic3.type,
                    // };
                
                    // const url2 = await s3.getSignedUrlPromise("putObject", profile2Params);
                    // const url3 = await s3.getSignedUrlPromise("putObject", profile3Params);

                    res.status(200).json({ url1, S3Key: S3Key });
                
                } catch (err) {
                    console.log(err);
                    res.status(400).json({ message: err });
                }

                // try {
                //   let { name, type } = req.body;
            
                //   const fileParams = {
                //     Bucket: process.env.BUCKET_NAME,
                //     Key: name,
                //     Expires: 600,
                //     ContentType: type,
                //   };
            
                //   const url = await s3.getSignedUrlPromise("putObject", fileParams);
            
                //   res.status(200).json({ url });
                // } catch (err) {
                //   console.log(err);
                //   res.status(400).json({ message: err });
                // }

            }
        }catch (err){
            console.log(err)
            if (err.message === "Incorrect number of sealed components") {
            // handle "Incorrect number of sealed components" error
            req.session.destroy();
            console.error("Invalid session cookie: ", err);
            res.status(401).json({ message: "Invalid session cookie" });
            } else {
            // handle other errors
            console.error("Unexpected error: ", err);
            res.status(500).json({ message: "Unexpected error occurred" });
            }
        }
    }else{
        return res.status(405).json({ message: "Method not allowed" });
    }
  
}

export default withIronSession(handler, {
    password: process.env.SESSION_PASSWORD,
    cookieName: 'Proximity-Cookie',
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production' ? true : false,
      httpOnly: true,
      maxAge: 86400 // session expires after 24 hours
    },
  });


//Export config to set size limit of files
export const config = {
    api: {
        bodyParser: {
            sizeLimit: "8mb"
        }
    }
}