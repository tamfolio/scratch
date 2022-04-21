import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Input, Spinner } from "reactstrap";
import NumberFormat from "react-number-format";
import { delFromCart, editCart, getCart, totalPrice } from "../../store/cart";
import def from "../../services/enum";

function Cart({ modal, toggleCart, toggle }) {
  const [close, setClose] = useState(modal);
  const [cards, setCards] = useState([]);
  const [price, setPrice] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setClose(modal);
    if (modal) {
      const cartItems = getCart();
      const uniqueItems = [...new Set(cartItems.map((d) => d.id))].join(",");
      console.log(uniqueItems);
      setCards(cartItems);
      setPrice(totalPrice(cartItems, cartItems));
    }
  }, [modal]);

  const checkOut = () => {
    //flutterwave
    console.log("checking out");
  };

  const handleDelete = (ref) => {
    delFromCart(ref);
    setTimeout(() => {
      let crt = getCart();
      // let crtl = crt.length;
      setCards(crt);
      setPrice(totalPrice(crt, crt));
    }, 600);
  };

  const validateCoupon = () => {
    // coupon
  };

  const handleQty = (type, obj) => {
    let json = {
      id: obj.id,
      quantity: obj.quantity || 1,
      image: obj.image,
      category: obj.category,
      title: obj.title,
      price: obj.price,
      sku: obj.sku,
    };
    if (type === def.MINUS) {
      if (json.quantity > 1) {
        json.quantity--;
      }
    } else {
      json.quantity++;
    }
    editCart(obj.ref, json);
    setTimeout(() => {
      const cartItems = getCart();
      setCards(cartItems);
      setPrice(totalPrice(cartItems, cartItems));
      setCards(getCart());
    }, 600);
  };

  return (
    <div className="cart-list" style={{ right: close ? "0" : "-530px" }}>
      <span className="close pointer" onClick={() => toggleCart()}>
        <i className="ri-close-line"></i>
      </span>
      <h5>Cart</h5>
      <div className="items mt-5">
        {cards &&
          cards.map((item, i) => (
            <div key={i} className="item fx fx-align">
              <div className="image mr-4">
                <img src={item.image} alt="" />
              </div>
              <div className="detail">
                <div className="name mb-4 fx fx-align fx-justify-space">
                  <span>{item.title}</span>
                  <span onClick={() => handleDelete(item.ref)} className="del">
                    <i className="ri-delete-bin-2-line"></i>
                  </span>
                </div>
                <div className="activity fx fx-align fx-justify-space">
                  <div className="button">
                    <Button onClick={() => handleQty(def.MINUS, item)} outline>
                      <FontAwesomeIcon icon={faMinus} />
                    </Button>
                    <span className="value mx-3">{item.quantity}</span>
                    <Button onClick={() => handleQty(def.PLUS, item)} outline>
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </div>
                  <div className="price">
                    <NumberFormat
                      value={item.price * item.quantity}
                      displayType="text"
                      thousandSeparator={true}
                      prefix="₦"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="cart-subtotal">
        <small>
          <b>Promo code</b>
        </small>
        <div className="code-box fx fx-align mt-1">
          <Input
            block
            color="dark"
            className="mr-3"
            name="coupon"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            disabled={loading}
            placeholder="Enter your code"
          />
          <Button
            onClick={validateCoupon}
            disabled={loading}
            className="background-orange no-break"
          >
            {loading ? (
              <>
                <Spinner size="sm"> </Spinner>
              </>
            ) : (
              <>
                <span className="mr-2">Apply</span>
              </>
            )}
          </Button>
        </div>
        <div className="subtotal fx fx-align fx-justify-space mt-5">
          <h5>Subtotal</h5>
          <h5>
            <NumberFormat
              value={price}
              displayType="text"
              thousandSeparator={true}
              prefix="₦"
            />
          </h5>
        </div>
        <small className="text-grey">(Shipping and tax excluded)</small>
        <div className="subtotal fx fx-align fx-justify-space my-3">
          <h5>Discount</h5>
          <h5>-N0</h5>
        </div>
        <Button disabled={loading} onClick={checkOut} block color="warning">
          {loading ? (
            <>
              <Spinner size="sm"> </Spinner>
            </>
          ) : (
            <>
              <span className="mr-2">Proceed to checkout</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default Cart;
