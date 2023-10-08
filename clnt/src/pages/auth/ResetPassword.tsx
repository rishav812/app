import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonPage, IonRow, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import { useForm } from 'react-hook-form';
import { resetPassword } from '../../services/auth';
import { toastMessageSuccess } from '../../components/utilities/commonTostify';
import { ToastContainer } from 'react-toastify';

function ResetPassword() {
    const [loading, setLoading] = useState(false);
    const otpInfo = useLocation().state;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({});


    const onSubmit = async (data: any) => {
        const {new_password,password_confirmation}=data
        setLoading(true)
        try {
            const data={
                new_password:new_password,
                password_confirmation:password_confirmation,
                otpInfo
            }
            const resp = await resetPassword(data);
            if (resp.code === 200) {
                toastMessageSuccess(resp.message);
            }
            else if (resp.code === 400) {
                toastMessageSuccess(resp.message);
            }
            else if (resp.code === 401) {
                toastMessageSuccess(resp.message);
            }
        } catch (error) {
            toastMessageSuccess("Internal server error");
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    }

    return (
        <>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Reset Password</IonTitle>
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
                                            className="ion-margin-top"
                                            fill="outline"
                                            labelPlacement='floating'
                                            label="New Password"
                                            type="password"
                                            {...register("new_password", { required: true })}
                                        />
                                        {errors.new_password?.type === "required" && (
                                            <div className="invalid-feedback">
                                                <span style={{ color: 'red' }}>New Password is a required field</span>
                                            </div>
                                        )}

                                        <IonInput
                                            className="ion-margin-top"
                                            fill="outline"
                                            labelPlacement='floating'
                                            label="Re-enter New Password"
                                            type="password"
                                            {...register("password_confirmation", { required: true })}
                                        />
                                        {errors.password_confirmation && (
                                            <div className="invalid-feedback text-danger">
                                                <span style={{ color: 'red' }}>Confirm New Password is a required field</span>
                                            </div>
                                        )}

                                        <IonButton
                                            type="submit"
                                            expand="block"
                                            className="ion-margin-top"
                                            disabled={loading} >
                                            Save {(() => {
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

export default ResetPassword;

