import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import SearchBar from "../components/SearchBar";
import RecipesDashboard from "../components/RecipesDashboard";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router";
import { action as toggleMenu } from "redux-burger-menu";
import RecipeDashboardButton from "../components/RecipeDashboardButton";

const RecipesPage = (props) => {
  const [product, setProduct] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setProduct(props.match.params.item);
    return () => {
      dispatch(toggleMenu(false));
    };
  }, []);

  useEffect(() => {
    setProduct(props.match.params.item);
  }, [props.location]);

  return (
    <Container fluid>
      {/* <Row> */}
      <RecipeDashboardButton />

      <div className="p-3" style={{ textAlign: "center" }}>
        <SearchBar
          onSearch={(newProduct) => {
            setProduct(newProduct);
          }}
        />
      </div>
      {/* </Row> */}
      <RecipesDashboard product={product} />
    </Container>
  );
};
export default withRouter(RecipesPage);
