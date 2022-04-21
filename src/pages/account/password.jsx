import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import IconSearchBar from "../../components/iconSearchBar";

function Password({ passwordLoading, passwordSubmit }) {
  const [loading, setLoading] = useState(passwordLoading);
  const [pattern, setPattern] = useState(null);

  useEffect(() => {
    setLoading(passwordLoading);
  }, [passwordLoading]);

  return (
    <div className="personal onboarding">
      <Form onSubmit={passwordSubmit}>
        <FormGroup>
          <Row>
            <Col md={12}>
              <h6 className="mb-4">Change password information</h6>
              <Label>Old pasword</Label>
              <IconSearchBar
                icon="ri-eye-off-line"
                icon2="ri-eye-line"
                type="password"
                type2="text"
                minLength={6}
                required={true}
                name="old_password"
                disabled={loading}
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
              <Label>New pasword</Label>
              <IconSearchBar
                icon="ri-eye-off-line"
                icon2="ri-eye-line"
                type="password"
                minLength={6}
                onChange={(e) => setPattern(e.target.value)}
                type2="text"
                required={true}
                name="password"
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
              <Label>Retype pasword</Label>
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
                iconChange={true}
                placeholder="****"
                inputClass="r"
                iconPosition="r"
              />
            </Col>
          </Row>
        </FormGroup>{" "}
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
              <span className="mr-2">Submit</span>
            </>
          )}
        </Button>
      </Form>
    </div>
  );
}

export default Password;
