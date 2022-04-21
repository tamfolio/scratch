import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import json from "../../store/geodata-small.json";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Modal,
  Label,
  Row,
  Spinner,
  UncontrolledDropdown,
} from "reactstrap";
import { FormClear, FormHandler } from "../../services/form";
import notEmpty from "../../services/objCheck";
import IconSearchBar from "../iconSearchBar";
import ReactCountryFlag from "react-country-flag";
import { graphql } from "../../services/axios";
import {
  login,
  otp,
  registerRequestNewOtp,
} from "../../store/graphql/onboading";
import { allAccountDispatch } from "../../store/actions/account";
import def from "../../services/enum";
import OTP from "./otp";

function Login({ viewClick, setModal, modal, auth, setAuth }) {
  const [loginType, setLoginType] = useState("email");
  const [formError, setFormError] = useState({});
  const formRef = useRef(null);
  const [confirm, setConfirm] = useState(false);
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [OTPModal, setOTPModal] = useState(false);
  const [country, setCountry] = useState(json[0]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.accountData);
  const http = useDispatch();

  useEffect(() => {
    if (user.loading === def.DONE) {
      setLoading(false);
      if (user.error) {
        if (user.errorMessage.toLowerCase() === def.CONFIRM_ACCOUNT) {
          setFormError({});
          setConfirm(true);
        } else {
          setFormError({
            error: true,
            errorMessage: `invalid ${
              loginType === "email" ? "Email" : "Phone number"
            } or Password`,
          });
        }
      } else {
        FormClear(formRef.current, ["email", "phone", "password"]);
        setFormError({});
        setModal();
      }
    }
  }, [user]);

  useEffect(() => {
    /////
  }, [auth]);

  useEffect(() => {
    formRef.current &&
      FormClear(formRef.current, ["email", "phone", "password"]);
    setFormError({});
    setConfirm(false);
  }, [modal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.current = e;
    const data = FormHandler(e, ["email", "phone", "password"], {
      rename: ["email", "phone"],
      to: "phoneNumberOrEmail",
    });
    setPhoneOrEmail(data.phoneNumberOrEmail);
    http(graphql(login, data, allAccountDispatch));
    setLoading(true);
  };

  const handleCountry = (obj) => {
    setCountry(obj);
  };

  const toggleConfirm = () => {
    setOTPModal(!OTPModal);
  };

  return (
    <>
      <Form className="form login" onSubmit={(e) => handleSubmit(e)}>
        <FormGroup>
          <Row>
            <Col md={12} className="label fx fx-justify-space">
              <Label htmlFor="email">
                {loginType === "email" ? "Email address" : "Phone number"}
              </Label>
              <span
                onClick={() =>
                  setLoginType((p) => (p === "email" ? "phone" : "email"))
                }
                className="text-orange pointer"
              >
                {loginType === "email" ? "or phone number" : "or email address"}
              </span>
            </Col>
            <Col md={12}>
              {loginType === "email" ? (
                <Input
                  block
                  required={true}
                  invalid={formError?.error}
                  name={loginType}
                  disabled={loading}
                  type={loginType}
                  id={loginType}
                  placeholder="e.g johndoe@gmail.com"
                />
              ) : (
                <div className="country fx">
                  <UncontrolledDropdown direction="right">
                    <DropdownToggle className="btn" caret>
                      <ReactCountryFlag countryCode={country.countryCode} svg />{" "}
                    </DropdownToggle>
                    <DropdownMenu className="country-menu">
                      {json.map((itm, i) => (
                        <DropdownItem
                          onClick={() =>
                            handleCountry({
                              name: itm.name,
                              countryCode: itm.countryCode,
                              phoneCode: itm.phoneCode,
                            })
                          }
                          key={i}
                          className="item"
                        >
                          <span className="flag">
                            <ReactCountryFlag
                              countryCode={itm.countryCode}
                              svg
                            />
                          </span>
                          <span className="nationality">{itm.name}</span>
                          <small className="code text-secondary">
                            {`+${itm.phoneCode}`}
                          </small>
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <Input
                    type="tel"
                    name="phone"
                    pattern="[\+][\d]{7,14}"
                    title="follow this patter (+0123456.......)"
                    key={country.name}
                    invalid={formError?.mobileNumber?.error}
                    required
                    defaultValue={`+${country.phoneCode || ""}`}
                    disabled={loading}
                    placeholder={`+${country.phoneCode}`}
                    block
                  />
                </div>
              )}
              <FormFeedback>{formError?.errorMessage}</FormFeedback>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col md={12}>
              <Label>Password</Label>
              <IconSearchBar
                icon="ri-eye-off-line"
                icon2="ri-eye-line"
                type="password"
                type2="text"
                minLength={6}
                required={true}
                name="password"
                disabled={loading}
                invalidText={formError?.errorMessage}
                invalid={formError?.error}
                iconChange={true}
                placeholder="****"
                inputClass="r"
                iconPosition="r"
              />
            </Col>
          </Row>
        </FormGroup>
        {confirm && (
          <div className="confirm-email pt-2 fx fx-align fx-justify-space">
            <span>Please confirm your account</span>
            <span
              onClick={toggleConfirm}
              className="px-2 call-to-action background-orange rounded pointer btn-effect"
            >
              confirm here
            </span>
          </div>
        )}
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
              <span className="mr-2">Login</span>
            </>
          )}
        </Button>
        <div className="text-center mt-3">
          <span
            onClick={() => viewClick(def.FORGOT_PASSWORD_VIEW)}
            className="forgot-password pointer"
          >
            Forgot password?
          </span>
        </div>
      </Form>
      <Modal
        isOpen={OTPModal}
        centered
        backdropClassName="onboading-backdrop"
        size="sm"
        toggle={toggleConfirm}
      >
        <div className="onboarding dashboard">
          <span
            className="close-button pointer"
            onClick={() => toggleConfirm()}
          >
            <i className="ri-close-circle-fill"></i>
          </span>
          <div className="view py-4 mx-3">
            <OTP
              phoneNumberOrEmail={phoneOrEmail}
              onTopLogin={toggleConfirm}
              query={otp}
              renew_query={registerRequestNewOtp}
              closeFirstModal={setModal}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Login;
