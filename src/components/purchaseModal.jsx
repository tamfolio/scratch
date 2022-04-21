import React, { useEffect, useState } from "react";
import { Button, Modal } from "reactstrap";

function PurchaseModal({ modal, toggle }) {
  const [state, setstate] = useState(modal);
  const [paymentM, setPaymentM] = useState("");

  useEffect(() => {
    setstate(modal);
  }, [modal]);

  const changePmethod = (e) => {
    setPaymentM(e);
    console.log(e);
  };
  return (
    <Modal
      isOpen={state}
      centered
      backdropClassName="onboading-backdrop"
      size="md"
      toggle={toggle}
    >
      <div className="onboarding buy dashboard">
        <span className="close-button pointer" onClick={() => toggle()}>
          <i className="ri-close-circle-fill"></i>
        </span>
        <div className="payment p-4">
          <h5 className="text-center mb-4">Select payment method</h5>
          <div className="option">
            <span
              className={`item ${paymentM === "main-account" && "active"}`}
              onClick={() => changePmethod("main-account")}
            >
              Main account
            </span>
            <span
              className={`item ${paymentM === "bonus-account" && "active"}`}
              onClick={() => changePmethod("bonus-account")}
            >
              Bonus account
            </span>
            <span
              className={`item ${paymentM === "card" && "active"}`}
              onClick={() => changePmethod("card")}
            >
              Card
            </span>
            <span
              className={`item ${paymentM === "bank-transfer" && "active"}`}
              onClick={() => changePmethod("bank-transfer")}
            >
              Bank transfer
            </span>
          </div>
          <div className="text-center mt-5">
            <Button className={`${paymentM && "background-orange"} px-5`}>
              Continue
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PurchaseModal;
