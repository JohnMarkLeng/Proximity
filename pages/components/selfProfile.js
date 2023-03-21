import React from 'react';
import styles from '../../styles/userProfile.module.css'
import {useState, useEffect} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faLinkedin, faSnapchat, faTwitter, faYoutube, faTiktok} from '@fortawesome/free-brands-svg-icons';



export default function SelfProfile(props) {

    const [isCopied, setIsCopied] = useState(false);
    const [errorWithCopy, setErrorWithCopy] = useState(false);
    
    function socialMediaPopup(username){
        console.log("value: ",username)
        navigator.clipboard.writeText(username)
        .then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        })
        .catch((err) => { 
            console.error('Failed to copy text: ', err)
            setErrorWithCopy(true);
            setTimeout(() => setErrorWithCopy(false), 3000);
        });
    }

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
                            <div className={styles.topContainerButtonsCover} onClick={() => props.viewUsersClick() }> <h3>Cancel</h3> </div>
                        </button>

                        <h2>
                            {currentUser.fName}
                        </h2>
                        
                        
                        <button className={styles.topContainerButtons}>
                            <div className={styles.topContainerButtonsCover} onClick={() => props.editProfileClick() }> <h3>Edit</h3> </div>
                        </button>

                    </div>

                    {/* Profile image */}
                    <div className={styles.CardContainer}>
                        <div className={styles.profileImageCard}>
                            <img className={styles.profileImage} src={currentUser.profilePic1} alt='User Profile Image' />
                        </div>

                    </div>

                    {/* Likes and friends */}
                    {/* <div className={styles.likesAndFriends}>
                        <div>
                            <button 
                            className={styles.likeAndFriendsButtons}
                            // onClick={}
                            >
                                <h3><FontAwesomeIcon icon={faHeart} style={{ fontSize: 20, color: "#FFF"}}/></h3>
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
                            <h3>
                            {currentUser.likes} likes
                            {currentUser.friends} friends 
                             </h3>
                        </div>
                    </div> */}

                    {/* Social Media Scroll (Make infinite) (this feature took forever) */}
                    <div className={styles.socialMediaContainer}>
                        
                        {currentUser.instagram.trim() && (
                                    <div className={styles.socialMediaCard}>
                                        <button value={currentUser.instagram} onClick={(event) => {socialMediaPopup(event.currentTarget.value)}} className={styles.socialMediaButton}>
                                        <FontAwesomeIcon icon={faInstagram} style={{fontSize: 35, color: "#FFF"}} className={styles.socialMediaIcons}/>
                                        </button>
                                    </div>
                        )}
                        {currentUser.linkedin.trim() && (
                                    <div className={styles.socialMediaCard}>
                                        <button value={currentUser.linkedin} onClick={(event) => {socialMediaPopup(event.currentTarget.value)}} className={styles.socialMediaButton}>
                                        <FontAwesomeIcon icon={faLinkedin} style={{fontSize: 35, color: "#FFF"}} className={styles.socialMediaIcons}/> 
                                        </button>
                                    </div>
                        )}
                        {currentUser.snapchat.trim() && (
                                    <div className={styles.socialMediaCard}>
                                        <button value={currentUser.snapchat} onClick={(event) => {socialMediaPopup(event.currentTarget.value)}} className={styles.socialMediaButton}>
                                        <FontAwesomeIcon icon={faSnapchat} style={{fontSize: 35, color: "#FFF"}} className={styles.socialMediaIcons}/> 
                                        </button>
                                    </div>
                        )}
                        {currentUser.twitter.trim() && (
                                    <div className={styles.socialMediaCard}>
                                        <button value={currentUser.twitter} onClick={(event) => {socialMediaPopup(event.currentTarget.value)}} className={styles.socialMediaButton}>
                                        <FontAwesomeIcon icon={faTwitter} style={{fontSize: 35, color: "#FFF"}} className={styles.socialMediaIcons}/> 
                                        </button>
                                    </div>
                        )}
                        {currentUser.youtube.trim() && (
                                    <div className={styles.socialMediaCard}>
                                        <button value={currentUser.youtube} onClick={(event) => {socialMediaPopup(event.currentTarget.value)}} className={styles.socialMediaButton}>
                                        <FontAwesomeIcon icon={faYoutube} style={{fontSize: 35, color: "#FFF"}} className={styles.socialMediaIcons}/> 
                                        </button>
                                    </div>
                        )}
                        {currentUser.tiktok.trim() && (
                                    <div className={styles.socialMediaCard}>
                                        <button value={currentUser.tiktok} onClick={(event) => {socialMediaPopup(event.currentTarget.value)}} className={styles.socialMediaButton}>
                                        <FontAwesomeIcon icon={faTiktok} style={{fontSize: 35, color: "#FFF"}} className={styles.socialMediaIcons}/> 
                                        </button>
                                    </div>
                        )}
     
                    
                    </div>

                    {/* Bio: Remember the Halo effect!! Play that into peoples best interests */}
                    <div className={styles.CardContainer}>   
                        <div className={styles.bioCard}>
                            <div className={styles.titles} >
                                <h3>Bio</h3>
                            </div>
                            <div className={styles.TextCard}>
                                <div>
                                    <p className={styles.bioText}>{currentUser.bio}</p>
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* Hobbies */} {/* Mandatory 3 hobbies. Require Resc and Title Or profile wont be visible */}
                    <div className={styles.CardContainer}>   
                        <div className={styles.bioCard}>
                            <div className={styles.titles} >
                                <h3>My Hobbies...</h3>
                            </div>
                            <div className={styles.TextCard}>
                                
                                {currentUser.hobby1.trim() && (
                                <>
                                    <div className={styles.hobbySubtitleCover}> {currentUser.hobby1}</div>
                                    <div className={styles.hobbyDescription}>{currentUser.hobby1Desc}</div>
                                </>
                                )}
                                {currentUser.hobby2.trim() && (
                                <>
                                    <div className={styles.hobbySubtitleCover}> {currentUser.hobby2}</div>
                                    <div className={styles.hobbyDescription}>{currentUser.hobby2Desc}</div>
                                </>
                                )}
                                {currentUser.hobby3.trim() && (
                                <>
                                    <div className={styles.hobbySubtitleCover}> {currentUser.hobby3}</div>
                                    <div className={styles.hobbyDescription}>{currentUser.hobby3Desc}</div>
                                </>
                                )}
                                {currentUser.hobby4.trim() && (
                                <>
                                    <div className={styles.hobbySubtitleCover}> {currentUser.hobby4}</div>
                                    <div className={styles.hobbyDescription}>{currentUser.hobby4Desc}</div>
                                </>
                                )}
                                {currentUser.hobby5.trim() && (
                                <>
                                    <div className={styles.hobbySubtitleCover}> {currentUser.hobby5}</div>
                                    <div className={styles.hobbyDescription}>{currentUser.hobby5Desc}</div>
                                </>
                                )}

                                
                                
                            
                            </div>
                        </div>
                        
                    </div>

                    {/* Goals */} {/* Optional */}
                    {(currentUser.Goal1.trim() || currentUser.Goal2.trim() || currentUser.Goal3.trim() ) && (
                        <div className={styles.CardContainer}>   
                            <div className={styles.bioCard}>
                                <div className={styles.titles} >
                                    <h3>My Goals are... </h3>
                                </div>
                                <div className={styles.TextCard}>

                                    {currentUser.Goal1.trim() && (
                                    <>
                                        <div> <h1>1.</h1> </div>
                                        <div className={styles.goalsText}>{currentUser.Goal1}</div>
                                    </>
                                    )}
                                    {currentUser.Goal2.trim() && (
                                    <>
                                        <div> <h1>2.</h1>  </div>
                                        <div className={styles.goalsText}>{currentUser.Goal2}</div>
                                    </>
                                    )}
                                    {currentUser.Goal3.trim() && (
                                    <>
                                        <div> <h1>3.</h1>  </div>
                                        <div className={styles.goalsText}>{currentUser.Goal3}</div>
                                    </>
                                    )}
                                </div>
                            </div>
                        </div>


                    )}


                    {/* Im Down to...  */} {/* Required!.  3 at minimum or profile not visible? */}
                    <div className={styles.CardContainer}>   
                        <div className={styles.bioCard}>
                            <div className={styles.titles} >
                                <h3>I&apos;m Down To... </h3>
                            </div>
                            <div className={styles.TextCard}>
                                {currentUser.DownTo1.trim() && (
                                    <div className={styles.goalsText}> • {currentUser.DownTo1} </div>
                                )}
                                {currentUser.DownTo2.trim() && (
                                    <div className={styles.goalsText}> • {currentUser.DownTo2} </div>
                                )}
                                {currentUser.DownTo3.trim() && (
                                    <div className={styles.goalsText}> • {currentUser.DownTo3} </div>
                                )}
                                {currentUser.DownTo4.trim() && (
                                    <div className={styles.goalsText}> • {currentUser.DownTo4} </div>
                                )}
                                {currentUser.DownTo5.trim() && (
                                    <div className={styles.goalsText}> • {currentUser.DownTo5} </div>
                                )}
                                
                                

                            
                            </div>
                        </div>
                        
                    </div>

                    {isCopied && (<div className={styles.socialMediaCopiedPopupContainer}> <div className={styles.socialMediaCopiedPopup}>Copied!</div></div>)}
                    {errorWithCopy && (<div className={styles.socialMediaCopiedPopupContainer}> <div className={styles.socialMediaCopiedPopup}>Error!</div></div>)}

                    {/* I Would like to learn to ...  */}
                    {/* <div className={styles.CardContainer}>   
                        <div className={styles.bioCard}>
                            <div className={styles.titles} >
                                <h3>I Want to Learn... </h3>
                            </div>
                            <div className={styles.TextCard}>

                            
                            </div>
                        </div>
                        
                    </div> */}
                
                
                </div>
            )}
            </>
        )
    }

  
}
