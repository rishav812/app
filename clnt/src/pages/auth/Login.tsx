import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonRow, IonSpinner, IonTitle, IonToolbar, useIonLoading, useIonRouter } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { Plugins } from '@capacitor/core';
import { useDispatch } from "react-redux";
import { signInAction } from '../../redux/action/authAction';
import { navigate } from 'ionicons/icons';
import { Link } from 'react-router-dom';
// import { ILoginData } from '../interfaces/authInterface';

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const modal = useRef<HTMLIonModalElement>(null);
    const [openModal, setOpenModal] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({});
    const router = useIonRouter();

    const onSubmit = async (data: any) => {
        router.push('/user-profile')
        // setLoading(true)
        // try {
        //     const res = await postLoginService(data);
        //     console.log(res);
        //     const newRes = res.data;
        //     if (res.status) {
        //         if (res.code === 200) {
        //             localStorage.setItem("login", newRes.token)
        //             const { user_id, name, email, phone, isAdmin } = newRes;
        //             dispatch(signInAction({ user_id, name, email, phone, isAdmin }));
        //             // router.push('/userprofile', 'root')
        //         }
        //     }
        //     if (res.code === 400) {
        //         alert("password or email is not valid");
        //     }

        //     if (res.code === 409) {
        //         alert("You are not registered");
        //         // navigate("/register")
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
        // finally {
        //     setTimeout(() => {
        //         setLoading(false);
        //     }, 2000);
        // }
    }

    return (
        <>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <IonGrid fixed>
                    <IonRow class='ion-justify-content-center'>
                        <IonCol sizeSm='16' sizeXs='10' sizeMd='8' sizeLg='6' sizeXl='4'>
                            <IonCard>
                                <IonCardContent>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <IonInput
                                            fill="outline"
                                            labelPlacement='floating'
                                            label="Email"
                                            type="email"
                                            {...register("email", 
                                            // { required: true }
                                            )}
                                        />
                                        {/* {errors.email && (
                                            <div className="invalid-feedback text-danger">
                                                <span style={{ color: 'red' }}>Email is a required field</span>
                                            </div>
                                        )} */}
                                        <IonInput
                                            className="ion-margin-top"
                                            fill="outline"
                                            labelPlacement='floating'
                                            label="Password"
                                            type="password"
                                            {...register("password",
                                            // { required: true }
                                            )}
                                        />
                                        {/* {errors.password?.type === "required" && (
                                            <div className="invalid-feedback">
                                                <span style={{ color: 'red' }}>Password is a required field</span>
                                            </div>
                                        )} */}
                                        <br/>
                                        <div className="form-bottom">
                                            <Link to="/forgot-password" style={{textDecoration:"none"}}>
                                                Forgot Password
                                            </Link>
                                        </div>

                                        <IonButton
                                            type="submit"
                                            expand="block"
                                            className="ion-margin-top"
                                            disabled={loading} >
                                            Login{(() => {
                                                if (loading) {
                                                    return (
                                                        <IonSpinner name="crescent" className="spinner-loader" />
                                                    );
                                                }
                                            })()}
                                        </IonButton>
                                        {/* <IonButton
                                                    className="login-button ion-margin-top"
                                                    onClick={googleLogin}
                                                    fill="solid"
                                                    color={'success'}
                                                    type="button"
                                                    expand="block">
                                                    Sign In With Google
                                                </IonButton> */}
                                        {/* <IonButton
                                                    className="login-button ion-margin-top"
                                                    onClick={facebookLogin}
                                                    fill="solid"
                                                    color={'primary'}
                                                    type="button"
                                                    expand="block">
                                                    Sign In With Facebook
                                                </IonButton> */}
                                        <IonButton
                                            routerLink="/register"
                                            color={'danger'}
                                            type="button"
                                            expand="block"
                                            className="ion-margin-top">
                                            Create Account
                                        </IonButton>
    
                                        <IonButton
                                            fill="clear"
                                            size="small"
                                            color={'medium'}
                                            type="button"
                                            expand="block"
                                            className="ion-margin-top"
                                        >
                                            Change Password
                                        </IonButton>
                                    </form>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </>
    );
};

export default Login;

//   <Link to='/change_password'  style={{ marginTop:"2px", color: 'black', textDecoration: 'none' }}>CHANGE PASSWORD</Link>}