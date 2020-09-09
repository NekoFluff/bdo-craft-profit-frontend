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
import ChartWithDimensions from "../components/ChartWithDimensions";
import PageTransition from "../components/PageTransition";
import ParallaxBackground from "../components/ParallaxBackground";

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
        <Container fluid id="outer-container">
          <Container
            fluid
            className="d-flex align-items-center align-content-center justify-content-center"
          >
            {/* <ChartWithDimensions
            chartSettings={{
              width: "1500",
              height: "900",
              marginTop: "150",
              marginRight: "150",
              marginBottom: "150",
              marginLeft: "150",
            }}
            setValues={setCostValues}
          /> */}
          </Container>
          <Container
            fluid
            className="d-flex align-items-center align-content-center justify-content-center"
          >
            {/* <ChartWithDimensions
            chartSettings={{
              width: "1500",
              height: "900",
              marginTop: "150",
              marginRight: "150",
              marginBottom: "150",
              marginLeft: "150",
            }}
            setValues={setTimeValues}
          /> */}
          </Container>

          <RecipesDashboard product={product} setProduct={setProduct} />
        </Container>
      </ParallaxBackground>
    </PageTransition>
  );
};
export default withRouter(RecipesPage);
