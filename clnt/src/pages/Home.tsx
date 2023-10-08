import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonFooter, IonList, IonCard, IonCardContent, IonItem, IonLabel, IonListHeader, IonText, IonButtons, IonMenuButton } from '@ionic/react';
import { PushNotificationSchema, PushNotifications, Token, ActionPerformed } from '@capacitor/push-notifications';
import { Toast } from "@capacitor/toast";

const CLIENT_ID = "6f7e3853d5292a30a569"


export default function PushNotificationsContainer() {
    const nullEntry: any[] = []
    const [notifications, setnotifications] = useState(nullEntry);

    // useEffect(()=>{
    //     PushNotifications.checkPermissions().then((res) => {
    //         if (res.receive !== 'granted') {
    //           PushNotifications.requestPermissions().then((res) => {
    //             if (res.receive === 'denied') {
    //               showToast('Push Notification permission denied');
    //             }
    //             else {
    //               showToast('Push Notification permission granted');
    //               register();
    //             }
    //           });
    //         }
    //         else {
    //           register();
    //         }
    //       });
    // },[])

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParams = urlParams.get("code");
        console.log(codeParams, "codeparams");
        if (codeParams) {
            async function getAccessToken() {
                await fetch("http://localhost:3000/getAccessToken?code=" + codeParams, {
                    method: "GET"
                }).then((response) => {
                    console.log("helloo")
                    return response.json();
                }).then((data) => {
                    console.log(data, "dattaaa")
                    if (data.access_token) {
                        localStorage.setItem("accessToken", data.access_token)
                        // setRerender(!rerender)
                    }
                })
            }
            getAccessToken();
        }
    }, []);

    async function getUserData() {
        await fetch("http://localhost:3000/getUserData", {
            method: "GET",
            headers: {
                "Authorization": "Bearer" + localStorage.getItem("accessToken")
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data)
        })
    }

    const register = () => {
        console.log('Initializing HomePage');

        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();

        // On success, we should be able to receive notifications
        PushNotifications.addListener('registration',
            (token: Token) => {
                console.log(token, "token")
                showToast('Push registration success');
            }
        );

        // Some issue with our setup and push will not work
        PushNotifications.addListener('registrationError',
            (error: any) => {
                alert('Error on registration: ' + JSON.stringify(error));
            }
        );

        // Show us the notification payload if the app is open on our device
        PushNotifications.addListener('pushNotificationReceived',
            (notification: PushNotificationSchema) => {
                setnotifications(notifications => [...notifications, { id: notification.id, title: notification.title, body: notification.body, type: 'foreground' }])
            }
        );

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification: ActionPerformed) => {
                setnotifications(notifications => [...notifications, { id: notification.notification.data.id, title: notification.notification.data.title, body: notification.notification.data.body, type: 'action' }])
            }
        );
    }

    const showToast = async (msg: string) => {
        await Toast.show({
            text: msg
        })
    }

    function loginWithGithub() {
        window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
    }

    return (
        <IonPage id='main'>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle slot="start"> Push Notifications</IonTitle>
                </IonToolbar>
                <IonToolbar color="light">
                    <IonTitle slot="start">By Enappd Team</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <div>
                    <IonList>
                        <IonCard>
                            <IonCardContent>
                                1. Register for Push by clicking the footer button.<br></br>
                                2. Once registered, you can send push from the Firebase console. <br></br>
                                <a href="https://enappd.gitbook.io/ionic-5-react-capacitor-full-app/features/push-notifications" target="_blank">Check documentation</a><br></br>
                                3. Once your app receives notifications, you'll see the data here in the list
                            </IonCardContent>
                            <IonButton onClick={loginWithGithub}>Login With Github</IonButton>
                            <IonButton onClick={getUserData}>Get User Data from github api</IonButton>
                        </IonCard>
                    </IonList>

                </div>
                <IonListHeader mode="ios" lines="full">
                    <IonLabel>Notifications</IonLabel>
                </IonListHeader>
                {notifications.length !== 0 &&
                    <IonList>

                        {notifications.map((notif: any) =>
                            <IonItem key={notif.id}>
                                <IonLabel>
                                    <IonText>
                                        <h3 className="notif-title">{notif.title}</h3>
                                    </IonText>
                                    <p>{notif.body}</p>
                                    {notif.type === 'foreground' && <p>This data was received in foreground</p>}
                                    {notif.type === 'action' && <p>This data was received on tap</p>}
                                </IonLabel>
                            </IonItem>
                        )}
                    </IonList>}
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonButton color="success" expand="full" onClick={register}>Register for Push</IonButton>
                </IonToolbar>
            </IonFooter>
        </IonPage >
    )
}