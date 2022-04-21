import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
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
import def from "../../services/enum";
import { FormData, FormHandler } from "../../services/form";
import {
  forgotPassword,
  forgotPasswordEmail,
  forgotPasswordOtp,
  newPassword,
} from "../../store/graphql/onboading";
import IconSearchBar from "../iconSearchBar";
import OTP from "./otp";

let globalFormData = {};
function ForgotPassword({ takeTo, forgotScreen, setModal, setCongrat }) {
  const [screen, setScreen] = useState(1);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [pattern, setPattern] = useState(null);
  const [formError, setFormError] = useState({});

  useEffect(() => {
    // setScreen(forgotScreen);
  }, [forgotScreen]);

  const nextScreen = (val) => {
    setScreen(val);
    if (val === 4) {
      setCongrat(true);
      setTimeout(() => {
        takeTo && takeTo(def.LOGIN_VIEW);
      }, 1500);
    }
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    const data = FormHandler(e, ["email", "password"], {
      rename: ["email"],
      to: "phoneNumberOrEmail",
    });
    globalFormData = { ...globalFormData, ...data };
    if (type === def.FORGOT_PASS_EMAIL) {
      commonRequest(forgotPasswordEmail, globalFormData, 2);
      setEmail(globalFormData.email);
    } else if (type === def.FORGOT_PASS_NEW_PASS) {
      commonRequest(newPassword, globalFormData, 4);
    }
  };

  const commonRequest = async (query, data, scr) => {
    const res = await graphql(query, data)();
    if (res.error) {
      setFormError(res);
    } else {
      if (scr === 4) {
        setCongrat(true);
        setScreen(4);
        setTimeout(() => {
          takeTo(def.LOGIN_VIEW);
        }, 3500);
      } else {
        nextScreen(scr);
      }
    }
  };

  const otpComplete = () => {
    nextScreen(3);
  };

  const screenOne = (
    <Form
      className="form login"
      onSubmit={(e) => handleSubmit(e, def.FORGOT_PASS_EMAIL)}
    >
      <FormGroup>
        <Row>
          <Col md={12} className="label fx fx-justify-space">
            <Label>Email address</Label>
          </Col>
          <Col md={12}>
            <Input
              block
              required
              disabled={loading}
              invalid={formError?.error}
              type="email"
              name="email"
              placeholder="e.g johndoe@gmail.com"
            />
            <FormFeedback>{formError?.errorMessage}</FormFeedback>
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

  const screenTwo = (
    <OTP
      email={email}
      renew_query={forgotPassword}
      phoneNumberOrEmail={globalFormData.email}
      query={forgotPasswordOtp}
      onTopLogin={otpComplete}
    />
  );

  const screenThree = (
    <Form
      className="form login"
      onSubmit={(e) => handleSubmit(e, def.FORGOT_PASS_NEW_PASS)}
    >
      <FormGroup>
        <Row>
          <Col md={12}>
            <Label>New password</Label>
            <IconSearchBar
              icon="ri-eye-off-line"
              icon2="ri-eye-line"
              type="password"
              minLength={6}
              onChange={(e) => setPattern(e.target.value)}
              type2="text"
              required={true}
              name="password"
              invalid={formError?.error}
              invalidText={formError?.errorMessage}
              iconChange={true}
              placeholder="****"
              inputClass="r"
              iconPosition="r"
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col md={12}>
            <Label>Retype password</Label>
            <IconSearchBar
              icon="ri-eye-off-line"
              icon2="ri-eye-line"
              type="password"
              type2="text"
              pattern={pattern}
              minLength={6}
              title="Please match the password above"
              required={true}
              name="retype_password"
              invalid={formError?.error}
              invalidText={formError?.errorMessage}
              iconChange={true}
              placeholder="****"
              inputClass="r"
              iconPosition="r"
            />
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

  const screenFour = (
    <div className="congrat">
      <img src="/assets/checkmark2.gif" alt="" />
      <h6 className="text-center mt-5">
        Your account password has been changed successfully!
      </h6>
    </div>
  );

  return (
    <>
      {screen === 1
        ? screenOne
        : screen === 2
        ? screenTwo
        : screen === 3
        ? screenThree
        : screenFour}
    </>
  );
}

export default ForgotPassword;
