import React from 'react';
import styles from '../../styles/locationSelector.module.css'
import {useState, useEffect} from 'react';
import axios from "axios";
// import { MapConsumer} from 'react-leaflet';

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css'


const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
    ssr: false,
  });
  
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), {
    ssr: false,
});

const useMapEvents = dynamic(() => import('react-leaflet/hooks').then((mod) => mod.useMapEvents), {
    ssr: false,
});



export default function LocationSelector(props) {
    const [latAndLon, setLatAndLon] = useState({
        lat: 40.72683,
        lng: -73.943512,
    });

    function MyComponent() {
        const map = useMapEvents({
          click: () => {
            map.locate()
          },
          locationfound: (location) => {
            console.log('location found:', location)
          },
        })
        return null
    }



    async function saveLocation() {
       
       

        // const response = await fetch('http://localhost:3000/api/editProfile', {  // http://localhost:3000/api/editProfile 'https://proximityapp.vercel.app/api/editProfile'
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(formJson),
        // });
        // const responseData = await response.json();
        // console.log("update Profile response:", responseData)
        // if (responseData.status == 200){
        //     props.getSelf()
        //     .then(() => {
        //         props.viewProfileClick()
        //     })
            
        // }else{
        //     props.viewProfileClick()
        // }
    }

    function mapClick(event) {
		console.log('clicked');
		console.log(event);
		let coords = event.latlng;
		console.log(coords);
		let obj = {};
		obj.lat = coords.lat;
		obj.lng = coords.lng;
		
		setLatAndLon(obj)
		console.log(latAndLon);
    }

    function findMe() {
		navigator.geolocation.getCurrentPosition((position) => {
			console.log(position);
			setLatAndLon({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
		});
	}

  
    
    if (props && props.userInfo){
        const currentUser = props.userInfo[props.index];
        console.log('userprofile props', props , 'Current User:', currentUser)
        

        return (
            <>
            {currentUser && (

                    <div className={styles.profileCard}  >

                        {/* Filter, Name, Button */}
                        <div className={styles.topContainer}>
                            <button className={styles.topContainerButtons} onClick={() => props.viewUsersClick() }
                            >
                                {/* <FontAwesomeIcon icon={faBars} style={{fontSize: 40, color: "#FFF"}} className={styles.getUserButton} /> */}
                                <div className={styles.topContainerButtonsCover} > <h3>Cancel</h3> </div>
                            </button>

                            <h2>
                                Pick Your Location
                            </h2>
                            
                            
                            <button onClick={saveLocation} className={styles.topContainerButtons}>
                                <div className={styles.topContainerButtonsCover} > <h3>Save</h3> </div>
                            </button>

                        </div>

                        <div  className={styles.mapContainer} >
                            <MapContainer
                                center={[latAndLon.lat, latAndLon.lng]}
                                zoom={5}
                                onClick={(event) => mapClick(event)}
                                style={{ width: '600px', height: '600px' }}
                            >
                                <TileLayer
                                    onClick={(event) => mapClick(event)}
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <MyComponent />

                                {/* {this.state.locations.length > 0 &&
                                    this.state.locations.map((location) => (
                                        <Marker
                                            key={`marker-${location.id}`}
                                            position={[location.lat, location.lng]}
                                        >
                                            <Popup>
                                                <p>{location.id} </p>
                                            </Popup>
                                        </Marker>
                                ))} */}


                            </MapContainer>
                        </div>
                        <button onClick={findMe}>Find me!</button>

                    </div>
                

            )}
            </>
        )
    }

  
}
