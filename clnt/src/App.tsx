import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import Routes from './routes/Routes';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { logout } from './redux/action/authAction';
import { home, pricetag, cart, bookmark, person, logOut, logIn } from 'ionicons/icons';

setupIonicReact();

const App: React.FC = () => {
  const dispatch = useDispatch<any>();
  let isLoggedIn = useSelector(
      (state: any) => state.AuthReducer.isLoggedIn
  );
  isLoggedIn = true

  const handleLogout = () => {
      dispatch(logout());
      localStorage.clear();
      Redirect
  };
  return (
      <IonApp>
          <IonReactRouter>
              <IonTabs>
                  <IonRouterOutlet>
                      <Route path="/" component={() => <Routes />} />
                  </IonRouterOutlet>

                  <IonTabBar slot="bottom">
                      <IonTabButton tab="user-dashboard" href="/user-dashboard" >
                          <IonIcon icon={home} />
                          <IonLabel>Home</IonLabel>
                      </IonTabButton>

                      {isLoggedIn ?
                          <IonTabButton tab="product-add" href="/product-add" >
                              <IonIcon icon={pricetag} />
                              <IonLabel>Add-Product</IonLabel>
                          </IonTabButton>
                          : null
                      }
                      {isLoggedIn ?
                          <IonTabButton tab="category-add" href="/category-add" >
                              <IonIcon icon={pricetag} />
                              <IonLabel>Category</IonLabel>
                          </IonTabButton>
                          : null
                      }
                      {isLoggedIn ?
                          <IonTabButton tab="user-cart" href="/user-cart" >
                              <IonIcon icon={cart} />
                              <IonLabel>Cart</IonLabel>
                          </IonTabButton>
                          : null
                      }
                      {isLoggedIn ?
                          <IonTabButton tab="user-wishlist" href="/user-wishlist" >
                              <IonIcon icon={bookmark} />
                              <IonLabel>Favorite</IonLabel>
                          </IonTabButton>
                          : null
                      }
                      {isLoggedIn ?
                          <IonTabButton tab="user-profile" href="/user-profile" >
                              <IonIcon icon={person} />
                              <IonLabel>Profile</IonLabel>
                          </IonTabButton>
                          : null
                      }
                      {isLoggedIn ?
                          <IonTabButton tab="library" onClick={handleLogout}>
                              <IonIcon icon={logOut} />
                              <IonLabel>Log Out</IonLabel>
                          </IonTabButton>
                          : <IonTabButton tab="login" href='/login'>
                              <IonIcon icon={logIn} />
                              <IonLabel>Sign In</IonLabel>
                          </IonTabButton>
                      }
                  </IonTabBar>
              </IonTabs>
          </IonReactRouter>
      </IonApp>
  )
};

export default App;

