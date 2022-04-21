/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import def from "../services/enum";

function Slider({ items, itemsClass, className, type, active, onClick }) {
  const [state, setstate] = useState(items);
  const [activeLink, setActiveLink] = useState(active);
  useEffect(() => {
    setstate(items);
  }, [items]);
  useEffect(() => {
    setActiveLink(active);
  }, [active]);

  return (
    <div className={`overflow-slider ${className}`}>
      {state &&
        state.map((item, i) =>
          type === def.IMAGE ? (
            <img className={itemsClass} src={item.image} key={i} />
          ) : type === def.TESTIMONY ? (
            <div className={itemsClass} key={i}>
              <p>{item.message}</p>
              <div className="stars">
                {Array(item.stars)
                  .fill(0)
                  .map((v, n) => (
                    <i key={n} className="ri-star-fill"></i>
                  ))}
              </div>
              <div className="user mt-2">
                <span className="flag"></span>
                <span className="name">{item.name}</span>
              </div>
            </div>
          ) : (
            <div
              onClick={() => onClick(item.item)}
              className={`${itemsClass} ${
                item.item === activeLink && "active"
              }`}
              key={i}
            >
              <i className={item.icon}></i>
              <h6>{item.item}</h6>
            </div>
          )
        )}
    </div>
  );
}

export default Slider;
