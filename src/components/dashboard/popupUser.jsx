import React, { useState } from "react";
import Link from "next/link";

function PopupUser({ moneyToggle, toggleUser }) {
  const [showPopUp, setShowPopUp] = useState(false);
  const forMoney = (v) => {
    toggleUser();
    moneyToggle(v);
  };
  return (
    <div
      className={`pops-user ${showPopUp ? "close-pop" : ""}`}
      onClick={() => setShowPopUp(!showPopUp)}
    >
      <a className="item fx fx-align" onClick={() => forMoney(1)}>
        <span className="icon">
          <i className="ri-wallet-fill"></i>
        </span>
        <span className="title ml-2">Wallet</span>
      </a>
      <Link href="/account/messages">
        <a onClick={toggleUser} className="item fx fx-align">
          <span className="icon">
            <i className="ri-chat-3-fill"></i>
          </span>
          <span className="title ml-2">My messages</span>
        </a>
      </Link>
      <Link href="/history/purchase">
        <a onClick={toggleUser} className="item fx fx-align">
          <span className="icon">
            <i className="ri-history-fill"></i>
          </span>
          <span className="title ml-2">Purchases</span>
        </a>
      </Link>
      <Link href="/history/transaction">
        <a onClick={toggleUser} className="item fx fx-align">
          <span className="icon">
            <i className="ri-folder-2-fill"></i>
          </span>
          <span className="title ml-2">Transaction history</span>
        </a>
      </Link>
      <Link href="/invite">
        <a onClick={toggleUser} className="item fx fx-align">
          <span className="icon">
            <i className="ri-user-add-fill"></i>
          </span>
          <span className="title ml-2">Invite friends</span>
        </a>
      </Link>
      <Link href="/account">
        <a onClick={toggleUser} className="item fx fx-align">
          <span className="icon">
            <i className="ri-settings-3-fill"></i>
          </span>
          <span className="title ml-2">Account settings</span>
        </a>
      </Link>
      <div onClick={toggleUser} className="item fx fx-align">
        <span className="icon">
          <i className="ri-logout-box-r-fill"></i>
        </span>
        <span className="title ml-2">Logout</span>
      </div>
    </div>
  );
}

export default PopupUser;
