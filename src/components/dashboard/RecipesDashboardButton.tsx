import ViewQuiltIcon from "@material-ui/icons/ViewQuilt";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { action as toggleMenu } from "redux-burger-menu";

import "../scss/RecipesDashboardButton.scss";

const RecipesDashboardButton = () => {
  const [isVisible, setVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 500);

    return () => {
      console.log("End animation");
      setVisible(false);
    };
  }, []);

  return (
    <Button
      className={`recipeDashboard__button ${isVisible ? "visible" : ""}`}
      variant="primary"
      onClick={() => {
        dispatch(toggleMenu(true));
      }}
    >
      <ViewQuiltIcon></ViewQuiltIcon>
    </Button>
  );
};

export default RecipesDashboardButton;
