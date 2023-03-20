// getUsers.js Will need to repurpose to get users. Might need to get rid of their switch statement with req.method
//I'll need to work on parameters for filtering and how to use them with mongo and interface it. 

//Want to implement visibility check: if there isn't enough data, set visibility to false/true. 

import {withIronSession} from 'next-iron-session';
import clientPromise from "../../lib/mongodb";



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
                const client = await clientPromise;
                const db = client.db("ProximityDatabase");

                try{
                    

                    console.log("editProfile new user data:", req.body)
                    const data = req.body

                    const filter = { googleUid: user.uid };
                    const updateDoc = { $set: {
                        fName: data.fName.trim(), 
                        profilePic1: 'https://proximityprofileimages.s3.amazonaws.com/' + data.profilePic1,
                        instagram: data.instagram.trim(), 
                        linkedin: data.linkedin.trim(), 
                        snapchat: data.snapchat.trim(),
                        twitter: data.twitter.trim(),
                        youtube: data.youtube.trim(),
                        tiktok: data.tiktok.trim(),
                        bio: data.Bio.trim(),
                        hobby1: data.hobby1.trim(),
                        hobby1Desc: data.hobby1Desc.trim(),
                        hobby2: data.hobby2.trim(),
                        hobby2Desc: data.hobby2Desc.trim(),
                        hobby3: data.hobby3.trim(), 
                        hobby3Desc: data.hobby3Desc.trim(),
                        hobby4: data.hobby4.trim(),
                        hobby4Desc: data.hobby4Desc.trim(),
                        hobby5: data.hobby5.trim(),
                        hobby5Desc: data.hobby5Desc.trim(),
                        Goal1: data.Goal1.trim(),
                        Goal2: data.Goal2.trim(),
                        Goal3: data.Goal3.trim(),
                        DownTo1: data.DownTo1.trim(),
                        DownTo2: data.DownTo2.trim(),
                        DownTo3: data.DownTo3.trim(),
                        DownTo4: data.DownTo4.trim(),
                        DownTo5: data.DownTo5.trim(),

                    } };

                    const result = await db.collection("UserProfiles").updateOne(filter, updateDoc);
                    // console.log(profiles)
                    res.json({ status: 200, data: result });
                    console.log(result)
                } catch (error){
                    console.log("error in updating your profile")
                    res.json({status: 401})
                    console.log(error)
                }
    
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
