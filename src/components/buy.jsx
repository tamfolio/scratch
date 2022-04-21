import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "reactstrap";
import NumberFormat from "react-number-format";
import PurchaseModal from "./purchaseModal";
import def from "../services/enum";

function Buy({ data, modal, toggle, addToCart }) {
  const [BModal, setBModal] = useState(modal);
  const [PModal, setPModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [subTotal, setSubTotal] = useState(0);
  const [paymentM, setPaymentM] = useState("");
  const [cardData, setCardData] = useState(data);
  const [butScreen, setbutScreen] = useState(1);

  useEffect(() => {
    setBModal(modal);
  }, [modal]);

  useEffect(() => {
    setQuantity(1);
    setCardData(data);
    setSubTotal(data?.price);
  }, [data]);

  const toggleP = () => {
    setPModal(!PModal);
  };

  const handleCartAdd = () => {
    let data = cardData;
    data.quantity = quantity;
    addToCart(data);
  };

  const handleQty = (type) => {
    if (type === def.MINUS) {
      setQuantity((p) => (p > 1 ? p - 1 : p));
    } else {
      setQuantity((p) => p + 1);
    }
  };

  return (
    <Modal
      isOpen={BModal}
      centered
      backdropClassName="onboading-backdrop"
      className="onboading-modal-class"
      contentClassName="onboading-modal-content"
      size="lg"
      toggle={toggle}
    >
      <div className="onboarding dashboard buy">
        <span className="close-button pointer" onClick={() => toggle()}>
          <i className="ri-close-circle-fill"></i>
        </span>
        <div className="view fx fx-align buy">
          <div className="left mobile">
            <img src={cardData?.image} alt=""  className='buy-img'/>
          </div>
          <div className="right">
            <h6>{cardData?.title}</h6>
            <small className="text-grey">{cardData?.category}</small>
            <h6 className="mt-3 money">
              <NumberFormat
                value={cardData?.price}
                displayType="text"
                thousandSeparator={true}
                prefix="₦"
              />
            </h6>
            <p className="description mt-3 mb-4 text-grey">
              {cardData?.description}
            </p>
            <small className="text-grey description mt-1">Quantity:</small>
            <div className="button-container mt-1 fx fx-align">
              <Button
                onClick={() => handleQty(def.MINUS)}
                color="light"
                outline
              >
                <i className="ri-subtract-line"></i>
              </Button>
              <div className="value mx-3">{quantity}</div>
              <Button onClick={() => handleQty(def.PLUS)} color="light" outline>
                <i className="ri-add-line"></i>
              </Button>
            </div>
            <div className="buy-nav mt-4">
              <div>
                <small>
                  Sub total:{" "}
                  <NumberFormat
                    value={subTotal}
                    displayType="text"
                    thousandSeparator={true}
                    prefix="₦"
                  />
                </small>
              </div>
              <PurchaseModal toggle={toggleP} modal={PModal} />
              <div className="fx">
                <Button className="pay" onClick={() => toggleP()}>
                  Pay now
                </Button>
                <Button onClick={() => handleCartAdd()}>
                  <FontAwesomeIcon icon={faCartShopping} />
                  &nbsp;&nbsp;Add to cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Buy;
