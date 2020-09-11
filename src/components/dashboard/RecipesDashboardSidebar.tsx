import CloseIcon from "@material-ui/icons/Close";
// Other packages
import React from "react";
import { withRouter } from "react-router";

// My components
import Menu from "../common/Menu";
import RecipesSidebar, { SidebarProps } from "./RecipesSidebar";

// scss
import "../../scss/RecipesDashboardSidebar.scss";

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

export default withRouter(RecipesDashboardSidebar);
