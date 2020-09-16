import React from "react";
import { Container, Row } from "react-bootstrap";

import ParallaxBackground from "../components/background/ParallaxBackground";
import NewPasswordForm from "../components/userForms/NewPasswordForm";
import BackgroundImage from "../images/bg1.png";
import CommonPage from "./commonPage";

type ResetPasswordPageProps = {};

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = (props) => {
  return (
    <CommonPage>
      <ParallaxBackground
        backgroundRepeat
        backgroundImage={`url(${BackgroundImage})`}
      >
        <Container className="h-100">
          <Row className="h-100 justify-content-center align-items-center">
            <div
              className="col-12 col-md-9 col-lg-6"
              style={{ textAlign: "center" }}
            >
              <NewPasswordForm />
            </div>
          </Row>
        </Container>

        {/* <Container
          fluid
          style={{
            // marginTop: "5%",
            display: "flex",
            justifyContent: "center",
            height: "95%",
          }}
        >
          <Row
            className="justify-content-around"
            style={{ textAlign: "center", flexDirection: "column" }}
          >
            <div
              style={{
                fontFamily: "Bebas Neue",
                fontSize: "3rem",
              }}
            >
              {verificationResult}
            </div>
            {verificationResult.includes("Email verified") && (
              <>
                <div>
                  <h5>Welcome to the party.</h5>
                  <h5> Let's start making some profit!</h5>
                </div>
                <Button variant="primary">
                  <NavLink
                    to="/"
                    className="menu-item navbar-brand"
                    exact
                    style={{
                      margin: "0px",
                      fontSize: "1.25em",
                      color: "white",
                    }}
                  >
                    Return Home
                  </NavLink>
                </Button>
              </>
            )}
            {verificationResult.includes("Invalid token") && (
              <EmailVerificationButton
                email={tokenObj.email}
                onSuccess={(result: string) => {
                  setVerificationResult(result);
                }}
                onFailure={(error: Error) => {
                  setVerificationResult(error.message);
                }}
              />
            )}
            <br />
          </Row>
        </Container> */}
      </ParallaxBackground>
    </CommonPage>
  );
};

export default ResetPasswordPage;
