/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
import { Button, Table } from "reactstrap";
import Footer from "../components/dashboard/footer";
import IconSearchBar from "../components/iconSearchBar";
import SlideShow from "../components/home/slideShow";
import Slider from "../components/slider";
import { useRef, useState } from "react";
import Buy from "../components/buy";
import Cart from "../components/dashboard/cart";
import Sports from "./sports";
import Family from "./family"
import Lobby from "../components/dashboard/lobby";
import FastCash from "./fast-cash";
import Millionaire from "./millionaire";
import Scholarship from "./Adventuree";
import NewRelease from "./NewRelease";
import Popular from "./Popular";
import def from "../services/enum";
import NumberFormat from "react-number-format";
import { addToCart } from "../store/cart";
import { toast, ToastContainer } from "react-toastify";
import { wrapper } from "../store";
import { graphql } from "../services/axios";
import { getAllGames } from "../store/graphql/home";

const imagesDemo = Array(6)
  .fill(0)
  .map((i) => ({ image: "/assets/slider.png" }));

// price: "$10,000",

const cardsDemo = Array(7)
  .fill(0)
  .map((e, i) => ({
    image: "/assets/card.png",
    title: "Millionaire’s game",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A mi mattis neque maecenas adipiscing donec. Nibh morbi vitae tincidunt turpis hendrerit sed hendrerit neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    sku: Math.random(), // something like SG-382369239732 unique
    price: "10000",
    category: "Sport",
    available: 34,
    id: i + 1,
  }));

const gameLinks = [
  { item: "Lobby", icon: "ri-bookmark-fill" },
  { item: "Trending", icon: "ri-fire-fill" },
  { item: "Sports", icon: "ri-football-fill" },
  { item: "Fast cash", icon:  "ri-currency-fill" },
  { item: "Millionaire", icon: "ri-money-dollar-box-fill" },
  { item: "Adventure", icon: "ri-earth-fill" },
  { item: "New Games", icon: "ri-install-fill" },
];

const testimonial = {
  message:
    "“Fastest cashout in the industry and best choice of games. Excellent customer service, very personable and helpful and they have some real nicebonuses all week long.”",
  stars: 5,
  nationality: "Nigeria",
  name: "John Doe",
};

function Home({ games }) {
  console.log(games);
  const [active, setActive] = useState("Lobby");
  const [BModal, setBModal] = useState(false);
  const [cardClicked, setCardClicked] = useState({});
  const [activeClick, setActiveClick] = useState("");
  const cardRef = useRef([]);

  const ActiveView = () => {
    switch(active) {
      case 'Lobby':
        return <Lobby 
        isFromLobbyDashboard={true}
        toggleBuyModal={toggleBuyModal}
        showDataModal={showDataModal}
        cartItem={cartItem} /> ;
      case 'Trending':
        return <Popular isFromDashboard={true}
        cartItem={cartItem} 
        toggleBuyModal={toggleBuyModal}
        showDataModal={showDataModal}
        modal={BModal}/>
      case 'Sports':
       return <Sports isFromDashboard={true}
       cartItem={cartItem} 
        toggleBuyModal={toggleBuyModal}
        showDataModal={showDataModal}
        modal={BModal}/>
      case "Fast cash" :
        return <FastCash isFromDashboard={true}
        cartItem={cartItem} 
        toggleBuyModal={toggleBuyModal}
        showDataModal={showDataModal}
        modal={BModal}/>;
      case "Millionaire" :
        return <Millionaire isFromDashboard={true}
        cartItem={cartItem} 
        toggleBuyModal={toggleBuyModal}
        showDataModal={showDataModal}
        modal={BModal}/>
      case "Adventure" :
        return <Scholarship isFromDashboard={true}
        cartItem={cartItem} 
        toggleBuyModal={toggleBuyModal}
        showDataModal={showDataModal}
        modal={BModal}/>
      case "New Games" :
        return <NewRelease isFromDashboard={true}
        cartItem={cartItem} 
        toggleBuyModal={toggleBuyModal}
        showDataModal={showDataModal}
        modal={BModal}/>
      default:
        return <null/>
    }
  }
  const setActiveLink = (val) => {
    setActive(val);
  };

  const toggleBuyModal = () => {
    setBModal(!BModal);
  };

  const showDataModal = (obj) => {
    setCardClicked(obj);
    setBModal(true);
  };

  const cartItem = (obj) => {
    let json = {
      id: obj.id,
      quantity: obj.quantity || 1,
      image: obj.image,
      category: obj.category,
      title: obj.title,
      price: obj.price,
      sku: obj.sku,
    };
    addToCart(json);
    toast.success("Card added to cart", { autoClose: 2000, theme: "colored" });
  };

  const slider = (i, direction, active) => {
    try {
      setActiveClick(active);
      if (direction === def.FORWARD) {
        cardRef.current[i].scrollLeft += 300;
      } else {
        cardRef.current[i].scrollLeft -= 300;
      }
    } catch (error) {}
  };

  return (
    <div className="home-container">
      <ToastContainer />
      <div className="home pb-4">
        <section className="slides">
          <SlideShow images={imagesDemo} />
        </section>
        <div className="bottom">
          {/* <section className="search">
            <IconSearchBar placeholder="Search game" />
          </section> */}
          <section className="game-nav">
            <Slider
              className="home-slider"
              itemsClass="link-items no-break"
              type={def.STRING}
              active={active}
              onClick={setActiveLink}
              items={gameLinks}
            />
          </section>
          <div className="">
             {ActiveView()}
          </div>
          <section className="nav-list fx fx-align fx-justify-space mt-5">
            <div className="title pl-2">Meet our latest winners</div>
          </section>
          <div className="flexible-table">
            <table className=" mt-2 no-break">
              <thead>
                <tr>
                  <th>Game</th>
                  <th className="noMobile">User</th>
                  <th className="noMobile">Game price</th>
                  <th>Payout</th>
                  <th className="noMobile">Nationality</th>
                </tr>
              </thead>
              <tbody>
                {[0, 0, 0, 0, 0].map((item, i) => (
                  <tr key={i}  className='winnings'>
                    <td>Game name</td>
                    <td className="noMobile">John Doe</td>
                    <td className="noMobile">₦5,000</td>
                    <td>₦87,000</td>
                    <td className="noMobile">
                      <span>Nigeria</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <section className="nav-list my-5">
            <h2 className="text-center">The Winner&apos; Club</h2>
            <p className="text-center">
              Read what our winners have to say about us.
            </p>
          </section>
          <section className="cards my-4">
            <Slider
              className="slider"
              type={def.TESTIMONY}
              items={[1, 1, 1, 1, 1, 1].map((n) => testimonial)}
              itemsClass="testimony-items"
            />
          </section>
        </div>
      </div>
      <Footer />
      <Buy
        addToCart={cartItem}
        data={cardClicked}
        toggle={toggleBuyModal}
        modal={BModal}
      />
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      let games = [];
      // games = await graphql(getAllGames)();
      // if (!games.error) {
      //   games = games.data[Object.keys(games.data)[0]];
      // }
      return {
        props: {
          games,
        },
      };
    }
);

export default Home;
