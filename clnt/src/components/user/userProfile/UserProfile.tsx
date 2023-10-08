import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// import { Camera, CameraResultType } from '@capacitor/camera';
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router';
// import { VoiceRecorder, VoiceRecorderPlugin, RecordingData, GenericResponse, CurrentRecordingStatus } from 'capacitor-voice-recorder';

// const { AudioRecorder } = Plugins;

const Profile: React.FC = () => {
    const history = useHistory();
    const [recording, setRecording] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [image, setImage] = useState<any>(null);

    const [data, setData] = useState<any>({
        name: "",
        email: "",
        phone: ""
    });

    const userData = useSelector(
        (state: any) => state.AuthReducer.authData
    );

    const fetchData = async () => {
        try {
            setData(userData)
        } catch (error) {
            console.log("Error in fetching product data: ", error);
        }
    };

    const handleNavigate = (email: string) => {
        window.location.href = `/change_password?email=${email}`;
    }

    // const takePicture = async () => {
    //     const image = await Camera.getPhoto({
    //         quality: 90,
    //         allowEditing: false,
    //         resultType: CameraResultType.Base64,
    //     });

    //     const img = `data:image/jpeg;base64,${image.base64String}`;
    //     setImage(img);
    // };

    // const requestAudioRecordingPermission = () => {
    //     return VoiceRecorder.requestAudioRecordingPermission();
    // };

    // const startRecording = () => {
    //     requestAudioRecordingPermission()
    //         .then(() => {
    //             VoiceRecorder.startRecording()
    //                 .then((result: GenericResponse) => {
    //                     setRecording(true)
    //                 })
    //                 .catch(error => console.log(error));
    //         })
    //         .catch(() => {
    //             console.log('Microphone permission denied.');
    //         });
    // };

    // const stopRecording = () => {
    //     setRecording(false);
    //     VoiceRecorder.stopRecording()
    //         .then((result: RecordingData) => {
    //             const audioData = result.value; // The recorded audio data
    //             saveAudioFile(audioData as any);
    //         })
    //         .catch(error => console.log(error))
    // }
    // const saveAudioFile = (audioData: string) => {
    //     const audioBlob = new Blob([audioData], { type: 'audio/wav' });

    //     // Create a download link
    //     const downloadLink = document.createElement('a');
    //     downloadLink.href = URL.createObjectURL(audioBlob);
    //     downloadLink.download = 'recorded-audio.wav'; // Set the desired file name
    //     downloadLink.style.display = 'none';

    //     // Append the link to the body and trigger the click event
    //     document.body.appendChild(downloadLink);
    //     downloadLink.click();

    //     // Clean up the URL object and remove the link
    //     URL.revokeObjectURL(downloadLink.href);
    //     document.body.removeChild(downloadLink);
    // };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <IonHeader>
                <IonToolbar color={'success'}>
                    <IonTitle>List</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonCard>
                    {/* <IonButton expand='full' onClick={takePicture}>
                        Take Picture
                    </IonButton>
                    <img src={image} alt='' /> */}
                    <div>
                        {/* {recording ? (
                            <IonButton onClick={stopRecording}>Stop Recording</IonButton>
                        ) : (
                            <IonButton onClick={startRecording}>Start Recording</IonButton>
                        )} */}
                    </div>
                    <IonCardHeader>
                        <IonCardTitle>Name: <span>{data.name}</span></IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <p>Email: <span>{data.email}</span></p>
                        <p>Phone: <span>{data.phone}</span></p>
                        <IonButton expand="block" color="success">
                            Edit
                        </IonButton>
                        <IonButton
                            routerLink="/change_password"
                            expand="block"
                            color="primary"
                            onClick={() => handleNavigate(data.email)}
                        >
                            Change Password
                        </IonButton>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </>
    );
};

export default Profile;
