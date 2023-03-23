import React from 'react';
import styles from '../../styles/editProfile.module.css'
import {useState, useEffect} from 'react';
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faLinkedin, faSnapchat, faTwitter, faYoutube, faTiktok} from '@fortawesome/free-brands-svg-icons';



export default function EditProfile(props) {

    //somehow use effect and update states conditionally once current user is loaded

    // const [statefName, setstatefName] = useState();
    // const [stateinstagram, setstateinstagram] = useState();
    // const [linkedin, setstatelinkedin] = useState();
    // const [statesnapchat, setstatesnapchat] = useState();
    // const [statetwitter, setstatetwitter] = useState();
    // const [stateyoutube, setstateyoutube] = useState();
    // const [statetiktok, setstatetiktok] = useState();

    const [savedLocationPopup, setSavedLocationPopup] = useState(false);
    const [lonAndLat, setLonAndLat] = useState();
    const [imageOne, setImageOne] = useState();
    const [imageTwo, setImageTwo] = useState();
    const [imageThree, setImageThree] = useState();
    


    async function saveUserInfo(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        console.log('form:', form, 'formData', formData)
        // You can pass formData as a fetch body directly:
        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());

        const imagesJson = {}
        if(imageOne ){
            console.log('ImageOne',imageOne)
            imagesJson['profilePic1Name'] = imageOne.name,
            imagesJson['profilePic1Type'] = imageOne.type

            let { data } = await axios.post("https://proximityapp.vercel.app/api/uploadS3",  imagesJson); // http://localhost:3000/api/uploadS3   https://proximityapp.vercel.app/api/uploadS3
            console.log("s3 urls:", data)
            const url1 = data.url1;
            const S3Key = data.S3Key
            // Upload to S3 bucket
            let { info } = await axios.put(url1, imageOne, {
                headers: {
                    "Content-type": imageOne.type,
                    "Access-Control-Allow-Origin": "*",
                    "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
                },
            });
            //passing s3 key to mongodb
            formJson['profilePic1'] = S3Key;

            // setUploadedFile(BUCKET_URL + file.name);
            setImageOne(null);
        }
        if(lonAndLat){
            formJson['geoJsonLocation'] = lonAndLat
        }

        // if(imageTwo){
        //     imagesJson['profilePic2Name'] = imageTwo.name,
        //     imagesJson['profilePic2Type'] = imageTwo.type
        // }
        // if(imageThree){
        //     imagesJson['profilePic3Name'] = imageThree.name,
        //     imagesJson['profilePic3Type'] = imageThree.type
        // }

        // formJson['profilePic2'] = imageTwo;
        // formJson['profilePic3'] = imageThree;
        
        console.log("form sent to backend", formJson);

        const response = await fetch('https://proximityapp.vercel.app/api/editProfile', {  // http://localhost:3000/api/editProfile https://proximityapp.vercel.app/api/editProfile
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formJson),
        });
        const responseData = await response.json();
        console.log("update Profile response:", responseData)
        if (responseData.status == 200){
            props.getSelf()
            .then(() => {
                props.viewProfileClick()
            })
            
        }else{
            props.viewProfileClick()
        }
    }


    function profileImage1(e) {
        console.log(e.target.files[0])
        setImageOne(e.target.files[0])
    }

    // function profileImage2(e) {
    //     console.log(e.target.files[0])
    //     setImageTwo(e.target.files[0])
    // }
    // function profileImage3(e) {
    //     console.log(e.target.files[0])
    //     setImageThree(e.target.files[0])
    // }


    // useEffect(() => {
    //     setstatefName(currentUser.fName)
    //     setstateinstagram(currentUser.instagram)
    //     setstatelinkedin(currentUser.linkedin)
    //     setstatesnapchat(currentUser.snapchat)
    //     setstatetwitter(currentUser.twitter)
    //     setstateyoutube(currentUser.youtube)
    //     setstatetiktok(currentUser.tiktok)
    //   }, []);

    useEffect(() => {
        if (lonAndLat) {
            setSavedLocationPopup(true);
            setTimeout(() => setSavedLocationPopup(false), 4000);
        }
      }, [lonAndLat]);

    function findMe(event) {

        event.preventDefault();
		navigator.geolocation.getCurrentPosition((position) => {
			console.log(position);
			setLonAndLat({
                type: "Point",
                coordinates: [position.coords.longitude, position.coords.latitude]
			});
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
                <form id="editProfileForm" method="post" onSubmit={saveUserInfo}>
                    <div className={styles.profileCard} >

                        {/* Filter, Name, Button */}
                        <div className={styles.topContainer}>
                            <button className={styles.topContainerButtons} onClick={() => props.viewProfileClick() }
                            >
                                {/* <FontAwesomeIcon icon={faBars} style={{fontSize: 40, color: "#FFF"}} className={styles.getUserButton} /> */}
                                <div className={styles.topContainerButtonsCover} > <h3>Cancel</h3> </div>
                            </button>

                            <h2>
                                <input className={styles.fNameInputText} type="text" name="fName" defaultValue={currentUser.fName} placeholder="first name"/>
                            </h2>
                            
                            
                            <button type="submit" form="editProfileForm" className={styles.topContainerButtons}>
                                <div className={styles.topContainerButtonsCover} > <h3>Save</h3> </div>
                            </button>

                        </div>

                        {/* Profile image */}
                        <div className={styles.CardContainer}>
                            <div className={styles.profileImageCard}>

                                <div className={styles.inputButtonContainer}>
                                    <div><p>Upload your profle picture:</p></div>
                                    <input className={styles.inputButton} type='file' accept="image/png, image/jpeg, image/jpg" onChange={(e) => {profileImage1(e)}}/> 
                                    {/* <input className={styles.inputButton} type='file' onChange={(e) => {profileImage2(e)}}/> 
                                    <input className={styles.inputButton} type='file' onChange={(e) => {profileImage2(e)}}/>  */}
                                </div>

                            
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

                        {/* Set Location */}
                        <div className={styles.locationButtonContainer}>
                            <button className={styles.locationButton} onClick={findMe}> Set My Location </button>
                        </div>

                        {/* Social Media Scroll (Make infinite) (this feature took forever) */}
                        <div className={styles.socialMediaContainer}>
                            
                            {/* insta */}
                            <div className={styles.socialMediaCard}>
                                <div className={styles.socialMediaIconInputContainer}>
                                    <button value={currentUser.instagram} className={styles.socialMediaButton}>
                                    <FontAwesomeIcon icon={faInstagram} style={{fontSize: 35, color: "#FFF"}} className={styles.socialMediaIcons}/>
                                    </button>
                                    <input className={styles.socialMediaInputText} type="text" name="instagram" defaultValue={currentUser.instagram}/>
                                </div>
                            </div>
                            
                            {/* linkedin */}
                            <div className={styles.socialMediaCard}>
                                <div className={styles.socialMediaIconInputContainer}>
                                    <button value={currentUser.linkedin} className={styles.socialMediaButton}>
                                    <FontAwesomeIcon icon={faLinkedin} style={{fontSize: 35, color: "#FFF"}} className={styles.socialMediaIcons}/> 
                                    </button>
                                    {currentUser.linkedin.trim() 
                                    ?
                                    <input className={styles.socialMediaInputText}type="text" name="linkedin" defaultValue={currentUser.linkedin}/>
                                    : 
                                    <input className={styles.socialMediaInputText}type="text" name="linkedin" placeholder='linkedin.com/in/'/> }
                                </div>
                            </div>
                            
                            
                            {/* snapchat */}
                            <div className={styles.socialMediaCard}>
                                <div className={styles.socialMediaIconInputContainer}>
                                    <button value={currentUser.snapchat} className={styles.socialMediaButton}>
                                    <FontAwesomeIcon icon={faSnapchat} style={{fontSize: 35, color: "#FFF"}} className={styles.socialMediaIcons}/> 
                                    </button>
                                    <input className={styles.socialMediaInputText}type="text" name="snapchat" defaultValue={currentUser.snapchat}/>
                                </div>
                                
                            </div>
                        
                            {/* twitter */}
                            <div className={styles.socialMediaCard}>
                                <div className={styles.socialMediaIconInputContainer}>
                                    <button value={currentUser.twitter} className={styles.socialMediaButton}>
                                    <FontAwesomeIcon icon={faTwitter} style={{fontSize: 35, color: "#FFF"}} className={styles.socialMediaIcons}/> 
                                    </button>
                                    <input className={styles.socialMediaInputText}type="text" name="twitter" defaultValue={currentUser.twitter}/>
                                </div>
                            </div>
                        
                            {/* youtube */}
                            <div className={styles.socialMediaCard}>
                                <div className={styles.socialMediaIconInputContainer}>
                                    <button value={currentUser.youtube} className={styles.socialMediaButton}>
                                    <FontAwesomeIcon icon={faYoutube} style={{fontSize: 35, color: "#FFF"}} className={styles.socialMediaIcons}/> 
                                    </button>
                                    <input className={styles.socialMediaInputText}type="text" name="youtube" defaultValue={currentUser.youtube} />
                                </div>
                            </div>
                            
                            {/* tiktok */}
                            <div className={styles.socialMediaCard}>
                                <div className={styles.socialMediaIconInputContainer}>
                                    <button value={currentUser.tiktok} className={styles.socialMediaButton}>
                                    <FontAwesomeIcon icon={faTiktok} style={{fontSize: 35, color: "#FFF"}} className={styles.socialMediaIcons}/> 
                                    </button>
                                    <input className={styles.socialMediaInputText} type="text" name="tiktok" defaultValue={currentUser.tiktok}/>
                                </div>
                            </div>
        
                        
                        </div>

                        {/* Bio: Remember the Halo effect!! Play that into peoples best interests */}
                        <div className={styles.CardContainer}>   
                            <div className={styles.bioCard}>
                                <div className={styles.titles} >
                                    <h3>Bio</h3>
                                </div>
                                <div className={styles.TextCard}>
                                    <div>
                                        <p className={styles.bioText}>
                                            <textarea className={styles.bioTextArea} name="Bio" rows={20} cols={40} defaultValue={currentUser.bio} placeholder='Bio'/> 
                                        </p>
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
                                    
                                    
                                    <div className={styles.hobbySubtitleCover}> <input className={styles.hobbyInput} type="text" name="hobby1" defaultValue={currentUser.hobby1} placeholder='Hobby 1'/></div>
                                    <div className={styles.hobbyDescription}> <textarea className={styles.hobbyDescTextArea} name="hobby1Desc" rows={4} cols={40} defaultValue={currentUser.hobby1Desc} placeholder='Hobby 1 description'/></div>
                                    
                                  
                                    <div className={styles.hobbySubtitleCover}> <input className={styles.hobbyInput} type="text" name="hobby2" defaultValue={currentUser.hobby2} placeholder='Hobby 2'/></div>
                                    <div className={styles.hobbyDescription}> <textarea className={styles.hobbyDescTextArea} name="hobby2Desc" rows={4} cols={40} defaultValue={currentUser.hobby2Desc} placeholder='Hobby 2 description'/></div>
                                    
                                  
                                    <div className={styles.hobbySubtitleCover}> <input className={styles.hobbyInput} type="text" name="hobby3" defaultValue={currentUser.hobby3} placeholder='Hobby 3'/></div>
                                    <div className={styles.hobbyDescription}> <textarea className={styles.hobbyDescTextArea} name="hobby3Desc" rows={4} cols={40} defaultValue={currentUser.hobby3Desc} placeholder='Hobby 3 description'/></div>
                                
                                
                                    <div className={styles.hobbySubtitleCover}> <input className={styles.hobbyInput} type="text" name="hobby4" defaultValue={currentUser.hobby4} placeholder='Hobby 4'/></div>
                                    <div className={styles.hobbyDescription}> <textarea className={styles.hobbyDescTextArea} name="hobby4Desc" rows={4} cols={40} defaultValue={currentUser.hobby4Desc} placeholder='Hobby 4 description'/></div>
                                
                                
                                    <div className={styles.hobbySubtitleCover}> <input className={styles.hobbyInput} type="text" name="hobby5" defaultValue={currentUser.hobby5} placeholder='Hobby 5'/></div>
                                    <div className={styles.hobbyDescription}> <textarea className={styles.hobbyDescTextArea} name="hobby5Desc" rows={4} cols={40} defaultValue={currentUser.hobby5Desc} placeholder='Hobby 5 description'/></div>
                                   
                                
                                </div>
                            </div>
                            
                        </div>

                        {/* Goals */} {/* Optional */}
                        <div className={styles.CardContainer}>   
                            <div className={styles.bioCard}>
                                <div className={styles.titles} >
                                    <h3>My Goals are... </h3>
                                </div>
                                <div className={styles.TextCard}>

                                  
                                    <div> <h1>1.</h1> </div>
                                    <div className={styles.goalsText}>
                                        <textarea className={styles.goalsTextArea} name="Goal1" rows={3} cols={40} defaultValue={currentUser.Goal1} placeholder='Goal 1'/>
                                    </div>
                                
                                
                                    <div> <h1>2.</h1>  </div>
                                    <div className={styles.goalsText}>
                                        <textarea className={styles.goalsTextArea} name="Goal2" rows={3} cols={40} defaultValue={currentUser.Goal2} placeholder='Goal 2'/>
                                    </div>
                                
                                
                                    <div> <h1>3.</h1>  </div>
                                    <div className={styles.goalsText}>
                                        <textarea className={styles.goalsTextArea} name="Goal3" rows={3} cols={40} defaultValue={currentUser.Goal3} placeholder='Goal 3'/>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>



                        {/* Im Down to...  */} {/* Required!.  3 at minimum or profile not visible? */}
                        <div className={styles.CardContainer}>   
                            <div className={styles.bioCard}>
                                <div className={styles.titles} >
                                    <h3>I&apos;m Down To... </h3>
                                </div>
                                <div className={styles.TextCard}>
                                    
                                        <div className={styles.goalsText}> • <input className={styles.downToInputText} type="text" name="DownTo1" defaultValue={currentUser.DownTo1} placeholder='ex. grab a drink at ... '/>  </div>
                                    
                                    
                                        <div className={styles.goalsText}> • <input className={styles.downToInputText} type="text" name="DownTo2" defaultValue={currentUser.DownTo2} placeholder='ex. workout together '/> </div>
                                    
                                    
                                        <div className={styles.goalsText}> • <input className={styles.downToInputText} type="text" name="DownTo3" defaultValue={currentUser.DownTo3} placeholder='ex. grow bonsai trees '/> </div>
                                
                                    
                                        <div className={styles.goalsText}> • <input className={styles.downToInputText} type="text" name="DownTo4" defaultValue={currentUser.DownTo4} placeholder='ex. casual robot fighting'/> </div>


                                        <div className={styles.goalsText}> • <input className={styles.downToInputText} type="text" name="DownTo5" defaultValue={currentUser.DownTo5} placeholder='ex. competatively race drones'/> </div>                            
                                    
                                
                                </div>
                            </div>
                            
                        </div>

                        {savedLocationPopup && (<div className={styles.LocationPopupContainer}> <div className={styles.LocationPopupPopup}> <p1>Location set</p1> <br></br><p1>Please save</p1> </div></div>)}

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
                </form>
            )}
            </>
        )
    }

  
}
