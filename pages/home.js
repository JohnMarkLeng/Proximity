// https://www.youtube.com/watch?v=2GIMsmDvXls (firebase Auth)
// https://www.geeksforgeeks.org/how-to-log-out-user-from-app-using-reactjs/ logout w/ localstorage
//https://aaronfrancis.com/2021/efficient-distance-querying-in-my-sql SQL implementation for gps data
//https://medium.com/@ibraheemabukaff/find-nearest-locations-with-mongodb-how-to-2d6d84d0266f mongoDB GeoJson!
// https://www.youtube.com/watch?v=t3UjWbh7mqI MongoDB and React/NextJS


import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { app } from '../firebaseConfig'
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import { getAuth, signOut } from "firebase/auth";
// import {mongoClient} from 'mongodb'; 


export default function Home() {
  

  let router = useRouter()
  useEffect(() => {
    let token = localStorage.getItem('Token')

    if(!token){
        router.push('/register')
    }
  }, []) 

  const logoutButton = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.removeItem('Token');
      router.push('/register')
    }).catch((error) => {
      console.log('error:', error)
    })

  }


  return (
    <>
      <Head>
        <title>Proximity</title>
        <meta name="description" content="Make friends with the people in your proximity!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Home</h1>
        <button
        className={styles.button}
        onClick={logoutButton}>
          Logout
        </button>
      </main>
    </>
  )
}
