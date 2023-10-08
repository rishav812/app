import React, { useEffect, useState } from 'react';
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { cart, call, construct, home, pricetag, addCircle, bookmark, copy, contract, person, logOut } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Home from '../../user/Home';
import Cart from '../../user/Cart';
import Profile from '../../user/userProfile/UserProfile';
import Login from '../../../pages/auth/Login';
import Signup from '../../../pages/auth/Signup';
import Favorite from '../../user/Favorite';
import Routes from '../../../routes/Routes';
import { logout } from '../../../redux/action/authAction';

const Header: React.FC = () => {
    // const [loading, setLoading] = useState(true);
    // window.location.reload();
    const dispatch = useDispatch<any>();

    const isLoggedIn = useSelector(
        (state: any) => state.AuthReducer.isLoggedIn
    );
    const isAdmin = useSelector(
        (state: any) => state.AuthReducer.authData.isAdmin
    );

    const handleLogout = () => {
        dispatch(logout());
        localStorage.clear();
        // navigate("/");
    };

    return (
        <>
            <IonReactRouter>
                <IonTabs>

                    <IonTabBar slot="bottom">
                        <IonTabButton tab="home" href="/user-dashboard">
                            <IonIcon icon={home} />
                            <IonLabel>Home</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="cart" href="/user-cart">
                            <IonIcon icon={cart} />
                            <IonLabel>Cart</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="bookmark" href="/user-wishlist" >
                            <IonIcon icon={bookmark} />
                            <IonLabel>Wishlist</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab4" href="/user-profile">
                            <IonIcon icon={person} />
                            <IonLabel>Profile</IonLabel>
                        </IonTabButton> 

                        {/* <IonTabButton tab="tab5" href="/admin-profile">
                            <IonIcon icon={isAdmin ? person : undefined} />
                            <IonLabel>Profile</IonLabel>
                        </IonTabButton> */}

                        <IonTabButton tab="tab6" onClick={handleLogout}>
                            <IonIcon icon={logOut} />
                            <IonLabel>Logout</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </>
    );
};

export default Header;


// {isAdmin && isLoggedIn ? (
//     <>
//         <IonTabButton tab="dashboard" href="/admin-dashboard">
//             <IonIcon icon={cart} />
//             <IonLabel>Dashboard</IonLabel>
//         </IonTabButton>

//         <IonTabButton tab="library" href="/all-product">
//             <IonIcon icon={call} />
//             <IonLabel>Products</IonLabel>
//         </IonTabButton>

//         <IonTabButton tab="library" href="/product-add">
//             <IonIcon icon={call} />
//             <IonLabel>Add Products</IonLabel>
//         </IonTabButton>

//         <IonTabButton tab="library" href="/category-add">
//             <IonIcon icon={call} />
//             <IonLabel>Category</IonLabel>
//         </IonTabButton>

//         <IonTabButton tab="library" href="/admin-profile">
//             <IonIcon icon={call} />
//             <IonLabel>Profile</IonLabel>
//         </IonTabButton>

//         <IonTabButton tab="library" href="/signup">
//             <IonIcon icon={call} />
//             <IonLabel>Logout</IonLabel>
//         </IonTabButton>
//     </>
// ) : isLoggedIn ? (
//     <>
//         <IonTabButton tab="library"
//         // href="/user-dashboard"
//         >
//             <IonIcon icon={cart} />
//             <IonLabel>Home</IonLabel>
//         </IonTabButton>

//         <IonTabButton tab="library"
//         // href="/user-cart"
//         >
//             <IonIcon icon={cart} />
//             <IonLabel>Cart</IonLabel>
//         </IonTabButton>

//         <IonTabButton tab="library"
//         // href="/user-wishlist"
//         >
//             <IonIcon icon={cart} />
//             <IonLabel>Wishlist</IonLabel>
//         </IonTabButton>

//         <IonTabButton tab="library"
//         //  href="/user-profile"
//         >
//             <IonIcon icon={cart} />
//             <IonLabel>Profile</IonLabel>
//         </IonTabButton>

//         <IonTabButton tab="library"
//         // href="/signup"
//         >
//             <IonIcon icon={cart} />
//             <IonLabel>Logout</IonLabel>
//         </IonTabButton>
//     </>
// ) : (
//     <>
//         <IonTabButton tab="library" href="/">
//             <IonIcon icon={cart} />
//             <IonLabel>Landing</IonLabel>
//         </IonTabButton>

//         <IonTabButton tab="library" href="/signup">
//             <IonIcon icon={cart} />
//             <IonLabel>Sign Up</IonLabel>
//         </IonTabButton>

//         <IonTabButton tab="library" href="/login">
//             <IonIcon icon={cart} />
//             <IonLabel>Login</IonLabel>
//         </IonTabButton>
//     </>
// )
// }