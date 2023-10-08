// import { useIonModal, useIonViewWillEnter } from '@ionic/react';
// import { useEffect, useState } from 'react';
// import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
// import { Device } from "@capacitor/device";
// // import { Geolocation } from '@capacitor/geolocation';
// // import { GrayGeolocation } from "capacitor-gray-geolocation";
// import "leaflet/dist/leaflet.css";
// import { GoogleMap } from '@capacitor/google-maps';
// import { useRef } from 'react';
// import { markers } from '../common';
// import { MarkerInfoWindow } from '../common/MarkerInfoWindow';
// import { Direction } from 'react-toastify/dist/utils';

function Favorite() {
//   const mapRef = useRef<HTMLElement>();
//   const [selectedMarker, setSelectedMarker] = useState<any>(null);
//   // const [location, setLocation] = useState<any>([])
//   const [present, dismiss] = useIonModal(MarkerInfoWindow, {
//     marker: selectedMarker
//   });

//   const modalOptions = {
//     initialBreakpoint: 0.4,
//     breakpoints: [0, 0.4],
//     backdropBreakpoint: 0,
//     onDidDismiss: () => dismiss()
//   };

//   const markerClick = (marker: any) => {
//     setSelectedMarker(markers.filter(m => (m.lat === marker.latitude && m.lng === marker.longitude))[0]);
//     present(modalOptions);
//   }
  
//   let newMap: GoogleMap;
//   const [mapConfig, setMapConfig] = useState({
//     zoom: 10,
//     center: {
//       lat: 0,
//       lng: 0
//     }
//   })

//   const addMapMarker = async (location: any) => {
//     await newMap.addMarker({
//       coordinate: {
//         lat: location.lat,
//         lng: location.lng
//       },
//       // title: marker.title
//     });
//   }

//   // const mapMarker = () => markers.forEach(marker => addMapMarker(marker))                                
//   const mapMarker = async () => {
//     const coordinates = await Geolocation.getCurrentPosition();
//     const location = {
//       lat: coordinates.coords.latitude,
//       lng: coordinates.coords.longitude
//     };
//     // setMapConfig({
//     //   zoom: 10,
//     //   center: location
//     // });
//     addMapMarker(location)
//   }

//   async function createMap() {
//     if (!mapRef.current) return;
//     const coordinates = await Geolocation.getCurrentPosition();
//     const location = {
//       lat: coordinates.coords.latitude,
//       lng: coordinates.coords.longitude
//     };
//     newMap = await GoogleMap.create({
//       id: 'google-map',
//       element: mapRef.current,
//       apiKey: "AIzaSyCBfDNvJXRKkhOLkUpWo0lKVWKMkUKfHcU",
//       config: {
//         zoom: 10,
//         center: location
//       }
//     });
//     newMap.setOnMarkerClickListener((marker) => markerClick(marker));
//     mapMarker()
//   }

//   useEffect(() => {
//     createMap()
//   },[]);

//   return (
//     <div className="component-wrapper">
//       <capacitor-google-map ref={mapRef} style={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignCenter: 'center',
//         width: 700,
//         height: 650
//       }}></capacitor-google-map>
//     </div>
//   )
}

export default Favorite;








// // const [popupOpen, setPopupOpen] = useState(false)

// // useEffect(() => {
// //   window.dispatchEvent(new Event('resize'));
// // });

// // const togglePopup = () => {
// //   setPopupOpen(!popupOpen);
// // };

// // return (
// //   <>
// //     <IonHeader>
// //       <IonToolbar color={'primary'}>
// //         <IonTitle>Map</IonTitle>
// //       </IonToolbar>
// //     </IonHeader>
// //     <IonContent fullscreen>
// //       <div
// //         style={{
// //           display: 'flex',
// //           alignItems: 'center',
// //           justifyContent: 'center',
// //           height: '100%',
// //           paddingTop: '20px',
// //         }}
// //       >
// //         <MapContainer center={[26.858917, 75.762776]} zoom={3} scrollWheelZoom={true} style={{ height: '80vh', width: '50%' }}>
// //           <TileLayer
// //             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// //             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //           />
// //           <Marker position={[26.858917, 75.762776]} eventHandlers={{ click: () => togglePopup() }}>
// //             <Popup>
// //               A pretty CSS3 popup. <br /> Easily customizable.
// //             </Popup>
// //           </Marker>
// //         </MapContainer>
// //       </div>
// //     </IonContent>
// //   </>
// // );