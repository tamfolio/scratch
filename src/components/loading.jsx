import React from "react";
import { Spinner } from "reactstrap";

function Loading() {
  return (
    <div className="loading">
      <Spinner size="lg">{" "}</Spinner>
    </div>
  );
}

export default Loading;
