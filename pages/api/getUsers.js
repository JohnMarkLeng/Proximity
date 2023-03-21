// getUsers.js Will need to repurpose to get users. Might need to get rid of their switch statement with req.method
//I'll need to work on parameters for filtering and how to use them with mongo and interface it. 


import {withIronSession} from 'next-iron-session';
import clientPromise from "../../lib/mongodb";

async function handler(req, res) {



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
                const profiles = await db.collection("UserProfiles").find({ visible: { $ne: false } }).toArray();
                // console.log(profiles)
                res.json({ status: 200, data: profiles });
            } catch (error){
                console.log("error in getting User Profiles")
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