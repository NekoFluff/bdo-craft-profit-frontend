import { ProfitCalculator } from "bdo-shopping-cart-package";
import React, { useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";

import RecipesSidebarTotalProfitAccordion from "./RecipesSidebarTotalProfitAccordion";
import RecipesSidebarUserInputAccordion from "./RecipesSidebarUserInputAccordion";

export type SidebarProps = {
  onUpdateCraftCount: (newCraftCount) => void;
  onUpdateValuePack: (valuePackEnabled) => void;
  onMarketPriceChange: (newMarketPrice) => void;
} & RouteComponentProps;

const Sidebar: React.FC<SidebarProps> = (props) => {
  useEffect(() => {
    ProfitCalculator.valuePackEnabled = true;
  }, []);

  // const onUpdateOptimizerChoice = (e) => {};

  // const onUpdateBuffs = (e) => {};

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  // const renderBuffsInput = () => {
  //   return (
  //     <Form onSubmit={handleSubmit}>
  //       <InputGroup className="mb-3">
  //         <InputGroup.Prepend>
  //           <InputGroup.Text id="basic-addon2">
  //             Cooking Time Reduction
  //           </InputGroup.Text>
  //         </InputGroup.Prepend>
  //         <FormControl
  //           placeholder="Recipient's username"
  //           aria-label="Recipient's username"
  //           aria-describedby="basic-addon2"
  //         />
  //       </InputGroup>
  //     </Form>
  //   );
  // };

  return (
    /**
     * Input Types:
     * One of the two are necessary:
     * - How many you want to make
     * - How much silver you have
     *
     * Switch between the three different types of calculations.
     * For now only enable PPH (price per hour) calculations.
     * Disable the other two possible buttons on the switch
     *
     * Applied Buffs
     */
    <React.Fragment>
      <RecipesSidebarTotalProfitAccordion {...props} />
      <br></br>
      <RecipesSidebarUserInputAccordion {...props} />
    </React.Fragment>
  );
};

const RecipesSidebar = withRouter(Sidebar);
export default RecipesSidebar;
