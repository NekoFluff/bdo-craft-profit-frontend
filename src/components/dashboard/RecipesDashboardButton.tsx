import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { action as toggleMenu } from "redux-burger-menu";
import ViewQuiltIcon from "@material-ui/icons/ViewQuilt";
import { Button } from "react-bootstrap";
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
