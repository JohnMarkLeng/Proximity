// Local storage NOT Secure!! Will need to update. I'll probably want to move this all to the backed api and keep the 
// auth data in the backend. 


import Head from 'next/head';
import styles from '@/styles/register.module.css';
import {app} from '../firebaseConfig';
import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import Cookies from 'js-cookie';
import Image from 'next/image';
import logo from '../public/proximityLogo.png';
import googleLogo from '../public/GoogleIcon.png';





export default function Register() {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const router = useRouter();
    const [loginError, setLoginError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const signUp = () => {
    //     createUserWithEmailAndPassword(auth, email, password)
    //     .then((response) => {
    //         console.log(response.user)
    //         localStorage.setItem('Token', response.user.accessToken)
    //         router.push('/home')
    //     })
    //     .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         console.log(errorCode)
    //         console.log(errorMessage)
    //     })
    // }

    const googleLoginApi = async (userData) => {

        const response = await fetch('https://proximityapp.vercel.app/api/googleLogin', {  //'http://localhost:3000/api/googleLogin' "https://proximityapp.vercel.app/api/googleLogin"
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify(userData),
        });
        const responseData = await response.json();
        console.log(responseData)
        if (responseData.status == 200){
            router.push('/Dashboard')
        }else{
            setLoginError(true)
        }
    
        // handle response data (can have error returns and redirect and display msgs)
    }

    const signUpWithGoogle = () => {
        try{
            signInWithPopup(auth, googleProvider )
            .then((response) => {

                googleLoginApi(response.user)

            })

        }catch
        {(error) => 
            {
                if (error.code === 'auth/popup-closed-by-user') {
                    // Handle popup closed error
                    console.log('User closed the popup window');
                  } else {
                    // Handle other Firebase errors
                    console.error(error);
                  }
            }
        }   
    }


    // Get the session cookie value
    //  const sessionCookie = Cookies.get('Proximity-Cookie');

    //  if (sessionCookie) {
    //  // If the session cookie exists, do something with it
    //  console.log(`Session cookie value: ${sessionCookie}`);
    //  } else {
    //  // If the session cookie doesn't exist, handle the error
    //  console.error('Session cookie not found');
    //  }




    // useEffect(() => {
    //     let token = localStorage.getItem('Token')

    //     if(token){
    //         router.push('/Dashboard')
    //     }
    // }, []) 


    return ( 
        <>
            <Head>
                <title>Proximity</title>
                <meta name="description" content="Make friends with the people in your proximity!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>

                <Image src={logo} width={350} className='logo' alt="Proximity Logo" />

                <p> {loginError ? 'Error in Login' : null} </p>


                <div className={styles.googleLoginDiv}>  
                  <button
                    className={styles.loginGoogleButton}
                    onClick={signUpWithGoogle}
                    >
                        
                        <Image src={googleLogo} width={55} alt="Proximity Logo" />
                    </button>
                </div>
    


                {/* <input 
                placeholder='Email' 
                className={styles.inputBox}
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                type='email'
                />
                <input 
                placeholder='Password' 
                className={styles.inputBox}
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                type='password'
                />
                <button 
                className={styles.button}
                onClick={signUp}
                >Sign Up
                </button>
                <hr/> */}

                
            </main>
        </>
    )
 }