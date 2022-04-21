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

function Family({isFromDashboard}) {
  const [BModal, setBModal] = useState(false);

  const toggleBuyModal = () => {
    setBModal(!BModal);
  };
  return (
    <div className="activepages">
     <div className={`sports spacing ${isFromDashboard ? 'mt-n5' : ''}`}>
      <h2 className={`${isFromDashboard ? 'mb-3' : 'mt-5 mb-3'} `}>Family</h2>
      <div className="sports-container">
        <IconSearchBar placeholder="Search for any game"  className="sport-search notMobile"/>
        <div className="cards">
          {cardsDemo.map((item, i) => (
            <div
            onClick={() => toggleBuyModal(item)}
              className="card-items no-break"
              key={i}
            >
              <img src={item.image} key={i} />
              <div className="mt-3">
                <div className="font-weight-bold my-2 title">{item.title}</div>
                <div className="fx fx-align fx-justify-space">
                  <span className="price">{item.price}</span>
                  <Button color="warning">Add to cart</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <Buy toggle={toggleBuyModal} modal={BModal} />
    </div>
    </div>
  );
}

export default Family;
