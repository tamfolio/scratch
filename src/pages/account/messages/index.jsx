import React from "react";

function Messages() {
  return (
    <div className="account messages">
      <section className="account-left">
        <h5>My messages</h5>
        <div className="message-box mt-4">
          {/* <div className="item empty">There’s nothing to see here yet..</div> */}
          <p className="heading text-orange mb-3">UNREAD MESSAGES</p>
          <div className="item new mb-2">
            <div className="date mb-2">21.03.2022 18:35</div>
            <div className="head mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. A mi
              mattis neque maecenas adipiscing donec nibh morbi vitae.
            </div>
            <div className="body mb-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. A mi
              mattis neque maecenas adipiscing donec. Nibh morbi vitae tincidunt
              turpis hendrerit sed hendrerit neque.
            </div>
          </div>
          <div className="item new mb-2">
            <div className="date mb-2">21.03.2022 18:35</div>
            <div className="head new mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. A mi
              mattis neque maecenas adipiscing donec nibh morbi vitae.
            </div>
            <div className="body mb-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. A mi
              mattis neque maecenas adipiscing donec. Nibh morbi vitae tincidunt
              turpis hendrerit sed hendrerit neque.
            </div>
          </div>
          <p className="heading text-grey mt-5 mb-3">OTHER MESSAGES</p>
          <div className="item mb-2">
            <div className="date mb-2">21.03.2022 18:35</div>
            <div className="head new mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. A mi
              mattis neque maecenas adipiscing donec nibh morbi vitae.
            </div>
            <div className="body mb-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. A mi
              mattis neque maecenas adipiscing donec. Nibh morbi vitae tincidunt
              turpis hendrerit sed hendrerit neque.
            </div>
          </div>
          <div className="item mb-2">
            <div className="date mb-2">21.03.2022 18:35</div>
            <div className="head new mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. A mi
              mattis neque maecenas adipiscing donec nibh morbi vitae.
            </div>
            <div className="body mb-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. A mi
              mattis neque maecenas adipiscing donec. Nibh morbi vitae tincidunt
              turpis hendrerit sed hendrerit neque.
            </div>
          </div>
        </div>
      </section>
      <section className="account-right">
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
export default Messages;
