import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
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
  Label,
  Modal,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import IconSearchBar from "./iconSearchBar";

function Onboarding({ setAuth, screen, modal, toggle }) {
  const [OModal, setOModal] = useState(modal);
  const [country, setCountry] = useState({
    name: "Canada",
    code: "CA",
    dial: "+1",
  });
  const [registerScreen, setRegisterScreen] = useState(1);
  const [forgotScreen, setForgotScreen] = useState(1);
  const [view, setView] = useState(screen);
  const [emailLogin, setEmailLogin] = useState(true);

  useEffect(() => {
    setOModal(modal);
    setView(screen);
    setRegisterScreen(1);
    setForgotScreen(1);
  }, [screen, modal]);

  const viewClick = (val) => {
    setView(val);
    setRegisterScreen(1);
    setForgotScreen(1);
  };

  const tryNexting = () => {
    if (view === "register") {
      if (registerScreen === 1) {
        setRegisterScreen(2);
      } else if (registerScreen === 2) {
        setRegisterScreen(3);
      } else if (registerScreen === 3) {
        setRegisterScreen(4);
        // taking back to default submit & reload
        setTimeout(() => {
          setAuth(true);
          setOModal(false);
          setRegisterScreen(1);
        }, 1500);
      }
    } else if (view === "forgot") {
      if (forgotScreen === 1) {
        setForgotScreen(2);
      } else if (forgotScreen === 2) {
        setForgotScreen(3);
      } else if (forgotScreen === 3) {
        setForgotScreen(4);
        // taking back to default submit & reload
        setTimeout(() => {
          setAuth(true);
          setOModal(false);
          setForgotScreen(1);
        }, 1500);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuth(true);
    setOModal(false);
  };

  const handleCountry = (obj) => {
    setCountry(obj);
  };

  return (
    <Modal
      isOpen={OModal}
      centered
      backdropClassName="onboading-backdrop"
      size="lg"
      toggle={toggle}
    >
      <div className="onboarding dashboard">
        <span className="close-button pointer" onClick={() => toggle()}>
          <i className="ri-close-circle-fill"></i>
        </span>
        <div className="view fx fx-align">
          <div className="left">
            <img src="/assets/onboarding.png" alt="" />
          </div>
          <div className="right">
            {(view === "register" && registerScreen === 4) ||
            (view === "forgot" && forgotScreen === 4) ? (
              <div className="congrat">
                <img src="/assets/checkmark2.gif" alt="" />
                <h6 className="text-center mt-5">
                  Your account {view === "forgot" && "password"} has been
                  successfully {view === "forgot" ? "changed" : "created"}.
                </h6>
              </div>
            ) : (
              <>
                <div className="logo text-center mb-4">
                  <img src="/assets/logo.png" />
                </div>
                <div className="text-center mb-3">
                  <div className="toggle mb-3">
                    <span
                      onClick={() => viewClick("login")}
                      className={["login", "forgot"].includes(view) && "active"}
                    >
                      Login
                    </span>
                    <span
                      onClick={() => viewClick("register")}
                      className={view === "register" && "active"}
                    >
                      Register
                    </span>
                  </div>
                </div>
              </>
            )}
            <Form className="form login" onSubmit={handleSubmit}>
              {view === "register" && registerScreen === 1 ? (
                <FormGroup>
                  <Row>
                    <Col md={6}>
                      <Label>First name</Label>
                      <Input
                        invalid={true}
                        className=""
                        placeholder="Your first name"
                      />
                      <FormFeedback>Name is already taken!</FormFeedback>
                    </Col>
                    <Col md={6}>
                      <Label>Last name</Label>
                      <Input
                        invalid={false}
                        className=""
                        placeholder="Your last name"
                      />
                      <FormFeedback>Name is already here!</FormFeedback>
                    </Col>
                  </Row>
                </FormGroup>
              ) : (
                ""
              )}

              {(view === "forgot" && forgotScreen === 2) ||
              (view === "register" && registerScreen === 3) ? (
                <>
                  <FormGroup>
                    <Row>
                      <Col md={12}>
                        <h4>Email code</h4>
                        <p className="text-grey my-1">
                          <small>
                            A 6-digit code has been sent to your email address
                          </small>
                        </p>
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <Col>
                        <Label>Enter OTP</Label>
                        <Input placeholder="OTP" invalid={true} />
                        <p className="text-right">
                          <small className="text-grey">Resend in 9s</small>
                        </p>
                        <FormFeedback>OTP is invalid, try again!</FormFeedback>
                      </Col>
                    </Row>
                  </FormGroup>
                </>
              ) : (
                ""
              )}

              {["login", "register", "forgot"].includes(view) &&
              registerScreen === 1 &&
              forgotScreen === 1 ? (
                <FormGroup>
                  <Row>
                    <Col md={12} className="label fx fx-justify-space">
                      <Label htmlFor="email">
                        {emailLogin ? "Email address" : "Phone number"}
                      </Label>
                      {view === "login" && (
                        <span
                          onClick={() => setEmailLogin(!emailLogin)}
                          className="text-orange pointer"
                        >
                          {emailLogin ? "or phone number" : "or email address"}
                        </span>
                      )}
                    </Col>
                    <Col md={12}>
                      <Input
                        block
                        invalid={true}
                        type={emailLogin ? "email" : "tel"}
                        id={emailLogin ? "email" : "phone"}
                        placeholder={
                          emailLogin ? "e.g johndoe@gmail.com" : "+234"
                        }
                      />
                      <FormFeedback>Email is invalid, try again!</FormFeedback>
                    </Col>
                  </Row>
                </FormGroup>
              ) : (
                ""
              )}

              {view === "register" && registerScreen === 2 ? (
                <FormGroup>
                  <Row>
                    <Col md={12}>
                      <Label>Username</Label>
                      <Input invalid={true} placeholder="e.g johndoe_7" />
                      <FormFeedback>
                        Username is invalid, try again!
                      </FormFeedback>
                    </Col>
                  </Row>
                </FormGroup>
              ) : (
                ""
              )}

              {view === "register" && registerScreen === 2 ? (
                <>
                  <FormGroup>
                    <Row>
                      <Col md={6}>
                        <Label>Gender</Label>
                        <Input invalid={true} className="" type="select">
                          <option value="">Male</option>
                          <option value="">Female</option>
                        </Input>
                        <FormFeedback>This is invalid, try again!</FormFeedback>
                      </Col>
                      <Col md={6}>
                        <Label>Date of birth</Label>
                        <Input invalid={false} type="date" />
                        <FormFeedback>This is invalid, try again!</FormFeedback>
                      </Col>
                    </Row>
                  </FormGroup>

                  <FormGroup>
                    <Row>
                      <Col md={12}>
                        <Label>State</Label>
                        <Input className="" type="select">
                          <option value="">Abuja</option>
                          <option value="">Ibadan</option>
                          <option value="">Lagos</option>
                        </Input>
                      </Col>
                    </Row>
                  </FormGroup>
                </>
              ) : (
                ""
              )}

              {view === "register" && registerScreen === 1 ? (
                <FormGroup>
                  <Row>
                    <Col>
                      <Label>Phone number</Label>
                      <div className="fx">
                        <div className="country">
                          <UncontrolledDropdown direction="right">
                            <DropdownToggle className="btn" caret>
                              <ReactCountryFlag
                                countryCode={country.code}
                                svg
                              />{" "}
                            </DropdownToggle>
                            <DropdownMenu className="country-menu">
                              {[
                                { name: "Canada", code: "CA", dial: "+1" },
                                { name: "France", code: "FR", dial: "+33" },
                                { name: "Ghana", code: "GH", dial: "" },
                                { name: "Italy", code: "IT", dial: "+233" },
                                { name: "Japan", code: "JP", dial: "+81" },
                                { name: "Nigeria", code: "NG", dial: "+234" },
                                {
                                  name: "United State",
                                  code: "US",
                                  dial: "+1",
                                },
                              ].map((itm, i) => (
                                <DropdownItem
                                  onClick={() => handleCountry(itm)}
                                  key={i}
                                  className="item"
                                >
                                  <span className="flag">
                                    <ReactCountryFlag
                                      countryCode={itm.code}
                                      svg
                                    />
                                  </span>
                                  <span className="nationality">
                                    {itm.name}
                                  </span>
                                  <small className="code text-secondary">
                                    {itm.dial}
                                  </small>
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                        <div className="number" style={{ width: "100%" }}>
                          <Input
                            invalid={false}
                            placeholder={country.dial}
                            block
                          />
                          <FormFeedback>
                            This is invalid, try again!
                          </FormFeedback>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
              ) : (
                ""
              )}

              {view === "login" ||
              registerScreen === 2 ||
              (view === "forgot" && forgotScreen === 3) ? (
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label>
                        {forgotScreen === 3 ? "New password" : "Password"}
                      </Label>
                      <IconSearchBar
                        icon="ri-eye-off-line"
                        icon2="ri-eye-line"
                        type="password"
                        type2="text"
                        invalid={false}
                        iconChange={true}
                        placeholder="****"
                        inputClass="r"
                        iconPosition="r"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              ) : (
                ""
              )}

              {view === "forgot" && forgotScreen === 3 ? (
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label>Retype password</Label>
                      <IconSearchBar
                        icon="ri-eye-off-line"
                        icon2="ri-eye-line"
                        type="password"
                        type2="text"
                        invalid={true}
                        invalidText="this is invalid, try again!"
                        iconChange={true}
                        placeholder="****"
                        inputClass="r"
                        iconPosition="r"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              ) : (
                ""
              )}
              {registerScreen === 2 && (
                <div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck1"
                    >
                      I have read and I agree with BetaScratch{" "}
                      <a href="#" className="text-orange pointer">
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-orange pointer">
                        Terms & Conditions.
                      </a>
                    </label>
                  </div>
                </div>
              )}
              <br />
              {(view === "register" && registerScreen === 4) ||
              (view === "forgot" && forgotScreen === 4) ? (
                ""
              ) : (
                <Button
                  color="warning"
                  type={
                    (view === "register" || view === "forgot") &&
                    (registerScreen === 2 ||
                      registerScreen === 3 ||
                      registerScreen === 4 ||
                      forgotScreen === 1 ||
                      forgotScreen === 2 ||
                      forgotScreen === 3 ||
                      forgotScreen === 4)
                      ? "button"
                      : "submit"
                  }
                  onClick={() => tryNexting()}
                  className="text-white text-center background-orange"
                  block
                >
                  {view === "forgot" ? (
                    "Continue"
                  ) : view === "login" ? (
                    "Login"
                  ) : registerScreen === 3 ? (
                    "Register"
                  ) : (
                    <>
                      <span className="mr-2">Next</span>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </>
                  )}
                </Button>
              )}
              {view === "login" && (
                <div className="text-center mt-3">
                  <span
                    onClick={() => setView("forgot")}
                    className="forgot-password pointer"
                  >
                    Forgot password?
                  </span>
                </div>
              )}
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Onboarding;
