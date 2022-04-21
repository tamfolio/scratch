import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';

const indicatorStyles = {
  background: '#fff',
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  display: 'inline-block',
  margin: '0 4px',
};

function SlideShow({ images, imageStyle, containerStyle }) {
  const [image, setimage] = useState(images);
  const [arrow, setarrow] = useState(false);
  const [width, setWidth] = useState(70);
  useEffect(() => {
    setimage(images)
  }, [images])

  const changingSlideW = (wth) => {
    if (wth < 1000 && wth > 980) {
      setWidth(93)
      setarrow(false)
    } else if (wth > 1000 && wth < 1020) {
      setWidth(70)
      setarrow(true)
    }
  }

  useEffect(() => {
    let wt = window.innerWidth;
    if (wt > 1000) {
      setWidth(70)
      setarrow(true)
    } else {
      setWidth(93)
      setarrow(false)
    }
    
    window.onresize = () => {
      const wth = window.innerWidth;
      changingSlideW(wth)
    }
  }, []);

  return (
    <div style={{ padding: "0", marginTop: "44px", borderRadius: '10px', overflow: "hidden", ...containerStyle }}>
      <Carousel
        useKeyboardArrows
        statusFormatter={(current, total) => ''}
        infiniteLoop={true}
        autoPlay={true} showArrows={arrow} showThumbs={false}
        interval={4500} autoFocus={true}
        centerMode
        centerSlidePercentage={width}
        renderIndicator={
          (onClickHandler, isSelected, index, label) => {
            if (isSelected) {
              return (
                <li
                  style={{ ...indicatorStyles, background: '#f47621', animation: 'slideInd 2s' }}
                  aria-label={`Selected: ${label} ${index + 1}`}
                  title={`Selected: ${label} ${index + 1}`}
                />
              );
            }
            return (
              <li
                style={indicatorStyles}
                onClick={onClickHandler}
                onKeyDown={onClickHandler}
                centerMode={true}
                centerSlidePercentage={70}
                value={index}
                key={index}
                role="button"
                tabIndex={0}
                title={`${label} ${index + 1}`}
                aria-label={`${label} ${index + 1}`}
              />
            );

          }
        }
      >
        {image && image.map((data, idx) => (
          <img className='slide-image' key={idx} style={imageStyle} src={data.image} alt='' />
        ))}
      </Carousel>
    </div>

  )
}

export default SlideShow
