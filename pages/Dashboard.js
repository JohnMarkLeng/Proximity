import React, { Component } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { app } from '../firebaseConfig'
import {useEffect} from 'react';
import Router from 'next/router';
import { getAuth, signOut } from "firebase/auth";
import logo from '../public/proximityLogo.png';
import UserProfile from '@/pages/components/UserProfile'
import ReactDOM from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleRight, faAngleLeft, faBars, faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';


class Dashboard extends Component {

    

    constructor(props) {
        
        super(props);

        this.state = {
            users: [],
            user: [],
            count: 0,
            currentIndex: 0,
            sideMenu: false, 
            homeBlur: false,

        };

        this.myNavRef = React.createRef();
    }

    

    // handleClick = () => {
    //     this.setState({ count: this.state.count + 1 });
    // };

    menuClick = () => {
        this.setState({sideMenu: !this.state.sideMenu})
        this.setState({homeBlur: !this.state.homeBlur})
        // this.state.sideMenu = !this.state.sideMenu
        // this.state.homeBlur = !this.state.homeBlur
        // let element = document.getElementById('myNav')
        let element = this.myNavRef.current;
        // let home = document.getElementById('Homepage')
        if (element ) {
            ReactDOM.findDOMNode(element).style.width = this.state.sideMenu? '100%' : '0%'
            document.body.style.backgroundColor = this.state.homeBlur? 'rgba(100,200,10,1)' : ''
        }
        // ReactDOM.findDOMNode(home).style.backgroundColor = this.state.homeBlur? 'rgba(0,0,0,0.4)' : ''
    }

    leftClick = () => {
        this.setState({currentIndex: 1})
    }
    rightClick = () => {
        this.setState({currentIndex: 0})
    }


    getUsers = async () => {

        let res = await fetch("http://localhost:3000/api/getUsers", {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
            
            },
        });
        //   console.log(res)
        let posts = await res.json();
        console.log("Dashboard GetUsers Response", posts.data)
        
        // handle response data (can have error returns and redirect and display msgs)
        if(posts.status == 200){
            this.setState({users: posts.data});
        }else{
            Router.push('/register')
        }
    }

    componentDidMount() {
        // let token = localStorage.getItem('Token')
        // let uid = localStorage.getItem('uid')
        // this.setState({ AuthToken: token});
        // this.setState({ uid: uid});
        // if(!token){
        //     Router.push('/register')
        // }
        this.getUsers()
    }



    //Move to its own component in components. remember to delete the proximity cookie. 
    logoutButton = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // document.cookie = "Proximity-Cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            Router.push('/register')
        }).catch((error) => {
            console.log('error:', error)
        })

    }


  render() {
    return (
        <>
            <Head>
                <title>Proximity</title>
                <meta name="description" content="Make friends with the people in your proximity!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div id="myNav" className={styles.menuOverlay} ref={this.myNavRef}>
                <a href="javascript:void(0)" className={styles.closebtn} onClick={this.menuClick}>&times;</a>
                <div className={styles.menuOverlayContent}>
                    <a href="#">Profile</a>
                    <a href="#">Location</a>
                    <a href="#">Friends</a>
                    {/* <a href="#">Contact</a> */}
                </div>
    
            </div>
            <div className={styles.navbarContainer}>

                <button 
                className={styles.button}
                onClick={this.menuClick}
                >
                <FontAwesomeIcon icon={faBars} style={{fontSize: 40, color: "#FFF"}} className={styles.menuButton} />
                </button>

                <Image src={logo} width={350} className={styles.logoDashboard} alt="Proximity Logo" />


                <button
                className={styles.button}
                onClick={this.logoutButton}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} style={{fontSize: 40, color: "#FFF"}} className={styles.logoutButton} />
                </button>
            </div>
        



            {/* {this.state.users.map(user => (
                    <UserProfile key={user.googleUid} userInfo={user} > </UserProfile>
            ))} */}


            <div className={styles.buttonAndProfileContainer}>
                <button onClick={this.leftClick} className={styles.button} >
                    <FontAwesomeIcon icon={faAngleLeft} style={{fontSize: 50, color: "#FFF"}} className={styles.buttonIcons} />
                </button>
            
                <UserProfile userInfo={this.state.users} index={this.state.currentIndex} className={styles.card} > </UserProfile>
                
                <button onClick={this.rightClick} className={styles.button} >
                    <FontAwesomeIcon icon={faAngleRight} style={{fontSize: 50, color: "#FFF"}} className={styles.buttonIcons} />
                </button>

            </div>
        
        
    
        

            
        </>
    );
  }
}

export default Dashboard;