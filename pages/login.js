import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

export default function Login(){
    return ( 
        <>
            <Head>
                <title>Proximity</title>
                <meta name="description" content="Make friends with the people in your proximity!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1>Login</h1>
            </main>
         </>
    )
 }