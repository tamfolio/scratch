import { faFlagUsa } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import json from "../../store/geodata-small.json";
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
  UncontrolledDropdown,
} from "reactstrap";
import ReactCountryFlag from "react-country-flag";

function Personal({ data, error }) {
  const [account, setAccount] = useState(data);
  const [randKey, setRandKey] = useState(
    Array(9)
      .fill(0)
      .map((itm, i) => i)
  );
  const [accountError, setAccountError] = useState(error);
  const [country, setCountry] = useState(json || []);
  const [states, setStates] = useState(json[0].states || []);
  const [countrySelected, setCountrySelected] = useState(json[0] || []);

  useEffect(() => {
    setRandKey(
      Array(9)
        .fill(0)
        .map((itm) => Math.random())
    );
    setAccount(data);
    changeCountry(data?.country);
  }, [data]);

  useEffect(() => {
    setAccountError(error);
  }, [error]);

  const handleCountry = (obj) => {
    setCountrySelected(obj);
  };

  const changeCountry = (index) => {
    let optValue;
    if (isNaN(index)) {
      optValue = index;
    } else {
      optValue = index.target.value;
    }
    const findInx = json.findIndex((itm) => itm.name === optValue);
    setCountrySelected(json[findInx]);
    setStates(json[findInx]?.states);
  };

  return (
    <div className="personal onboarding ">
      <Form>
        <FormGroup>
          <Row>
            <Col md={12}>
              <h6 className="mb-4">Personal information</h6>
              <Label>Username</Label>
              <Input
                defaultValue={account?.username}
                key={randKey[0]}
                placeholder="e.g johndoe"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col lg={6}>
              <Label>First name</Label>
              <Input
                defaultValue={account?.firstName}
                key={randKey[1]}
                placeholder="Your first name"
              />
            </Col>
            <Col lg={6}>
              <Label>Last name</Label>
              <Input
                defaultValue={account?.lastName}
                key={randKey[2]}
                placeholder="Your last name"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col lg={6}>
              <Label>Gender</Label>
              <Input
                defaultValue={account?.gender}
                key={randKey[3]}
                invalid={false}
                type="select"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </Input>
              <FormFeedback>This is invalid, try again!</FormFeedback>
            </Col>
            <Col lg={6}>
              <Label>Date of birth</Label>
              <Input
                // defaultValue="2011-09-29"
                defaultValue={account?.dateOfBirth?.substring(0, 10)}
                key={randKey[4]}
                type="date"
              />
            </Col>
          </Row>
        </FormGroup>
        <h6 className="mt-5 mb-4">Contact information</h6>
        <FormGroup>
          <Row>
            <Col md={12}>
              <Label>Email address</Label>
              <Input
                defaultValue={account?.email}
                key={randKey[5]}
                disabled={true}
                placeholder="e.g johndoe@gmail.com"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col>
              <Label>Phone number</Label>
              <div className="fx">
                <div className="country">
                  <UncontrolledDropdown direction="right" disabled>
                    <DropdownToggle className="btn" caret>
                      <ReactCountryFlag
                        countryCode={countrySelected?.countryCode}
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
                </div>
                <div className="number ml-2" style={{ width: "100%" }}>
                  <Input
                    key={randKey[6]}
                    type="tel"
                    disabled={true}
                    defaultValue={account?.mobileNumber}
                    invalid={false}
                    placeholder="+234"
                    block
                  />
                  <FormFeedback>This is invalid, try again!</FormFeedback>
                </div>
              </div>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col md={6}>
              <Label>Country</Label>
              <Input
                onChange={(e) => changeCountry(e)}
                key={randKey[7]}
                name="country"
                type="select"
              >
                {country.map((item, idx) => (
                  <option
                    selected={item.name === account?.country}
                    key={idx}
                    value={item.name}
                  >
                    {item.name}
                  </option>
                ))}
              </Input>
            </Col>
            <Col md={6}>
              <Label>State</Label>
              <Input key={randKey[8]} required name="state" type="select">
                {states &&
                  states.map((item, i) => (
                    <option
                      selected={item.name === account?.state}
                      key={i}
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  ))}
              </Input>
            </Col>
          </Row>
        </FormGroup>
        <Button
          type="button"
          color="warning"
          className="submit background-orange mt-4 text-white"
        >
          Save changes
        </Button>
      </Form>
    </div>
  );
}

export default Personal;
