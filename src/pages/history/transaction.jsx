import React from "react";
import { Table } from "reactstrap";
import IconSearchBar from "../../components/iconSearchBar";

function Transaction() {
  return (
    <div className="history">
      <section className="left">
        <h5>Transaction history</h5>
        {/* <div className="box mt-4">
          <div className="item empty">There’s nothing to see here yet..</div>
        </div> */}
        <IconSearchBar className="mt-4" />
        <div className="flexible-table">
          <table className="mt-2 no-break">
            <thead>
              <tr>
                <th>Action</th>
                <th>Date</th>
                <th>Time</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {Array(4)
                .fill(0)
                .map((item, i) => (
                  <tr key={i}>
                    <td>Money added</td>
                    <td>21.03.2022</td>
                    <td>21.03.2022</td>
                    <td>₦10,000</td>
                    <td className="text-success">Complete</td>
                  </tr>
                ))}
              {Array(4)
                .fill(0)
                .map((item, i) => (
                  <tr key={i}>
                    <td>Money added</td>
                    <td>21.03.2022</td>
                    <td>21.03.2022</td>
                    <td>₦10,000</td>
                    <td>Pending</td>
                  </tr>
                ))}
              {Array(4)
                .fill(0)
                .map((item, i) => (
                  <tr key={i}>
                    <td>Money added</td>
                    <td>21.03.2022</td>
                    <td>21.03.2022</td>
                    <td>₦10,000</td>
                    <td className="text-danger">Failed</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="right mt-5">
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
    </div>
  );
}
export default Transaction;
