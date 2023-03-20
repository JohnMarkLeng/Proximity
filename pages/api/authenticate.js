//TO authenticate, I'm not using the auth token and refresh from firebase. I'll be using my server side session storage.
//I sent cookies to myself with next-iron-session and when that expires, it won't produce the uid and auth that I'm looking for.
//Authentication lasts a day, beyond that youll be redirected to login again

import {withIronSession} from 'next-iron-session';


async function handler(req, res) {

    try{
      // console.log("authenticate body:", req)
      const user = await req.session.get('user'); // the user specific cookie is sent with the request. This how they look it up. 

      console.log('authenticate: ', user)
      if(!user || !user.uid || !user.accessToken){
          console.log("session not valid")
          res.json({status: 401})

      }else{
          console.log("session valid")
          res.json({status: 200})

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


  //If you want to modify the session data and update the session cookie, 
  // you can do so by calling the req.session.set method to set the updated session data, 
  // and then calling the req.session.save method to save the updated session data to the server
  //  and update the session cookie.
  //This code below doesn't set the cookie. 

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





  //Old Api Call from client to Authenticate
  // const response = await fetch('http://localhost:3000/api/authenticate', {
  //   method: 'POST',
  //   headers: {
  //     // 'Content-Type': 'application/json',
  //     // 'Authorization': `Bearer ${authToken}`,
  //   },
  // //   body: (),
  // });
  // const responseData = await response.json();
  // console.log("From authentication: " , responseData)
  // // handle response data (can have error returns and redirect and display msgs)
  // if(responseData.status == 200){
      
  // }else if (responseData.status == 401){
  //     Router.push('/register')
  // }