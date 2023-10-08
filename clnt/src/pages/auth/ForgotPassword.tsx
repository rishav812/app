import React, { useEffect, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonPage, IonRow, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import { forgotPassword, resetPassword } from '../../services/auth';
import { toastMessageError, toastMessageSuccess } from '../../components/utilities/commonTostify';
import { ToastContainer } from 'react-toastify';

function ForgotPassword() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState<string>('');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({});

    const onSubmit = async (data: any) => {
        setLoading(true)
        try {
            const result = await forgotPassword(data)
            if (result.code === 200) {
                toastMessageSuccess(result.message);
                // console.log(result.data.encOtp)
                history.push("/verify-otp", {
                    state: {
                        email: data.email,
                        encOtp: result && result.data && result.data?.encOtp,
                    },
                });
            }
            else if (result.code === 401) {
                toastMessageError(result.message);
            }
        } catch (error) {
            toastMessageError("Internal server error");
        }
        finally {
            setTimeout(() => {
                setLoading(false);
            }, 5000);
        }
    }

    return (
        <>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Forgot Password</IonTitle>
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
                                            {...register("email", { required: true })}
                                        />
                                        {errors.email && (
                                            <div className="invalid-feedback text-danger">
                                                <span style={{ color: 'red' }}>Email_id is a required field</span>
                                            </div>
                                        )}

                                        <IonButton
                                            type="submit"
                                            expand="block"
                                            className="ion-margin-top"
                                            disabled={loading} >
                                            submit{(() => {
                                                if (loading) {
                                                    return (
                                                        <IonSpinner name="crescent" className="spinner-loader" />
                                                    );
                                                }
                                            })()}
                                        </IonButton>
                                    </form>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
            <ToastContainer />
        </>
    )
}

export default ForgotPassword;

