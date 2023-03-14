// For Potential Server Side Session Storage.

// Yes, session.get function provided by next-iron-session requires the session cookie that is stored on the client-side in order to retrieve the session object.
// When a user logs in or creates a session, the session data is stored on the server-side and a session cookie is created and sent to the client-side. This session cookie contains a unique identifier that allows the server to retrieve the corresponding session data.
// When the user sends a request to the server, the session cookie is automatically included in the request headers. session.get function uses this session cookie to decrypt the session data and retrieve the session object associated with that user.
// So, to use session.get, you don't need to pass the session cookie explicitly as a parameter to the function. session.get will automatically retrieve the session cookie from the client-side request headers and use it to retrieve the session object.

//The session.get function provided by next-iron-session should be used on the server-side. It is used to retrieve the session object from the encrypted session cookie that is sent with the client request.
// When using withIronSession in Next.js, the session.get function provided by next-iron-session package will automatically decrypt and decode the session cookie for you and return the session object as a JSON object.
// You can then use this session object to access the user's session data and make authorization decisions. For example, you could check if the user is authenticated by checking for the existence of a particular property in the session object, or retrieve specific data about the user that is stored in the session.

//So, you only need to use the withIronSession function with the options you provided (password, cookieName, and cookieOptions) if you want to modify the session middleware settings. If you already have a session cookie and are not making any changes to the session middleware settings, you can skip using withIronSession.


//For Server Side Auth: committed to it. 
import clientPromise from "../../lib/mongodb";
import {withIronSession} from 'next-iron-session';


//Google firebase authentication and store server side session storage for safety. 

async function handler(req, res) {


    //WORK HERE
    // Do your authentication logic here, and get the user's information
    // If the user doesn't exist or the password is incorrect, return an error
    // else the user is authenticated, create a session with next-iron-session
    //TODO: 
    //get uid from google. check if this user exists in user profiles in mongodb:
    //     * if it exists:
    //         continue to authenticate 
    //     * else: 
    //         create a new document with uid. 
    // send to dashboard. 

    try{

        console.log("googleLogin.js:", req.body);
        const uid = req.body.uid
        const email = req.body.email
        const accessToken = req.body.stsTokenManager.accessToken
        //NEED TO IMPLEMENT FEATURE TO VERIFY THE AUTHENTICITY OF THE ACCESS TOKEN! 
        // Otherwise anyone can access this endpoint and get a session. Throw error. or error msg. 
        //Also Fix login errors, autehntication closing window error, and fix error message bc its ugly
        

        const client = await clientPromise;
        const db = client.db("ProximityDatabase");
        const userProfilesCollection = client.db('ProximityDatabase').collection('UserProfiles');

        //Check if user exists in DB. Respond accordingly
        const profile = await db.collection("UserProfiles").find({googleUid: uid}).toArray();
        console.log("mongodbResults: ", profile)

        if(profile.length === 0){ 
            //create account!
            const newUser = { googleUid: uid, visible: false, fName: '', lName:'', email: email,  profilePic:'', likes: 0, friends: 0, instagram:'', linkedin:'',
            snapchat:'', youtube:'', twitter:'', tiktok:'', bio:'', education:'', studying:'', hobby1:'', hobby1Desc:'', hobby2:'', hobby2Desc:'', hobby3:'',
            hobby3Desc:'', hobby4:'', hobby4Desc:'', hobby5:'', hobby5Desc:'', DownTo1: '', DownTo2: '', DownTo3: '', DownTo4: '', DownTo5: '', Learn1: '', Learn2: '', Learn3: '',
            Goal1: '', Goal2: '', Goal3: '', dateJoined: new Date(), lastOnline: new Date(), banned: false, geoJsonLocation: { type: 'Point', coordinates: [ 0, 0 ] }, };

            const result = await userProfilesCollection.insertOne(newUser);

        }else if(profile.length > 1){
            //account is doubled? Notify me about this issue. 
            console.log("-----------???, multiple of the same uid?? I indexed the uid so this shoudln't happen------------")
        }else if(profile.length === 1){
            //account exists, login. 

        }

        req.session.set('user', { uid: uid, accessToken: accessToken });
        await req.session.save();

        res.json({ status: 200 });

    } catch (error){
        res.json({ status: 401 });
        console.log("error in logging in User")
        console.log(error)
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