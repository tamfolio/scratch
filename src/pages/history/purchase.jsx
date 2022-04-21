import React from "react";
import { Table } from "reactstrap";
import IconSearchBar from "../../components/iconSearchBar";

function Purchases() {
  return (
    <div className="history">
      <section className="left">
        <h5>Purchase history</h5>
        {/* <div className="box mt-4">
          <div className="item empty">There’s nothing to see here yet..</div>
        </div> */}
        <IconSearchBar className="mt-4" />
        <div className="flexible-table">
          <table className="mt-2 no-break">
            <thead>
              <tr>
                <th>Game</th>
                <th>Category</th>
                <th>Date</th>
                <th>Time</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {Array(10)
                .fill(0)
                .map((item, i) => (
                  <tr key={i}>
                    <td>
                      <div className="fx">
                        <img src="assets/history.png" alt="" />
                        <span className="ml-3">Millionaire’s game</span>
                      </div>
                    </td>
                    <td>Millionaire’s</td>
                    <td>21.03.2022</td>
                    <td>18:35</td>
                    <td>₦10,000</td>
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
export default Purchases;
