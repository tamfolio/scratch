import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import { graphql } from "../../services/axios";
import { FormHandler } from "../../services/form";
import { otp } from "../../store/graphql/onboading";

function OTP({
  query,
  renew_query,
  onTopLogin,
  phoneNumberOrEmail,
  closeFirstModal,
  registerComplete,
}) {
  const [resend, setresend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneOrEmail, setPhoneOrEmail] = useState(phoneNumberOrEmail);
  const [formError, setFormError] = useState({});

  useEffect(() => {
    setPhoneOrEmail(phoneNumberOrEmail);
  }, [phoneNumberOrEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = FormHandler(e, ["otp"]);
    data.phoneNumberOrEmail = phoneOrEmail;
    const boxData = await graphql(query, data)();
    setLoading(false);
    if (boxData.error) {
      setFormError(boxData);
    } else {
      registerComplete && registerComplete();
      onTopLogin && onTopLogin();
    }
  };

  const resendOTP = async () => {
    setTimeout(() => {
      setresend(true);
      setTimeout(() => {
        setresend(false);
      }, 3000);
    }, 500);
    await graphql(renew_query, {
      phoneNumberOrEmail: phoneOrEmail,
    })();
  };

  return (
    <Form className="form login" onSubmit={(e) => handleSubmit(e)}>
      <FormGroup>
        <FormGroup>
          <Row>
            <Col md={12}>
              <h4>Email code</h4>
              <p className="text-grey my-1">
                <small>A 6-digit code has been sent to your mail box</small>
              </p>
            </Col>
          </Row>
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col>
            <Label>Enter OTP</Label>
            <Input
              required={true}
              type="text"
              invalid={formError?.error}
              name="otp"
              block
              disabled={loading}
              placeholder="OTP"
            />
            <FormFeedback>{formError?.errorMessage}</FormFeedback>
            <p className="text-right">
              <small onClick={resendOTP} className="text-grey pointer">
                {resend ? "Check your mail box..." : "Resend OTP?"}
              </small>
            </p>
          </Col>
        </Row>
      </FormGroup>
      <br />
      <Button
        className="text-white text-center submit-button"
        block
        disabled={loading}
        type="submit"
      >
        {loading ? (
          <>
            <Spinner size="sm"> </Spinner>
          </>
        ) : (
          <>
            <span className="mr-2">Continue</span>
          </>
        )}
      </Button>
    </Form>
  );
}

export default OTP;
