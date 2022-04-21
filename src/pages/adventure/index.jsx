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

function Adventure() {
  const [BModal, setBModal] = useState(false);

  const toggleBuyModal = () => {
    setBModal(!BModal);
  };

  return (
    <div className="sports">
      <h2>Adventure</h2>
      <div className="sports-container mt-4">
        <IconSearchBar placeholder="Search for any game" />
        <div className="cards mt-4">
          {cardsDemo.map((item, i) => (
            <div
            onClick={() => toggleBuyModal(item)}
              className="card-items no-break"
              key={i}
            >
              <img src={item.image} key={i} />
              <div className="mt-3">
                <div className="font-weight-bold my-2">{item.title}</div>
                <div className="fx fx-align fx-justify-space">
                  <span className="price">{item.price}</span>
                  <Button color="warning">Add to cart</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Buy toggle={toggleBuyModal} modal={BModal} />
    </div>
  );
}

export default Adventure;
