import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonRouter } from '@ionic/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { postSignupService } from '../../services/auth';

const Signup: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [userData, setUserData] = useState<any>({
    image: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: ""
  });
  const router = useIonRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const res = await postSignupService({ ...data, image: userData.image });
      console.log("dddd", res);
      if (res.status) {
        if (res.code === 200) {
          alert("User registered successfully");
          // navigate("/login");
        }
        if (res.code === 409) {
          alert("Email already Exist");
        }
      } else {
        alert("failed to register");
      }
    } catch (error) {
      console.log(error);
    }
    // setTimeout(async () => {
    //   dismiss();
    //   router.push('/app', 'root');
    // }, 2000);

    // await present('Logging In...')
    setLoading(false)
  }

  const handleClick = (e: any) => {
    const files = e.target && (e.target.files as FileList);
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = function () {
      const result = reader.result;
      if (result && typeof result === "string") {
        setUserData({ ...userData, image: result });
        setImagePreview(result)
      }
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    };
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons>
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false}>
        <IonGrid fixed>
          <IonRow class='ion-justify-content-center'>
            <IonCol sizeSm='16' sizeXs='10' sizeMd='8' sizeLg='6' sizeXl='4'>
              <IonCard>
                <IonCardContent>
                  <form onSubmit={handleSubmit(onSubmit)}>

                    <IonLabel position="stacked">File</IonLabel>
                    <input
                      type="file"
                      accept='image/*'
                      onChange={(e) => handleClick(e)}
                    />

                    {imagePreview && <img src={imagePreview} style={{
                      borderRadius: '50%',
                      width:'100px',
                      height: '100px',
                      display: 'flex',
                      marginTop: '20px',
                      objectFit: 'cover',
                    }} alt="preview" />}


                    <IonInput
                      className="ion-margin-top"
                      fill="outline"
                      labelPlacement='floating'
                      label="Name"
                      type="text"
                      {...register("name", { required: true })}
                    />
                    {errors.email && (
                      <div className="invalid-feedback text-danger">
                        <span style={{ color: 'red' }}>Name is a required field</span>
                      </div>
                    )}

                    <IonInput
                      className="ion-margin-top"
                      fill="outline"
                      labelPlacement='floating'
                      label="Email"
                      type="email"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <div className="invalid-feedback text-danger">
                        <span style={{ color: 'red' }}>Email is a required field</span>
                      </div>
                    )}

                    <IonInput
                      className="ion-margin-top"
                      fill="outline"
                      labelPlacement='floating'
                      label="Phone"
                      type="tel"
                      {...register("phone", { required: true })}
                    />
                    {errors.phone && (
                      <div className="invalid-feedback text-danger">
                        <span style={{ color: 'red' }}>Phone is a required field</span>
                      </div>
                    )}

                    <IonInput
                      className="ion-margin-top"
                      fill="outline"
                      labelPlacement='floating'
                      label="Password"
                      type="password"
                      {...register("password", { required: true })}
                    />
                    {errors.phone && (
                      <div className="invalid-feedback text-danger">
                        <span style={{ color: 'red' }}>Password is a required field</span>
                      </div>
                    )}

                    <IonInput
                      className="ion-margin-top"
                      fill="outline"
                      labelPlacement='floating'
                      label="Re-enter Password"
                      type="password"
                      {...register("password_confirmation", { required: true })}
                    />
                    {errors.password_confirmation && (
                      <div className="invalid-feedback text-danger">
                        <span style={{ color: 'red' }}>Confirm Password is a required field</span>
                      </div>
                    )}

                    <IonButton
                      type="submit"
                      expand="block"
                      className="ion-margin-top">
                      Create Account
                    </IonButton>
                    <IonButton
                      routerLink="/login"
                      type="button"
                      color={'danger'}
                      expand="block"
                      className="ion-margin-top">
                      Already have an account ? Login
                    </IonButton>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
