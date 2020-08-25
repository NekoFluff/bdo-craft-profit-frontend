import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { action as toggleMenu } from "redux-burger-menu";
import ViewQuiltIcon from "@material-ui/icons/ViewQuilt";
import { Button } from "react-bootstrap";
import "../scss/RecipeDashboardButton.scss";

const RecipeDashboardButton = () => {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(true);
    return () => {
      console.log("End animation");
      setOpen(false);
    };
  }, []);

  return (
    <Button
      className={`recipeDashboard__button ${isOpen ? "open" : ""}`}
      variant="primary"
      onClick={() => {
        dispatch(toggleMenu(true));
      }}
    >
      <ViewQuiltIcon></ViewQuiltIcon>
    </Button>
  );
};

export default RecipeDashboardButton;
