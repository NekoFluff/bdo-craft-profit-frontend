import { useMediaQuery } from "@material-ui/core";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";

import ParallaxBackground from "../components/background/ParallaxBackground";
import EmailVerificationButton from "../components/common/EmailVerificationButton";
import useQuery from "../components/hooks/useQuery";
import { USER_ENDPOINT } from "../helpers/CONSTANTS";
import BackgroundImage from "../images/webb.png";
import CommonPage from "./commonPage";

import jwt from "jwt-decode";

type EmailVerificationPageProps = {};

const EmailVerificationPage: React.FC<EmailVerificationPageProps> = (props) => {
  const query = useQuery();
  const tokenString = query.get("token");
  const tokenObj = jwt(tokenString);
  const [verificationResult, setVerificationResult] = useState(
    "Email is being verified [insert loading circle]... Please wait a moment"
  );

  useEffect(() => {
    const verifyToken = async (token) => {
      try {
        // Get the data
        const { data: result } = await axios.post(
          USER_ENDPOINT + "/verificationToken?token=" + token
        );
        // console.log("Verification Result:", result);
        setVerificationResult(result);
      } catch (e) {
        console.log(e);
      }
    };
    verifyToken(tokenString);
  }, []);

  return (
    <CommonPage>
      <ParallaxBackground
        backgroundRepeat
        backgroundImage={`url(${BackgroundImage})`}
      >
        <Container
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
        </Container>
      </ParallaxBackground>
    </CommonPage>
  );
};

export default EmailVerificationPage;
