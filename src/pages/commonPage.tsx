import React from "react";
import MyNavBar from "../components/Navbar";

type commonPageProps = {};

const commonPage: React.FC<commonPageProps> = (props) => {
  return (
    <React.Fragment>
      <MyNavBar></MyNavBar>
      {props.children}
    </React.Fragment>
  );
};

export default commonPage;
