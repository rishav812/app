import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, Switch } from 'react-router';
import { RoutesPath } from "../constants/Constants";
import PrivateRoutes, { WithHeader } from "../PrivateRoutes/PrivateRotes";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Home from "../components/user/Home";
import Cart from "../components/user/Cart";
import Favorite from "../components/user/Favorite";
import Profile from "../components/user/userProfile/UserProfile";
import { IonPage } from "@ionic/react";
import AddProduct from "../components/user/AddToProduct";
import AddToProduct from "../components/user/AddToProduct";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOtp from "../pages/auth/verifyOtp";
import ResetPassword from "../pages/auth/ResetPassword";
import AddCategory from "../components/user/AddCategory";

const Routes = () => {
    const isAdmin = useSelector((state: any) => state.AuthReducer.authData.isAdmin);
    const isLoggedIn = useSelector(
        (state: any) => state.AuthReducer.isLoggedIn
    );
    const tokenData: string | null = localStorage.getItem("login");

    return (
        <IonPage>
            <Suspense fallback={<p>Loading....</p>}>
                <>
                    <Switch>
                        <Route
                            path={RoutesPath.SIGNUP}
                            render={() => (
                                <PrivateRoutes Component={Signup} route={RoutesPath.SIGNUP} />
                            )}
                        />
                        <Route
                            path={RoutesPath.LOGIN}
                            render={() => (
                                <PrivateRoutes Component={Login} route={RoutesPath.LOGIN} />
                            )}
                        />
                        <Route
                            path={RoutesPath.FORGOTPASSWORD}
                            render={() => (
                                tokenData ? <Redirect to="/user-dashboard" /> : <ForgotPassword />
                            )}
                        />
                         <Route
                            path={RoutesPath.VERIFYOTP}
                            render={() => (
                                tokenData ? <Redirect to="/user-dashboard" /> : <VerifyOtp />
                            )}
                        />
                         <Route
                            path={RoutesPath.RESETPASSWORD}
                            render={() => (
                                tokenData ? <Redirect to="/user-dashboard" /> : <ResetPassword />
                            )}
                        />
                        <Route
                            path={RoutesPath.DASHBOARD}
                            render={() => {
                                return <PrivateRoutes Component={Home} route={RoutesPath.DASHBOARD} />;
                            }} />
                        <Route
                            path={RoutesPath.CART}
                            render={() => {
                                return <PrivateRoutes Component={Cart} route={RoutesPath.CART} />;
                            }} />
                         <Route
                            path={RoutesPath.ADDCATEGORY}
                            render={() => {
                                return <PrivateRoutes Component={AddCategory} route={RoutesPath.ADDCATEGORY} />;
                            }} />
                        <Route
                            path={RoutesPath.ADDPRODUCT}
                            render={() => {
                                return <PrivateRoutes Component={AddToProduct} route={RoutesPath.ADDPRODUCT} />;
                            }} />
                        <Route
                            path={RoutesPath.WISHLIST}
                            render={() => {
                                return <PrivateRoutes Component={Favorite} route={RoutesPath.WISHLIST} />;
                            }} />
                        <Route
                            path={RoutesPath.USERPROFILE}
                            render={() => {
                                return <PrivateRoutes Component={Profile} route={RoutesPath.USERPROFILE} />;
                            }} />
                    </Switch>
                </>
            </Suspense>
        </IonPage>
    )
}

export default Routes;
