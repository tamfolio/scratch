import React from "react";

function PopupCurrency() {
  return (
    <>
      <div className="pops-head mb-2">
        <span>Balance</span>
        <span>Currency</span>
      </div>
      <div className="pops-body">
        <div className="item">
          <span className="left">₦1500000.00</span>
          <span className="right">
            <i className="ri-money-cny-circle-fill c-green mr-1"></i>
            NGN
          </span>
        </div>
        <div className="item">
          <span className="left">$1500.00</span>
          <span className="right">
            <i className="ri-money-dollar-circle-fill c-orange mr-1"></i>
            US
          </span>
        </div>
        <div className="item">
          <span className="left">£1300.00</span>
          <span className="right">
            <i className="ri-money-pound-circle-fill c-yellow-d mr-1"></i>
            GBP
          </span>
        </div>
        <div className="item">
          <span className="left">€1200.00</span>
          <span className="right">
            <i className="ri-money-euro-circle-fill c-purple mr-1"></i>
            EUR
          </span>
        </div>
        <div className="item">
          <span className="left">₵1300.00</span>
          <span className="right">
            <i className="ri-bit-coin-fill c-yellow mr-1"></i> CED
          </span>
        </div>
        <div className="item">
          <span className="left">K150000.00</span>
          <span className="right">
            <i className="ri-bit-coin-fill c-red mr-1"></i> CED
          </span>
        </div>
      </div>
    </>
  );
}

export default PopupCurrency;
