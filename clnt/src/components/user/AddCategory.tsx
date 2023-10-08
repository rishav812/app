import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { useForm } from 'react-hook-form';
import InputWrapper from '../utilities/formElements/inputWrapper';
import { useState } from 'react';
import { addCategory } from '../../services/user';

function AddCategory() {
  const [isButtonDisabled1, setButtonDisabled1] = useState<boolean>(false);
  const { control, handleSubmit, formState: { errors } } = useForm<any>();

  const onSubmit = async (data:any) => {
    setButtonDisabled1(true);
    try {
      const response = await addCategory(data);
      if (response?.status === 200) {
        alert("Category added successfully");
      }
      else if(response?.status === 400){
        alert("Category already exist")
      }
      console.log(response);
    } catch (error) {
      console.log("Error in adding product: ", error);
    }
    setButtonDisabled1(false);
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Category</IonTitle>
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
          <form 
            onSubmit={handleSubmit(onSubmit)}
            style={{
              padding: "20%",
              width: "100vw",
              height: "50vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <br />
            <br />
            <h2>Add Category</h2>
            <br />
            <div className="form-group">
              <InputWrapper
                control={control}
                type="text"
                placeholder="Add Category"
                name="category_name"
                className="form-control beautiful-input"
              />
              <div className="message error">
                {errors && errors?.category && (
                  <p>              
                    <>{errors?.category?.message}</>
                  </p>
                )}
              </div>
            </div>
            <br />
            <br />
            <button type="submit" className="btn btn-primary">Add Category</button>
          </form>
        </div>
      </IonContent>
    </>
  );
}

export default AddCategory;