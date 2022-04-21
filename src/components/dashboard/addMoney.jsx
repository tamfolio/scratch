import { faChevronDown, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label, Modal } from "reactstrap";

function AddMoney({ screen, modal, toggle }) {
  const [WModal, setWModal] = useState(modal);
  const [view, setView] = useState();
  const [clickedV, setClickedV] = useState("");
  const [clickedW, setClickedW] = useState("");
  const [withdrawScreen, setWithdrawScreen] = useState(1);

  useEffect(() => {
    setWModal(modal);
  }, [modal]);

  useEffect(() => {
    setView(screen);
  }, [screen]);

  const changeClickedV = (v) => setClickedV(v);
  const changeClickedW = (v) => setClickedW(v);

  const viewClick = (val) => setView(val);

  const changeWithdrawScreen = () => {
    if (withdrawScreen === 4) {
      setWithdrawScreen(1);
    } else {
      setWithdrawScreen((p) => p + 1);
    }
  };

  const wPage1 = (
    <>
      <h5>Verification</h5>
      <p className="text-grey">
        We require identity verification before you can withdraw. This is to
        prevent underage gambling.
      </p>
      <p className="text-grey">
        Please upload your Proof of Identity. All documents must be laying on a
        flat surface with all 4 corners inside the frame, and all information
        should be clear and identifiable.
      </p>
      <p>
        <b>Select a preferred method</b>
      </p>
      <div className="verification">
        <div
          onClick={() => changeClickedV("drivers-license")}
          className={`item pointer ${
            clickedV === "drivers-license" && "active"
          }`}
        >
          <i className="ri-profile-line"></i>
          <p className="verify-text">Drivers license</p>
        </div>
        <div
          onClick={() => changeClickedV("international-passport")}
          className={`item pointer ${
            clickedV === "international-passport" && "active"
          }`}
        >
          <i className="ri-passport-line"></i>
          <p className="verify-text">International passport</p>
        </div>
        <div
          onClick={() => changeClickedV("national-id")}
          className={`item pointer ${clickedV === "national-id" && "active"}`}
        >
          <i className="ri-passport-line"></i>
          <p className="verify-text">National Identification Number (NIN)</p>
        </div>
      </div>
      <div className="text-right">
        <Button
          onClick={() => changeWithdrawScreen()}
          type="button"
          color={clickedV ? "warning" : "secondary"}
        >
          Continue
        </Button>
      </div>
    </>
  );

  const wPage2 = (
    <>
      <h6 className="mb-4">
        Driver’s license
        <span className="ml-3">
          <FontAwesomeIcon icon={faChevronDown} />
        </span>
      </h6>
      <Form>
        <FormGroup>
          <Label>Upload front of document</Label>
          <Input type="file" placeholder="upload" />
        </FormGroup>
        <FormGroup>
          <Label>Upload back of document*</Label>
          <Input type="file" placeholder="upload" />
        </FormGroup>
        <FormGroup>
          <Label>Identification number</Label>
          <Input type="text" placeholder="1234567898" />
        </FormGroup>
        <div className="text-right">
          <Button
            onClick={() => changeWithdrawScreen()}
            type="button"
            color="warning"
          >
            Submit
          </Button>
        </div>
      </Form>
    </>
  );

  const wPage3 = (
    <>
      <h6>Choose a preferred withdrawal method</h6>
      <div className="preffered">
        <div
          onClick={() => changeClickedW("nigeria-account")}
          className={`item pointer ${
            clickedW === "nigeria-account" && "active"
          }`}
        >
          <p>Nigerian account</p>
        </div>
        <div
          onClick={() => changeClickedW("paypal")}
          className={`item pointer ${clickedW === "paypal" && "active"}`}
        >
          <p>Paypal account</p>
        </div>
        <div
          onClick={() => changeClickedW("btc")}
          className={`item pointer ${clickedW === "btc" && "active"}`}
        >
          <p>BTC wallet</p>
        </div>
      </div>
      <Form>
        <FormGroup>
          <Label>Bank</Label> <br />
          <Input type="select" className="wallet-select bank" block>
            <option value="" selected disabled>
              Select bank
            </option>
            <option value="">First bank</option>
            <option value="">Wema bank</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Account name</Label>
          <Input type="text" placeholder="Your account name" />
        </FormGroup>
        <FormGroup>
          <Label>Account number</Label>
          <Input type="text" placeholder="Your account number" />
        </FormGroup>
        <FormGroup>
          <Label>Amount</Label>
          <Input type="text" placeholder="₦" />
          <small>
            <b>
              <span className="text-grey">Min: </span>
              <span className="text-orange">₦10,000</span>
            </b>
          </small>
        </FormGroup>
        <Button
          onClick={() => changeWithdrawScreen()}
          type="button"
          color="secondary"
          block
          className="mb-5"
        >
          Withdraw
        </Button>
      </Form>
    </>
  );

  const wPage4 = (
    <>
      <h6 className="mb-4">
        A 6-digit code has been sent to your email address
      </h6>
      <Form>
        <FormGroup>
          <Label>Enter code</Label>
          <Input />
          <div className="text-right">
            <small className="text-grey">Resend in 59s</small>
          </div>
        </FormGroup>
        <Button
          onClick={() => changeWithdrawScreen()}
          type="button"
          block
          className="secondary"
        >
          Confirm
        </Button>
      </Form>
    </>
  );

  return (
    <Modal
      isOpen={WModal}
      centered
      backdropClassName="onboading-backdrop"
      size="md"
      toggle={toggle}
      style={{ marginTop: '70px'}}
    >
      <div className="onboarding dashboard">
        <span className="close-button pointer" onClick={() => toggle()}>
          <i className="ri-close-circle-fill"></i>
        </span>
        <div className="view  wallet-view">
          <div className="wallet">
            <FontAwesomeIcon icon={faWallet} />
            <span className="ml-2">Wallet</span>
          </div>
          <div className="text-center mt-4">
            <div className="toggle mb-3">
              <span
                onClick={() => viewClick(1)}
                className={view === 1 && "active"}
              >
                Add Money
              </span>
              <span
                onClick={() => viewClick(2)}
                className={view === 2 && "active"}
              >
                Withdraw
              </span>
            </div>
          </div>

          {view === 1 ? (
            <div className="top-up">
              <div className="text-center mt-3">
                <Input type="select" className="wallet-select" block={false}>
                  <option value="">NGN</option>
                  <option value="">EUR</option>
                  <option value="">USD</option>
                </Input>
                <h6 className="mt-4 mb-3">Select an amount to top up</h6>
              </div>
              <div className="cash-pick">
                {Array(6)
                  .fill(0)
                  .map((e, i) => (
                    <div key={i} className="item pointer">
                      <img src="/assets/topup.png" alt="" />
                    </div>
                  ))}
              </div>
              <h6 className="mt-2 mb-2 text-center">OR</h6>
              <small>
                <b>Type an amount here</b>
              </small>
              <Input block placeholder="₦" className="mb-2" />
              <small>
                <b>
                  <span className="text-grey">Min: </span>
                  <span className="text-orange">₦10,000</span>
                </b>
              </small>
              <Button className="mt-4 mb-5" block>
                Deposit
              </Button>
            </div>
          ) : (
            <div className="withdraw">
              {withdrawScreen === 1
                ? wPage1
                : withdrawScreen === 2
                ? wPage2
                : withdrawScreen === 3
                ? wPage3
                : wPage4}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default AddMoney;
