// Other packages
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router";
import { action as toggleMenu } from "redux-burger-menu";

import ParallaxBackground from "../components/background/ParallaxBackground";
import PageTransition from "../components/common/PageTransition";
// My components
import RecipesDashboard from "../components/dashboard/RecipesDashboard";
import PullUpTab from "../components/graphs/PullUpTab";
import { setCostValues, setTimeValues } from "../helpers/parseItemFromRedux";
import BackgroundImage from "../images/webb.png";

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
        <Container
          fluid
          id="outer-container"
          style={{ margin: 0, padding: 0, height: "100%" }}
        >
          <RecipesDashboard product={product} />
        </Container>
      </ParallaxBackground>
    </PageTransition>
  );
};
export default withRouter(RecipesPage);
