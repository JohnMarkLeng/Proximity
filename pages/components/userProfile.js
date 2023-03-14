import React from 'react';
import styles from '../../styles/userProfile.module.css'
import {useState, useEffect} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import { faInstagram, } from '@fortawesome/free-brands-svg-icons';




export default function UserProfile(props) {

    // const [currentIndex, setCurrentIndex] = useState(0);
    
    if (props && props.userInfo){
        const currentUser = props.userInfo[props.index];
        console.log('userprofile props', props , 'Current User:', currentUser)
    


        // useEffect(() => {
        //     setCurrentIndex(props.index);
        // }, [props.index]);


        return (
            <>
            {currentUser && (
            
                <div className={styles.profileCard} >

                    {/* Filter, Name, Button */}
                    <div className={styles.topContainer}>
                        <button className={styles.topContainerButtons}
                        // onClick={this.menuClick}
                        >
                            {/* <FontAwesomeIcon icon={faBars} style={{fontSize: 40, color: "#FFF"}} className={styles.getUserButton} /> */}
                            <h3>Filter</h3>
                        </button>

                        <h2>
                            {currentUser.fName}
                        </h2>
                        
                        <button className={styles.topContainerButtons}>
                            <h3>Flag</h3>
                        </button>

                    </div>

                    {/* Profile image */}
                    <div className={styles.CardContainer}>
                        <div className={styles.profileImageCard}>

                        </div>

                    </div>

                    {/* Likes and friends */}
                    <div className={styles.likesAndFriends}>
                        <div>
                            <button 
                            className={styles.likeAndFriendsButtons}
                            // onClick={}
                            >
                                <h3><FontAwesomeIcon icon={faHeart} style={{ color: "#FFF"}}/></h3>
                            </button>

                            <button 
                            className={styles.likeAndFriendsButtons} 
                            style={{marginLeft:'10px',}}
                            // onClick={}
                            >
                                <h3><FontAwesomeIcon icon={faUserPlus} style={{ color: "#FFF"}}/> </h3>
                            </button>
                        </div>
                        <div>
                            <h3>{currentUser.likes} likes {currentUser.friends} friends </h3>
                        </div>
                    </div>

                    {/* Social Media Scroll (Make infinite) (this feature took forever) */}
                    <div className={styles.socialMediaContainer}>
                    
                        <div className={styles.socialMediaCard}>
                            <FontAwesomeIcon icon={faInstagram} style={{fontSize: 35, color: "#FFF"}} className={styles.socialMediaIcons}/>
                        </div>
                        <div className={styles.socialMediaCard}>
                            <FontAwesomeIcon icon={faInstagram} style={{fontSize: 35, color: "#FFF"}} className={styles.socialMediaIcons}/> 
                        </div>
                        <div className={styles.socialMediaCard}>
                            <FontAwesomeIcon icon={faInstagram} style={{fontSize: 35, color: "#FFF"}} className={styles.socialMediaIcons}/> 
                        </div>
                        <div className={styles.socialMediaCard}>
                            <FontAwesomeIcon icon={faInstagram} style={{fontSize: 35, color: "#FFF"}} className={styles.socialMediaIcons}/> 
                        </div>
                        <div className={styles.socialMediaCard}>
                            <FontAwesomeIcon icon={faInstagram} style={{fontSize: 35, color: "#FFF"}} className={styles.socialMediaIcons}/> 
                        </div>
                        <div className={styles.socialMediaCard}>
                            <FontAwesomeIcon icon={faInstagram} style={{fontSize: 35, color: "#FFF"}} className={styles.socialMediaIcons}/> 
                        </div>
                        <div className={styles.socialMediaCard}>
                            <FontAwesomeIcon icon={faInstagram} style={{fontSize: 35, color: "#FFF"}} className={styles.socialMediaIcons}/> 
                        </div>
                    
                    </div>

                    {/* Bio: Remember the Halo effect!! Play that into peoples best interests */}
                    <div className={styles.CardContainer}>   
                        <div className={styles.bioCard}>
                            <div className={styles.titles} >
                                <h3>Bio</h3>
                            </div>
                            <div className={styles.bioTextCard}>
                            
                            </div>
                        </div>

                    </div>

                    {/* Hobbies */}
                    <div className={styles.CardContainer}>   
                        <div className={styles.bioCard}>
                            <div className={styles.titles} >
                                <h3>Bio</h3>
                            </div>
                            <div className={styles.bioTextCard}>
                            
                            </div>
                        </div>
                        
                    </div>

                    {/* Goals */}
                    <div className={styles.CardContainer}>   
                        <div className={styles.bioCard}>
                            <div className={styles.titles} >
                                <h3>Bio</h3>
                            </div>
                            <div className={styles.bioTextCard}>
                            
                            </div>
                        </div>
                        
                    </div>

                    {/* I'm Down to...  */}
                    <div className={styles.CardContainer}>   
                        <div className={styles.bioCard}>
                            <div className={styles.titles} >
                                <h3>Bio</h3>
                            </div>
                            <div className={styles.bioTextCard}>
                            
                            </div>
                        </div>
                        
                    </div>

                    {/* I Would like to learn to ...  */}
                    <div className={styles.CardContainer}>   
                        <div className={styles.bioCard}>
                            <div className={styles.titles} >
                                <h3>Bio</h3>
                            </div>
                            <div className={styles.bioTextCard}>
                            
                            </div>
                        </div>
                        
                    </div>
                    
                    {/* Profile image */}
                    <div className={styles.CardContainer}>
                        <div className={styles.profileImageCard}>

                        </div>

                    </div>
                    {/* Profile image */}
                    <div className={styles.CardContainer}>
                        <div className={styles.profileImageCard}>

                        </div>

                    </div>
                    {/* Profile image */}
                    <div className={styles.CardContainer}>
                        <div className={styles.profileImageCard}>

                        </div>

                    </div>
                    {/* Profile image */}
                    <div className={styles.CardContainer}>
                        <div className={styles.profileImageCard}>

                        </div>

                    </div>
                
                
                </div>
            )}
            </>
        )
    }

  
}
