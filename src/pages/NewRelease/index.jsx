import React, { useState } from "react";
import { Button } from "reactstrap";
import Buy from "../../components/buy";
import Footer from "../../components/dashboard/footer";
import IconSearchBar from "../../components/iconSearchBar";

const cardsDemo = Array(20)
  .fill(0)
  .map((item) => ({
    image: "/assets/card.png",
    title: "Card name",
    price: "$10,000",
    id: 1,
  }));

function NewRelease({isFromDashboard, cartItem, toggleBuyModal, showDataModal, BModal}) {
return (
    <div className="activepages">
     <div className={`sports spacing ${isFromDashboard ? 'mt-n5' : ''}`}>
      <h2 className={`${isFromDashboard ? 'mb-3' : 'mt-5 mb-3'} `}>New Games</h2>
      <div className="sports-container">
        <IconSearchBar
          placeholder="Search for any game"
          className="sport-search"
        />
         <div className="cards">
          {cardsDemo.map((item, i) => (
            <div
              className="card-items no-break"
              key={i}
            >
              <img onClick={() => showDataModal(item)}
              src={item.image}
              key={i}/>
              <div className="mt-3">
                <div className="font-weight-bold my-2 title">{item.title}</div>
                <div className="fx fx-align fx-justify-space">
                  <span className="price">{item.price}</span>
                  <Button onClick={() => cartItem(item)}
                    color="warning">Add to cart</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Buy toggle={toggleBuyModal} modal={BModal} />
    </div>
    </div>
  );
}

export default NewRelease;
