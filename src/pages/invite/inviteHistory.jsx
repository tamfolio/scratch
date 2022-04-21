import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "reactstrap";
import Copy from "../../components/copy";

function InviteHistory({ modal, toggle }) {
  const [IModal, setIModal] = useState(modal);
  useEffect(() => {
    setIModal(modal);
  }, [modal]);
  return (
    <Modal
      isOpen={IModal}
      centered
      backdropClassName="onboading-backdrop"
      className="onboading-modal-class"
      contentClassName="onboading-modal-content"
      size="md"
      toggle={toggle}
    >
      <div className="onboarding dashboard">
        <span className="close-button pointer" onClick={() => toggle()}>
          <i className="ri-close-circle-fill"></i>
        </span>
        <div className="view p-4 wallet-view">
          <div className="wallet">
            <FontAwesomeIcon icon={faUserGroup} />
            <span className="ml-2">Invite friends</span>
          </div>
          <h5 className="mt-4 text-center">Your invite history</h5>
          <div className="cash-pick id mb-2">
            <div className="item pointer">
              <p className="margin">Total invites</p>
              <h4>0</h4>
            </div>
            <div className="item pointer">
              <p className="margin">Invites funded</p>
              <h4>0</h4>
            </div>
            <div className="item pointer">
              <p className="margin">Total earned</p>
              <h4>$0.0</h4>
            </div>
          </div>
          <div className="withdraw">
            <small className="item text-grey fx fx-justify-space">
              <p>Invites</p>
              <p>Date joined</p>
            </small>
            {Array(5)
              .fill(0)
              .map((e, i) => (
                <div key={i} className="item fx fx-justify-space">
                  <p>John Doe</p>
                  <p>01/01/2022</p>
                </div>
              ))}
          </div>

          <Copy className="mt-4 mb-4" />
          <Button block color="warning" className='share-code'>
            Share code
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default InviteHistory;
