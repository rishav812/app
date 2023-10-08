import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Cart = () => {
  console.log("cartttt")
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cart</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          Listen now content
        </div>
      </IonContent>
    </>
  );
}

export default Cart;