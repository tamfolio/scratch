import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Table } from "reactstrap";
import Copy from "../../components/copy";
import InviteHistory from "./inviteHistory";

function Invite() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <div className="invite">
      <section className="invite-left">
        <div className="avatar mt-3">
          <img src="/assets/invite.png" alt="" />
        </div>
        <h4>Ready to earn and constantly and more <br/> money other than the jackpots?</h4>
        <p className="mt-3">
        Join our refer a friend program and maximise your profits.<br/>
        5% referral commission.<br/>
        Unlimited referrals.
        </p>
        <Copy className="mb-3 mt-4" />
        <Button color="warning" className="share-code">
          Share code
        </Button>
        <div className="mt-5">
          <span
            onClick={() => toggle()}
            className="background-dark invite-history pointer"
          >
            See invite history
          </span>
        </div>
      </section>
      <section className="invite-right mt-5">
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
      <InviteHistory modal={modal} toggle={toggle} />
    </div>
  );
}

export default Invite;
