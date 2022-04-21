import React, {useState, useRef} from 'react'
import Slider from '../slider'
import { Button, Table } from "reactstrap";
import NumberFormat from "react-number-format";
import { addToCart } from "../../store/cart";
import { toast, ToastContainer } from "react-toastify";
import { wrapper } from "../../store";

function Lobby({isFromLobbyDashboard, isFromDashboard, cartItem, showDataModal}) {
  const [activeClick, setActiveClick] = useState("");
  const cardRef = useRef([]);
    const cardsDemo = Array(20)
  .fill(0)
  .map((item) => ({
    image: "/assets/card.png",
    title: "Card name",
    price: "$10,000",
    id: 1,
  }));



  const slider = (i, direction, active) => {
    try {
      setActiveClick(active);
      if (direction === def.FORWARD) {
        cardRef.current[i].scrollLeft += 300;
      } else {
        cardRef.current[i].scrollLeft -= 300;
      }
    } catch (error) {
      console.log(error.message);
    }
    // console.log(cardRef.current[i]?.offsetWidth);
  };
  return (
      <>
    {["Popular", "Special", "Millonaire", "New release"].map(
            (title, i) => (
              <div className={`${isFromDashboard ? '' : 'd-none'} ${isFromLobbyDashboard ? 'd-block' : 'd-none'}`} key={i}>
                <section className="nav-list fx fx-align fx-justify-space mt-4">
                  <div className="title pl-2">{title}</div>
                  <div className="nav-icons">
                    <i
                      onClick={() => slider(i, def.BACKWARD, `${title}-left`)}
                      className={`ri-arrow-left-circle-line ${
                        activeClick === `${title}-left` && "active"
                      }`}
                    ></i>
                    <i
                      onClick={() => slider(i, def.FORWARD, `${title}-right`)}
                      className={`ri-arrow-right-circle-line ${
                        activeClick === `${title}-right` && "active"
                      }`}
                    ></i>
                  </div>
                </section>
                <section className="cards mt-2">
                  <div
                    ref={(e) => (cardRef.current[i] = e)}
                    className="overflow-slider"
                  >
                    {cardsDemo.map((item, i) => (
                      <div className="card-items" key={i}>
                        <img
                          onClick={() => showDataModal(item)}
                          src={item.image}
                          key={i}
                        />
                        <div className="mt-2">
                          <div className="name font-weight-bold my-2">
                            {item.title}
                          </div>
                          <div className="fx fx-align fx-justify-space">
                            <span className="price">
                              <NumberFormat
                                value={item.price}
                                displayType="text"
                                thousandSeparator={true}
                                prefix="₦"
                              />
                            </span>
                            <Button
                              onClick={() => cartItem(item)}
                              color="warning"
                            >
                              Add to cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )
          )}
          </>
  )
}

export default Lobby