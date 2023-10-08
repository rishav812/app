import { useSelector } from "react-redux";
import { Redirect } from 'react-router';

interface Props {
  Component: React.ComponentType;
  route: string;
}

export const WithHeader: React.FC<Props> = (props) => {
  return (
    <>
      <div className="main-box">
        {/* <Header /> */}
        <div className="common-box">
          <PrivateRoutes {...props} />
        </div>
      </div>
    </>
  );
};

function PrivateRoutes(props: any) {
  const { Component, route } = props;
  const isLogin = useSelector((state: any) => state.AuthReducer.isLoggedIn);
  // const isAdmin = useSelector(
  //   (state: any) => state.AuthReducer.authData.isAdmin
  // );
  const token = localStorage.getItem("login");

  const beforeLoginRoutes = ["/login", "/signup", "/"];

  if (true) {
    if (beforeLoginRoutes.includes(route)) {
      return <Redirect to={"/user-dashboard"} />;
    } else {
      return <Component />;
    }
  } else {
    if (beforeLoginRoutes.includes(route)) {
      return <Component />;
    } else {
      return <Redirect to={"/login"} />;
    }
  }
}

export default PrivateRoutes;
