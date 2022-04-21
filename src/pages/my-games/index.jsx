import React from "react";
import { Table } from "reactstrap";

function Game() {
  return (
    <div className="my-games">
      <section className="my-games-left">
        <h5>Game dashboard</h5>
        <div className="stats fx fx-align fx-wrap text-center mt-3 mb-5">
          <div className="item">
            <p>Game played</p>
            <h4>0</h4>
          </div>
          <div className="item">
            <p>Game won</p>
            <h4>0</h4>
          </div>
          <div className="item">
            <p>Cash won</p>
            <h4>$0.0</h4>
          </div>
        </div>
        <div className="meet-winners">
          <h5>
            <b>Meet our winners</b>
          </h5>
          <div className="flexible-table">
            <table className="mt-2 no-break">
              <thead>
                <tr>
                  <th>Game</th>
                  <th>User</th>
                  <th>Game price</th>
                  <th>Payout</th>
                  <th>Nationality</th>
                </tr>
              </thead>
              <tbody>
                {[0, 0, 0, 0, 0].map((item, i) => (
                  <tr key={i}>
                    <td>Game name</td>
                    <td>John Doe</td>
                    <td>₦5,000</td>
                    <td>₦87,000</td>
                    <td>
                      <span>Nigeria</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="my-games-right mt-5">
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

export default Game;
