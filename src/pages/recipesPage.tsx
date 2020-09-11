// Other packages
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router";
import { action as toggleMenu } from "redux-burger-menu";
import { setCostValues, setTimeValues } from "../helpers/parseItemFromRedux";
import BackgroundImage from "../images/webb.png";

// My components
import RecipesDashboard from "./../components/RecipesDashboard";
import PageTransition from "../components/PageTransition";
import ParallaxBackground from "../components/ParallaxBackground";
import PullUpTab from "../components/Charts/PullUpTab";

const RecipesPage = (props) => {
  const [product, setProduct] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setProduct(props.match.params.item);
    dispatch(toggleMenu(true));

    return () => {
      dispatch(toggleMenu(false));
    };
  }, [dispatch, props.match.params.item]);

  return (
    <PageTransition>
      <ParallaxBackground
        backgroundRepeat
        backgroundImage={`url(${BackgroundImage})`}
      >
        <PullUpTab />

        <Container fluid id="outer-container">
          <RecipesDashboard product={product} />
        </Container>
      </ParallaxBackground>
    </PageTransition>
  );
};
export default withRouter(RecipesPage);
