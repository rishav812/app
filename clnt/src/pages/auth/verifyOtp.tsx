import React, { FormEvent, useEffect, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonPage, IonRow, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from "react-router-dom";
import { verifyOtp } from '../../services/auth';
import { toastMessageError, toastMessageSuccess } from '../../components/utilities/commonTostify';
import { ToastContainer } from 'react-toastify';
import OtpInput from "react-otp-input";

function VerifyOtp() {
    const location = useLocation();
    const otpInfo = location.state as any;
    const history = useHistory();
    const [otp, setOtp] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [encOtpState, setEncOtpState] = useState<string>(otpInfo.state?.encOtp);
    const {
        handleSubmit,
        formState: { errors },
    } = useForm({});

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        console.log(encOtpState)
        setLoading(true)
        try {
            const resp = await verifyOtp({
                encOtp: encOtpState,
                otp: otp,
            })
            console.log(resp)
            if (resp.code === 200) {
                history.push("/reset-password", {
                    state: {
                        encOtp: encOtpState,
                        otp
                    },
                });
                toastMessageSuccess(resp.message);
            }
            else if (resp.code === 401) {
                toastMessageError(resp.message);
            }
        } catch (error) {
            toastMessageError("Internal server error");
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
                    <IonTitle>Verify Otp</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <IonGrid fixed>
                    <IonRow class='ion-justify-content-center'>
                        <IonCol sizeSm='16' sizeXs='10' sizeMd='8' sizeLg='6' sizeXl='4'>
                            <IonCard>
                                <IonCardContent>
                                    <form onSubmit={handleSubmit((e) => onSubmit(e as any))}>
                                        <p>Enter your OTP</p>
                                        <br />
                                        <OtpInput
                                            value={otp}
                                            onChange={(otp: string) => setOtp(otp)}
                                            numInputs={4}
                                            renderSeparator={<span>  -  </span>}
                                            renderInput={(props) => <input  {...props} style={{
                                                width: '100%',
                                                height: '40px',
                                                fontSize: '18px',
                                                borderRadius: '4px',
                                                border: '1px solid #ccc',
                                                textAlign: 'center',
                                            }} />}
                                        />
                                        {errors.otp && (
                                            <div className="invalid-feedback text-danger">
                                                <span style={{ color: 'red' }}>Otp is a required field</span>
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

export default VerifyOtp;

