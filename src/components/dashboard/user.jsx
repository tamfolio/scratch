import React from 'react'

function User({ showLeftSideBar}) {
  return (
    <div className="dashboard-nav-data">
          <div className="nav-component">
          <h5 className="mt-4 mb-3">Welcome</h5>
          <button onClick={() => !showLeftSideBar()}>
          <i className="ri-close-line menu-icon"></i>
          </button>
          </div>
          <div className="account-balance">
            <span className="main-balance">Main account: ₦50,000</span>
            <span className="bonus-balance">Bonus account: ₦5,000</span>
          </div>
        </div>
  )
}

export default User