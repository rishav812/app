import {
  IonButton,
  IonButtons,
  IonCardContent,
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonLabel,
  IonList,
  IonSearchbar,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { getAllProductService, searchProduct } from "../../services/user";
import "./Home.css";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [itemsPerPage] = useState(3);
  const [searchData, setSearchData] = useState([]);
  const [products, setProducts] = useState<any>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const search = async (e: any) => {
    try {
      const text = e.target.value;
      if ((typeof text === "string" && text.length === 0) || text === null) {
        setSearchData([]);
      } else {
        const search = await searchProduct(text);
        if (search?.data?.success) {
          setSearchData(search?.data?.data);
        } else {
          setSearchData([]);
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await getAllProductService(currentPage, itemsPerPage);
      console.log("response=>", response);
      setProducts(response.productData);
      setTotalItems(response.totalItems);
    } catch (error) {
      console.log("error=>", error);
    }
  };

  const loadMoreData = async () => {
    console.log(products.length,totalItems,"pppppp")
    // if (products.length < totalItems) {
    //   setLoadingMore(true);
      try {
        // const nextPage = currentPage + 1;
        const response = await getAllProductService(currentPage, itemsPerPage);
        if(response.productData.length>0){
          setProducts([...products,...response.productData])
          console.log(products,"products=>");
          setCurrentPage(currentPage+1);
        }
      } catch (error) {
        console.log(error);
      }
    // }else{
    //   console.log("==--")
    // }
  };
  useEffect(() => {
    // fetchData();
    loadMoreData();
  }, []);

  return (
    <>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
        <IonToolbar color={"primary"}>
          <IonSearchbar
            debounce={1000}
            onIonInput={(e) => search(e)}
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonInfiniteScroll
            onIonInfinite={loadMoreData} //let loadMoreData be the function instead of fetchData
            disabled={!hasMore}
          >
            <IonInfiniteScrollContent
              loadingText="Loading..."
              loadingSpinner="bubbles"
              // endMessage={<p>No more data to load.</p>}
            >
              <div className="layout">
                {products.map((product: any) => (
                  <IonCardContent>
                    <div className="card">
                      <img
                        src={product.image}
                        alt={product.productname}
                        width={"100%"}
                      />
                      <IonLabel>
                        <h2>{product.productname}</h2>
                        <p>{product.description}</p>
                        <IonText color="primary">${product.price}</IonText>
                      </IonLabel>
                    </div>
                  </IonCardContent>
                ))}
              </div>
            </IonInfiniteScrollContent>
          </IonInfiniteScroll>
          <div className="pagination">
            <span>
              <IonButtons>
                <IonButton
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </IonButton>
              </IonButtons>
              <IonButtons>
                <IonButton
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={
                    currentPage === Math.ceil(totalItems / itemsPerPage)
                  }
                >
                  Next
                </IonButton>
              </IonButtons>
            </span>
          </div>
        </IonList>
      </IonContent>
    </>
  );
};

export default Home;
