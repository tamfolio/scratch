import React from "react";

const playRule = [
  {
    icon: "ri-file-search-line",
    head: "Select Game",
    detail: "Choose your preferred game that you will love to win.",
  },
  {
    icon: "ri-file-paper-2-line",
    head: "Buy Game Card",
    detail:
      "Make payment for your chosen game that is waiting to change your life for good.",
  },
  {
    icon: "ri-video-chat-line",
    head: "Play Online",
    detail:
      "Enjoy your gaming experience playing online via video call real time with a game master.",
  },
  {
    icon: "ri-goblet-fill",
    head: "Win",
    detail:
      "Win your game and get credited instantly. For every game purchase you are a winner.",
  },
];


function HowToPlay() {
  return (
    <>
      <div className="how-to-play mt-5">
        <h4>How To Play</h4>
        <p>
          <small>4 SIMPLE STEPS TO START WINNING</small>
        </p>
        <div className="how-tos">
          {playRule.map((item, i) => (
            <div key={i} className="item">
              <i className={item.icon}></i>
              <h5 className="mt-3">{item.head}</h5>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="how-to-play-footer">
        <h3 className="mb-3">We are committed to excellence</h3>
        <p>TRANSPARENCY. RELIABILITY. GRANDEUR.</p>
        <p className="text-grey">
          We thrive on the transparency of our process and the life changing
          stories of our winners. <br /> We strive to provide you with the
          absolute best of the online gaming experience from the comfort of your
          home.
        </p>
      </div>
    </>
  );
}

export default HowToPlay;
