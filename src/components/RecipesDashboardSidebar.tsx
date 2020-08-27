// scss
import "../scss/RecipesDashboardSidebar.scss";

// Other packages
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import CloseIcon from "@material-ui/icons/Close";

// My components
import Menu from "./Menu";
import RecipesSidebar, { SidebarProps } from "./RecipesSidebar";

const RecipesDashboardSidebar: React.FC<SidebarProps> = (props) => {
  return (
    <Menu
      right
      noOverlay
      width={"100%"}
      customBurgerIcon={false}
      customCrossIcon={<CloseIcon />}
      pageWrapId={"page-wrap"}
      outerContainerId={"outer-container"}
    >
      <RecipesSidebar {...props} />
    </Menu>
  );
};

// RecipesDashboardSidebar.propTypes = {};

export default withRouter(RecipesDashboardSidebar);
