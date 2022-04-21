import React from "react";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faComments,
  faDice,
  faAward,
} from "@fortawesome/free-solid-svg-icons";

function MobileNav({
  showLeftSideBar,
  setShowDashboardMenu,
  toggleCart,
  toggleMoney,
}) {
  return (
    <div className="mobile-nav">
      <button onClick={() => showLeftSideBar()} className="item">
        <FontAwesomeIcon icon={faBars} />
        <span className="navtitle">Menu</span>
      </button>
      <Link href="/deals">
        <a className="item">
          <FontAwesomeIcon icon={faDice} />
          <span className="navtitle">Deals</span>
        </a>
      </Link>
      <Link href="/winners">
        <a className="item">
          <FontAwesomeIcon icon={faAward} />
          <span className="navtitle">Winners</span>
        </a>
      </Link>
      <Link href="/account/messages">
        <a className="item">
          <FontAwesomeIcon icon={faComments} />
          <span className="navtitle">Chat</span>
        </a>
      </Link>
      <button className="item" onClick={() => toggleCart()}>
        <FontAwesomeIcon icon={faCartShopping} />
        <span className="navtitle">Cart</span>
      </button>
    </div>
  );
}

export default MobileNav;
