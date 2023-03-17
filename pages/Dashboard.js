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
import UserProfile from '@/pages/components/userProfile'
import SelfProfile from './components/selfProfile';
import ReactDOM from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleRight, faAngleLeft, faBars, faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';

//CHange get users to also get the current user? nah make a diff endpoint

class Dashboard extends Component {

    

    constructor(props) {
        
        super(props);

        this.state = {
            users: [],
            currentIndex: 0,
            self: [],
            selfIndex: 0,
            sideMenu: false, 
            homeBlur: false,
            viewUserProfiles: true,
            viewProfile: false,
            editProfile: false,

        };

        this.myNavRef = React.createRef();
    }

    

    // handleClick = () => {
    //     this.setState({ count: this.state.count + 1 });
    // };

    revealMenu = () => {
        let element = this.myNavRef.current;
        console.log(element, this.state.sideMenu)
        // let home = document.getElementById('Homepage')
        if (element ) {
            element.style.width = this.state.sideMenu? '100%' : '0%'
            document.body.style.backgroundColor = this.state.homeBlur? 'rgba(100,200,10,1)' : ''
        }
        // ReactDOM.findDOMNode(home).style.backgroundColor = this.state.homeBlur? 'rgba(0,0,0,0.4)' : ''
    }

    menuClick = () => {
        console.log('menu Clicked')
        this.setState({
            sideMenu: !this.state.sideMenu,
            homeBlur: !this.state.homeBlur
        },
        this.revealMenu
        
        )
        // this.state.sideMenu = !this.state.sideMenu
        // this.state.homeBlur = !this.state.homeBlur
        // let element = document.getElementById('myNav')
    }

    leftClick = () => {
        // this.setState({currentIndex: 1})
    }
    rightClick = () => {
        this.setState({currentIndex: 0})
    }

    viewUsersClick = () => {
        console.log("clicked view users")
        this.setState({
            viewUserProfiles: true,
            viewProfile: false, 
            editProfile: false 
        })
    }

    viewProfileClick = () => {
        this.menuClick()
        this.setState({
            viewUserProfiles: false,
            viewProfile: true, 
            editProfile: false 
        })
        console.log("dashboard: the current user's array: ", this.state.self)
    }

    editProfileClick = () => {
        this.setState({
            viewUserProfiles: false,
            viewProfile: false, 
            editProfile: true 
        })
    }


    getUsers = async () => {

        let res = await fetch("http://localhost:3000/api/getUsers", { // http://localhost:3000/api/getUsers 'https://proximityapp.vercel.app/api/getUsers'
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
    getSelf = async () => {

        let res = await fetch("http://localhost:3000/api/getSelf", { // http://localhost:3000/api/getSelf 'https://proximityapp.vercel.app/api/getSelf'
        method: "GET",
        headers: {
        "Content-Type": "application/json",
            
            },
        });
        //   console.log(res)
        let posts = await res.json();
        
        // handle response data (can have error returns and redirect and display msgs)
        if(posts.status == 200){
            this.setState({self: posts.data});
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
        this.getSelf()
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
                    <a onClick={this.viewProfileClick}>Profile</a>
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
        


            <div className={styles.buttonAndProfileContainer}>
                {this.state.users && this.state.viewUserProfiles && (
                <button onClick={this.leftClick} className={styles.button} >
                    <FontAwesomeIcon icon={faAngleLeft} style={{fontSize: 50, color: "#FFF"}} className={styles.buttonIcons} />
                </button>
                )}
                
                {/* Users */}
                {this.state.users && this.state.viewUserProfiles && (
                < UserProfile userInfo={this.state.users} index={this.state.currentIndex} className={styles.card} > </UserProfile>
                )}

                {/* View Profile */}
                {this.state.self && this.state.viewProfile && (
                < SelfProfile viewUsersClick={this.viewUsersClick} userInfo={this.state.self} index={this.state.selfIndex} className={styles.card} > </SelfProfile>
                )}

                {/* { !this.state.viewUserProfiles && this.state.viewProfile && (
                
                )}  */}

                
                {this.state.users && this.state.viewUserProfiles && (
                 <button onClick={this.rightClick} className={styles.button} >
                    <FontAwesomeIcon icon={faAngleRight} style={{fontSize: 50, color: "#FFF"}} className={styles.buttonIcons} />
                 </button>
                )}
               

            </div>
        
        
    
        

            
        </>
    );
  }
}

export default Dashboard;