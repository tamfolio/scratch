import React, {
  useState,
  Children,
  createElement,
  cloneElement,
  useEffect,
} from "react";
import dashboardLinks from "./links";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import User from "./user";
import IsLoggedIn from "./isLoggedIn";
import Onboarding from "../onboading";
import { useRouter } from "next/router";
import Cart from "./cart";
import AddMoney from "./addMoney";
import goodToken from "../../services/token";
import MobileNav from "../mobileNav";
import def from "../../services/enum";

function Dashboard({ children }) {
  const [auth, setAuth] = useState(true);
  const router = useRouter();
  const { login } = router.query;
  const [screen, setScreen] = useState("login");
  const [modal, setModal] = useState(false);
  const [panelClose, setPanelClose] = useState(false);
  const [addMoneyScreen, setAddMoneyScreen] = useState(1);
  const [cartModal, setCartModal] = useState(false);
  const [moneyModal, setMoneyModal] = useState(false);
  const [showDashboardMenu, setShowDashboardMenu] = useState(false);
  const token = Cookies.get();

  useEffect(() => {
    if (login === "true") {
      setModal(true);
    }
  }, [login]);

  useEffect(() => {
    const checkToken = async () => {
      const isGood = await goodToken();
      if (isGood) {
        setAuth(true);
      } else {
        setAuth(true);
      }
    };
    checkToken();
  }, [token?.access_token]);

  const toggle = (scr = "login") => {
    if (typeof scr === "string") setScreen(scr);
    setModal(!modal);
  };

  const toggleCart = () => {
    setCartModal(!cartModal);
  };

  const toggleMenu = () => {
    setShowDashboardMenu(!showDashboardMenu);
  };
  const toggleMoney = (val = 1) => {
    setAddMoneyScreen(val);
    setMoneyModal(!moneyModal);
  };

  const dynamicPanel = (val = "null") => {
    if (val === "null") {
      setPanelClose(!panelClose);
    } else {
      setPanelClose(val);
    }
  };

  return (
    <div className="dashboard">
      <input
        id="hamburger"
        checked={panelClose}
        className="hamburger"
        readOnly={true}
        type="checkbox"
      />
      <label
        onClick={() => dynamicPanel()}
        htmlFor="hamburger"
        className="hamburger"
      >
        <i></i>
      </label>
      <nav className="dashboard-nav">
        <User
          showDashboardMenu={showDashboardMenu}
          setShowDashboardMenu={setShowDashboardMenu}
          showLeftSideBar={dynamicPanel}
        />
        <ul>
          {dashboardLinks.map((link, i) => (
            <li
              key={i}
              onClick={() =>  setPanelClose(!panelClose)}
            >
              <Link href={link.link}>
                <a className={router.pathname === link.link ? "active" : ""}>
                  <i className={`${link.icon} left-nav-icon`}></i>
                  <span>{link.title}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <header className="dashboard-header">
        <div className="logo">
          <Link href="/">
            <a>
              <img
                className="image pointer not-for-mobile"
                src="/assets/logo.png"
                alt=""
              />
              <img
                className="image pointer for-mobile"
                src="/assets/logo_2.png"
                alt=""
              />
              </a>
          </Link>
        </div>
        <IsLoggedIn
          toggleMoney={toggleMoney}
          toggleCart={toggleCart}
          modal={toggle}
          isAuth={auth}
        />
      </header>
      <div className="components" onClick={() => dynamicPanel(false)}>
        {children}
        {/* {Children.map(children, (child) =>
          cloneElement(child, { setAuth, setBModal })
        )} */}
      </div>
      <Onboarding
        screen={screen}
        setAuth={setAuth}
        auth={auth}
        modal={modal}
        toggle={toggle}
      />
      <Cart modal={cartModal} toggleCart={toggleCart} />
      <AddMoney
        screen={addMoneyScreen}
        modal={moneyModal}
        toggle={toggleMoney}
      />
      {/* <MobileNav
        showDashboardMenu={showDashboardMenu}
        setShowDashboardMenu={setShowDashboardMenu}
        toggleMenu={toggleMenu}
        toggleCart={toggleCart}
        showLeftSideBar={dynamicPanel}
        toggleMoney={toggleMoney}
      /> */}
       <MobileNav 
        showDashboardMenu={showDashboardMenu}
        setShowDashboardMenu={setShowDashboardMenu}
        toggleMenu={toggleMenu}
        toggleCart={toggleCart}
        showLeftSideBar={dynamicPanel}
        toggleMoney={toggleMoney}
       />
    </div>
  );
}

export default Dashboard;
