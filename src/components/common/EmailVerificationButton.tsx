import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { USER_ENDPOINT } from "../../helpers/CONSTANTS";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/user";

type EmailVerificationButtonProps = {
  onSuccess: (result: string) => void;
  onFailure: (result: Error) => void;
  email: string;
};

const EmailVerificationButton: React.FC<EmailVerificationButtonProps> = (
  props
) => {
  return (
    <Button
      variant="primary"
      onClick={async () => {
        try {
          // Get the data
          const { data: result } = await axios.post(
            USER_ENDPOINT + "/verificationToken",
            {
              email: props.email,
            }
          );
          // console.log("New Verification Token Result:", result);
          props.onSuccess(result);
        } catch (e) {
          // console.log("[FAIL] New Verification Token Result:", e);
          props.onFailure(e);
        }
      }}
    >
      Re-send Email Verification
    </Button>
  );
};

export default EmailVerificationButton;
