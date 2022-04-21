import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import notEmpty, { empty } from "../../services/objCheck";
import def from "../../services/enum";
import Password from "./password";
import Personal from "./personal";
import { graphql } from "../../services/axiosAuth";
import { allAccountDispatch } from "../../store/actions/account";
import {
  editAccount,
  editPassword,
  requestAccountData,
} from "../../store/graphql/account";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../../components/loading";

function Account() {
  const [screen, setScreen] = useState(1);
  const [account, setAccount] = useState({});
  const [personalLoading, setPersonalLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [accountLoading, setAccountLoading] = useState(true);
  const mounted = useRef(null);
  const user = useSelector((state) => state.accountData);
  const http = useDispatch();

  useEffect(() => {
    if (!mounted.current) {
      console.log(user.data);
      // componentDidMount
      if (empty(user.data)) {
        http(graphql(requestAccountData, {}, allAccountDispatch));
      } else {
        setAccountLoading(false);
        if (user.error) {
          toast.error(user.errorMessage, { theme: "colored" });
        } else {
          const data =
            user.data?.editAccount || user.data?.login || user.data?.me;
          setAccount(data);
        }
      }
      mounted.current = true;
    } else {
      // componentDidUpdate
      if (notEmpty(user.data) && user.loading === def.DONE) {
        const data =
          user.data?.editAccount || user.data?.login || user.data?.me;
        setAccount(data);
        setAccountLoading(false);
        setPersonalLoading(false);
        if (user.data.editAccount) {
          toast.success("Account edited successfully", { theme: "colored" });
        }
      }
      if (user.error) {
        toast.error(user.errorMessage, { theme: "colored" });
      }
    }
  }, [user]);

  const handleNavigation = (val) => {
    setScreen(val);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const data = FormHandler(e, ["password"]);
    setPasswordLoading(true);
    const response = await graphql(editPassword, data)();
    setPasswordLoading(false);
    if (response.error) {
      toast.error(response.errorMessage, { theme: "colored" });
    } else {
      toast.success("Password changed successfully!", {
        theme: "colored",
        autoClose: 2000,
      });
    }
  };

  const handlePersonalSubmit = (e) => {
    e.preventDefault();
    const data = FormHandler(e, [
      "firstName",
      "lastName",
      "dateOfBirth",
      "gender",
      "state",
      "country",
    ]);
    // return console.log(data)
    http(graphql(editAccount, data, allAccountDispatch));
    setPersonalLoading(true);
  };

  return (
    <div className="account index">
      <ToastContainer />
      {accountLoading ? (
        <Loading />
      ) : (
        <>
          <section className="account-left">
            <h5>Account settings</h5>
            <div className="account-nav mt-3">
              <div
                className={`item pointer ${screen === 1 && "active"}`}
                onClick={() => handleNavigation(1)}
              >
                <i className="ri-user-fill"></i>
                <span className="title">General profile</span>
              </div>
              <div
                className={`item pointer ${screen === 2 && "active"}`}
                onClick={() => handleNavigation(2)}
              >
                <i className="ri-lock-2-fill"></i>
                <span className="title">Change password</span>
              </div>
              <div className="item pointer">
                <i className="ri-settings-3-fill"></i>
                <span className="title">Preferences</span>
              </div>
            </div>
          </section>
          <section className="account-center">
            {screen === 1 ? (
              <Personal
                personalSubmitLoading={personalLoading}
                personalSubmit={handlePersonalSubmit}
                data={account}
              />
            ) : (
              <Password
                passwordLoading={passwordLoading}
                passwordSubmit={handlePasswordSubmit}
              />
            )}
          </section>
          <section className="account-right">
            <h6>Promotions</h6>
            <div className="item mb-3">
              <img src="/assets/promote1.png" alt="" />
            </div>
            <div className="item mb-3">
              <img src="/assets/promote2.png" alt="" />
            </div>
            <div className="item mb-3">
              <img src="/assets/promote1.png" alt="" />
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Account;
