import { IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useForm } from 'react-hook-form';
import InputWrapper from '../utilities/formElements/inputWrapper';
import { ChangeEvent, useEffect, useState } from 'react';
import { addProduct, fetchCategory } from '../../services/user';

function AddProduct() {
  const [isButtonDisabled1, setButtonDisabled1] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { control, handleSubmit, formState: { errors } } = useForm<any>();
  const [data, setData] = useState([]);
  const [productData, setProductData] = useState<any>({
    productname: "",
    image: "",
    description: "",
    price: 0,
    category: { _id: "", category_name: "" }
  });

  const onSubmit = async (data: any) => {
    setButtonDisabled1(true);
    try {
      const response = await addProduct({
        ...data,
        image: productData.image,
        category_id: productData?.category?._id
      });
      if (response.status === 200) {
        alert("Product added successfully");
      }
      else if (response.status === 400) {
        alert("product already added");
      }
      else {
        alert("All fields are required")
      }
    } catch (error) {
      console.log("Error in adding product: ", error);
    }
    setButtonDisabled1(false);
  }

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target && (e.target.files as FileList);
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = function () {
      console.log("reader.result", reader.result);
      const result = reader.result;
      if (result && typeof result === "string") {
        setProductData({ ...productData, image: result });
      }
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    };
  };

  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    let categorydata = e.target.value;
    if (categorydata) {
      let category = data.find((elm: any) => elm.category_name === categorydata)
      console.log(category, "category")
      setProductData({ ...productData, category: category });
    }
  }

  const fetchData = async () => {
    try {
      const dataList = await fetchCategory();
      console.log(dataList);
      setData(dataList.data);
      setIsLoading(true);
    } catch (error) {
      console.log("Error in fetching product data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Product</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonGrid fixed>
          <IonRow class='ion-justify-content-center'>
            <IonCol sizeSm='16' sizeXs='10' sizeMd='8' sizeLg='6' sizeXl='4'>
              <IonCard>
                <IonCardContent>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <h2>Create Product</h2>
                    <div className="form-group">
                      <InputWrapper
                        control={control}
                        type="text"
                        placeholder="Enter ProductName"
                        name="productname"
                        className="form-control beautiful-input"
                      />
                      <div className="message error">
                        {errors && errors?.productname && (
                          <p>
                            <>{errors?.productname?.message}</>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <InputWrapper
                        control={control}
                        type="tel"
                        placeholder="Enter Price"
                        name="price"
                        className="form-control beautiful-input"
                      />
                      <div className="message error">
                        {errors && errors?.price && (
                          <p>
                            <>{errors?.price?.message}</>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <InputWrapper
                        control={control}
                        type="text"
                        placeholder="Product Description"
                        name="description"
                        className="form-control beautiful-input"
                      />
                      <div className="message error">
                        {errors && errors?.description && (
                          <p>
                            <>{errors?.description?.message}</>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <InputWrapper
                        control={control}
                        type="file"
                        placeholder="Upload Image"
                        name="image"
                        onChange={handleClick}
                        className="form-control beautiful-input"
                      />
                      <div className="message error">
                        {errors && errors?.image && (
                          <p>
                            <>{errors?.image?.message}</>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      Category :
                      <select id="categories" name="categories" onChange={(e) => handleCategory(e)}>
                        {data && data.length ? (
                          data.map((item: any) => {
                            return (
                              <option key={item._id} value={item.category_name}>
                                {item.category_name}
                              </option>
                            );
                          })
                        ) : (
                          <option value="">Select</option>
                        )}
                      </select>
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Add Product</button>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
}

export default AddProduct;
