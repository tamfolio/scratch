import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "reactstrap";

function Copy({ className }) {
  return (
    <div className={`fx fx-align fx-justify-center ${className}`}>
      <Button className="mr-4 copy-button background-dark py-2 px-3" outline color="dark">
        FAVOUR123
      </Button>
      <div className="pointer">
        <FontAwesomeIcon icon={faCopy} />
        <span className="ml-2">COPY CODE</span>
      </div>
    </div>
  );
}

export default Copy;
