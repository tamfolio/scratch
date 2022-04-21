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
  Row,
  Spinner,
  UncontrolledDropdown,
} from "reactstrap";
import { graphql } from "../../services/axios";
import { FormError, FormHandler } from "../../services/form";
import {
  otp,
  register,
  registerRequestNewOtp,
  validateRegisterFormOne,
  validateRegisterFormTwo,
} from "../../store/graphql/onboading";
import IconSearchBar from "../iconSearchBar";
import def from "../../services/enum";
import json from "../../store/geodata-small.json";
import OTP from "./otp";

let globalFormData = {};
function Register({ setModal, setCongrat, registerScreen, takeTo }) {
  const [screen, setScreen] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState({});
  const [country, setCountry] = useState(json || []);
  const [states, setStates] = useState(json[0].states || []);
  const [countrySelected, setCountrySelected] = useState(json[0] || []);

  useEffect(() => {
    setScreen(1);
  }, [registerScreen]);

  const handleCountry = (obj) => {
    setCountrySelected(obj);
  };

  const nextScreen = (val) => {
    setScreen(val);
    if (val === 4) {
      setCongrat(true);
      setTimeout(() => {
        setModal && setModal(def.LOGIN_VIEW);
      }, 1500);
    }
  };

  const handleSubmit = (e, scr) => {
    const data = FormHandler(e, [
      "email",
      "username",
      "firstName",
      "lastName",
      "dateOfBirth",
      "gender",
      "state",
      "country",
      "password",
      "role",
      "mobileNumber",
    ]);
    globalFormData = { ...globalFormData, ...data };
    // return console.log(data);
    handleRequest(data, scr);
  };

  const handleRequest = async (data, scr) => {
    if (scr === 1) {
      commonRequest(validateRegisterFormOne, data, 2);
    } else if (scr === 2) {
      const error = await commonRequest(validateRegisterFormTwo, data, 3, true);
      if (!error) {
        commonRequest(register, globalFormData, 3);
      }
    } else if (scr === 3) {
      //handle otp submission and error handling here
      // then nextScreen(4)
    } else {
      //setTimout to close modal here
      //reset register screen to 1 here
    }
  };

  const commonRequest = async (query, data, screen, get = false) => {
    setLoading(true);
    const formD = await graphql(query, data)();
    console.log(formD);
    !get && setLoading(false);
    if (formD.error) {
      setFormError(FormError(formD));
    } else {
      return get ? formD.error : nextScreen(screen);
    }
  };

  const changeCountry = (index) => {
    const optValue = index.target.value;
    const findInx = json.findIndex((itm) => itm.name === optValue);
    setStates(json[findInx].states);
  };

  const complete = () => {
    setCongrat(true);
    setScreen(4);
    setTimeout(() => {
      takeTo(def.LOGIN_VIEW);
    }, 3500);
  };

  const screenOne = (
    <Form className="form login" onSubmit={(e) => handleSubmit(e, 1)}>
      <FormGroup>
        <div className="row">
          <div className="form-group col-6">
            <Label className="required">First name</Label>
            <Input
              type="text"
              name="firstName"
              required
              disabled={loading}
              invalid={formError?.firstName?.error}
              className="form-control"
              placeholder="Your first name"
            />
            <FormFeedback>{formError?.firstName?.errorMessage}</FormFeedback>
            {/* <FormFeedback>Name is already taken!</FormFeedback> */}
          </div>
          <div className="form-group col-6">
            <Label className="required">Last name</Label>
            <Input
              type="text"
              name="lastName"
              required
              disabled={loading}
              invalid={formError?.lastName?.error}
              className="form-control"
              placeholder="Your last name"
            />
            <FormFeedback>{formError?.lastName?.errorMessage}</FormFeedback>
          </div>
        </div>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col md={12} className='mt-n3'>
            <Label className="required">Email address</Label>
            <Input
              block
              invalid={formError?.email?.error}
              type="email"
              disabled={loading}
              required
              name="email"
              placeholder="e.g johndoe@gmail.com"
            />
            <FormFeedback>{formError?.email?.errorMessage}</FormFeedback>
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col>
            <Label className="required">Phone number</Label>
            <div className="fx">
              <div className="country">
                <UncontrolledDropdown direction="right">
                  <DropdownToggle className="btn" caret>
                    <ReactCountryFlag
                      countryCode={country[0].countryCode}
                      svg
                    />{" "}
                  </DropdownToggle>
                  <DropdownMenu className="country-menu">
                    {country.map((itm, i) => (
                      <DropdownItem
                        onClick={() => handleCountry(itm)}
                        key={i}
                        className="item"
                      >
                        <span className="flag">
                          <ReactCountryFlag countryCode={itm.countryCode} svg />
                        </span>
                        <span className="nationality">{itm.name}</span>
                        <small className="code text-secondary">
                          {`+${itm.phoneCode}`}
                        </small>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
              <div className="number" style={{ width: "100%" }}>
                <Input
                  type="tel"
                  name="mobileNumber"
                  key={countrySelected.name}
                  invalid={formError?.mobileNumber?.error}
                  required
                  defaultValue={`+${countrySelected.phoneCode || ""}`}
                  disabled={loading}
                  placeholder={`+${countrySelected.phoneCode}`}
                  block
                />
                <FormFeedback>
                  {formError?.mobileNumber?.errorMessage}
                </FormFeedback>
              </div>
            </div>
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
            <span className="mr-2">Next</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </>
        )}
      </Button>
    </Form>
  );

  const screenTwo = (
    <Form className="form login" onSubmit={(e) => handleSubmit(e, 2)}>
      <FormGroup>
        <Row>
          <Col md={12}>
            <Label>Username</Label>
            <Input
              name="username"
              required
              disabled={loading}
              invalid={formError?.username?.error}
              placeholder="e.g johndoe_7"
            />
            <FormFeedback>{formError?.username?.errorMessage}</FormFeedback>
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col md={6}>
            <Label>Gender</Label>
            <Input
              disabled={loading}
              required
              name="gender"
              invalid={formError?.gender?.error}
              type="select"
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </Input>
            <FormFeedback>{formError?.gender?.errorMessage}</FormFeedback>
          </Col>
          <Col md={6}>
            <Label>Date of birth</Label>
            <Input
              required
              name="dateOfBirth"
              disabled={loading}
              invalid={formError?.dateOfBirth?.error}
              type="date"
            />
            <FormFeedback>{formError?.dateOfBirth?.errorMessage}</FormFeedback>
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col md={6}>
            <Label>Country</Label>
            <Input
              onChange={(e) => changeCountry(e)}
              disabled={loading}
              required
              name="country"
              type="select"
            >
              <option value="" hidden>
                Select
              </option>
              {country.map((item, idx) => (
                <option key={idx} value={item.name}>
                  {item.name}
                </option>
              ))}
            </Input>
          </Col>
          <Col md={6}>
            <Label>State</Label>
            <Input disabled={loading} required name="state" type="select">
              <option value="" hidden>
                Select
              </option>
              {states.map((item, i) => (
                <option key={i} value={item.name}>
                  {item.name}
                </option>
              ))}
            </Input>
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
              required
              name="password"
              disabled={loading}
              type2="text"
              invalidText={formError?.password?.errorMessage}
              invalid={formError?.password?.error}
              iconChange={true}
              placeholder="****"
              inputClass="r"
              iconPosition="r"
            />
          </Col>
        </Row>
      </FormGroup>
      <div>
        <div className="custom-control custom-checkbox">
          <Input
            type="checkbox"
            disabled={loading}
            required
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
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
      </div>{" "}
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
            <span className="mr-2">Register</span>
          </>
        )}
      </Button>
    </Form>
  );

  const screenThree = (
    <OTP
      query={otp}
      renew_query={registerRequestNewOtp}
      phoneNumberOrEmail={globalFormData.email}
      registerComplete={complete}
    />
  );

  const screenFour = (
    <div className="congrat">
      <img src="/assets/checkmark2.gif" alt="" />
      <h6 className="text-center mt-5">
        Your account has been created successfully!
      </h6>
    </div>
  );

  return screen === 1
    ? screenOne
    : screen === 2
    ? screenTwo
    : screen === 3
    ? screenThree
    : screenFour;
}

export default Register;
