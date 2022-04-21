import React, { useEffect, useState } from "react";
import Link from "next/link";
import def from "../../services/enum";
import { Button, PopoverBody, Popover, PopoverHeader, UncontrolledPopover , Progress} from "reactstrap";
import PopupCurrency from "./popupCurrency";
import PopupUser from "./popupUser";
import { FaDice } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faDice,
  faShoppingCart,
  faUser,
  faWallet,
  faMedal
} from "@fortawesome/free-solid-svg-icons";
import { TramRounded } from "@mui/icons-material";
import { FaWallet } from "react-icons/fa";
import { getCart } from "../../store/cart";

function IsLoggedIn({ isAuth, modal, toggleCart, toggleMoney }) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popUser, setPopUser] = useState(false);
  const [cart, setCart] = useState(false);
  const [auth, setAuth] = useState(false);
  const [progressPopOpen, setProgressPopOpen] = useState(false);

  useEffect(() => {
    setAuth(isAuth);
  }, [isAuth]);

  useEffect(() => {
    if (getCart().length) setCart(true);
  }, []);

  const toggle = () => {
    setPopoverOpen(!popoverOpen);
  };

  const toggleProgress = () => {
    setProgressPopOpen(!progressPopOpen);
  }
  const toggleUser = () => {
    setPopUser(!popUser);
  };

  return (
    <>
      {auth ? (
        <>
          <div className="fx fx-align wallet">
            <Button
              id="PopoverMoney"
              color="dark"
              className="select-wallet"
              // onClick={toggle}
            >
              <span className="fx fc-align">
                $1500.00
                <i className="ri-arrow-down-s-line ml-1"></i>
              </span>
            </Button>
            <UncontrolledPopover
              trigger="click"
              placement="bottom"
              offset={[0, 15]}
              isOpen={popoverOpen}
              toggle={toggle}
              target="PopoverMoney"
            >
              <PopoverBody className="pops">
                <PopupCurrency />
              </PopoverBody>
            </UncontrolledPopover>
            <button
              className="wallet-btn"
              onClick={() => toggleMoney(1)}
              color="warning"
            >
              <span className="for-mobile">
                <FontAwesomeIcon icon={faWallet} />
              </span>
              <span className="not-for-mobile">Wallet</span>
            </button>
          </div>
          
          <div className="menu fx fx-align">
          <span onClick={() => toggleProgress()} id="PopProgress" className="top-nav-icon">
            <i className="ri-medal-fill"></i> 
          </span>
            <Popover placement="bottom" target="PopProgress" isOpen={progressPopOpen} className='progress-pop-up'>
           <PopoverBody className="progresspopbody">
          <div className="progress-label fx fx-align fx-justify-space mb-2">
            <span>Your VIP Progress</span>
            <span>0%</span>
          </div>
          <div className="progress-container">
            <span className="progress-bar"></span>
          </div>
          <div className="progress-status fx fx-align fx-justify-space">
            <span>
              <i className="ri-star-line bronze-icon"></i> Bronze
            </span>
            <span>
              <i className="ri-star-line diamond-icon"></i> Diamond
            </span>
          </div>
          </PopoverBody>
        </Popover>
            <Link href="">
              <a className="top-nav-icon not-for-mobile">
                <FontAwesomeIcon icon={faDice} />
              </a>
            </Link>
            <span id="PopverUser" className="top-nav-icon">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <UncontrolledPopover
              trigger="click"
              placement="bottom"
              isOpen={popUser}
              toggle={toggleUser}
              offset={[0, 15]}
              target="PopverUser"
            >
              <PopoverBody className="pops user-pops">
                <PopupUser toggleUser={toggleUser} moneyToggle={toggleMoney} />
              </PopoverBody>
            </UncontrolledPopover>
            <Link href="/account/messages">
              <a className="top-nav-icon not-for-mobile">
                <FontAwesomeIcon icon={faComments} />
              </a>
            </Link>
            <span
              onClick={() => toggleCart()}
              className="top-nav-icon not-for-small-phone"
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              {cart && <span className="shop"></span>}
            </span>
          </div>
        </>
      ) : (
        <div className="logged-in">
          <span
            onClick={() => modal(def.LOGIN_VIEW)}
            className="login mr-3 pointer py-2 px-3"
          >
            Login
          </span>
          <Button
            onClick={() => modal(def.REGISTER_VIEW)}
            className="mr-3"
            color="warning"
          >
            Register
          </Button>
          <span
            onClick={() => toggleCart()}
            className="top-nav-icon not-for-small-phone"
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            {cart && <span className="shop"></span>}
          </span>
        </div>
      )}
    </>
  );
}

export default IsLoggedIn;
