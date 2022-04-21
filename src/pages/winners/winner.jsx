import React from 'react'
import { Table } from "reactstrap";

function Winners() {
  return (
      <div className='winners mt-5'>
    <section className="nav-list fx fx-align fx-justify-space">
          <div className="title pl-2">Meet our latest winners</div>
        </section>
        <Table className="winners-table" borderless>
          <thead>
            <tr className="winners-table-heading">
              <th>Game</th>
              <th className='noMobile'>User</th>
              <th className='noMobile'>Game price</th>
              <th>Payout</th>
              <th className='noMobile'>Nationality</th>
            </tr>
          </thead>
          <tbody>
            {[0, 0, 0, 0, 0,0,0,0,0,0].map((item, i) => (
              <tr key={i} className='winnings'>
                <td>Game name</td>
                <td className='noMobile'>John Doe</td>
                <td className='noMobile'>₦5,000</td>
                <td>₦87,000</td>
                <td className='noMobile'>
                  <span>Nigeria</span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
  )
}

export default Winners