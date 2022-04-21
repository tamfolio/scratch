import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
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
  Modal,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import def from "../services/enum";
import ForgotPassword from "./dashboard/forgotPassword";
import Login from "./dashboard/login";
import Register from "./dashboard/register";
import IconSearchBar from "./iconSearchBar";

function Onboarding({ setAuth, auth, screen, modal, toggle }) {
  const [OModal, setOModal] = useState(modal);
  const [congrat, setCongrat] = useState(false);
  const [authenticated, setAuthenticated] = useState(auth);
  const [registerScreen, setRegisterScreen] = useState(1);
  const [forgotScreen, setForgotScreen] = useState(1);
  const [view, setView] = useState(screen);

  useEffect(() => {
    setOModal(modal);
    setView(screen);
    setCongrat(false);
    setRegisterScreen(1);
    setForgotScreen(1);
  }, [screen, modal]);


  useEffect(() => {
    setAuthenticated(auth)
  }, [auth]);

  
  const viewClick = (val) => {
    setView(val);
    setRegisterScreen(1);
    setForgotScreen(1);
  };

  const closingModal = (view) => {
    toggle();
    setCongrat(false);
    setView(view || def.LOGIN_VIEW);
    setRegisterScreen(1);
    setForgotScreen(1);
  };

  return (
    <Modal
      isOpen={OModal}
      centered
      className="onboading-modal-class"
      contentClassName="onboading-modal-content"
      backdropClassName="onboading-backdrop"
      size="lg"
      toggle={toggle}
    >
      <div className="onboarding dashboard">
        <span className="close-button pointer" onClick={() => toggle()}>
          <i className="ri-close-circle-fill"></i>
        </span>
        <div className="view fx fx-align">
          <div className="left">
            <img src="/assets/onboarding.png" alt="" />
          </div>
          <div className="right">
            {!congrat && (
              <>
                <div className="logo text-center mb-4">
                  <img src="/assets/logo.png" className="desktop_login_logo" />
                  <img src="/assets/logo_2.png" alt="" className="mobile_login-logo" />
                </div>
                <div className="text-center mb-3">
                  <div className="toggle mb-3">
                    <span
                      onClick={() => viewClick(def.LOGIN_VIEW)}
                      className={
                        [def.LOGIN_VIEW, def.FORGOT_PASSWORD_VIEW].includes(
                          view
                        ) && def.ACTIVE
                      }
                    >
                      Login
                    </span>
                    <span
                      onClick={() => viewClick(def.REGISTER_VIEW)}
                      className={view === def.REGISTER_VIEW && def.ACTIVE}
                    >
                      Register
                    </span>
                  </div>
                </div>
              </>
            )}
            {view === def.LOGIN_VIEW ? (
              <Login
                modal={modal}
                setAuth={setAuth}
                auth={authenticated}
                setModal={closingModal}
                viewClick={viewClick}
              />
            ) : view === def.FORGOT_PASSWORD_VIEW ? (
              <ForgotPassword
                forgotScreen={forgotScreen}
                modal={modal}
                setModal={closingModal}
                setCongrat={setCongrat}
                takeTo={viewClick}
              />
            ) : (
              <Register
                registerScreen={registerScreen}
                setModal={closingModal}
                takeTo={viewClick}
                setCongrat={setCongrat}
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Onboarding;
