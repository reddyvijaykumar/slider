import React, { useCallback, useEffect, useState, useRef } from "react";
import "./Model.css";
import Modal from "react-modal";

const Model = ({ data, min, max }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [swipeModel, setSwipeModel] = useState(false);
  const [height, setHeight] = useState(false);
  const [summary, setSummary] = useState([]);

  // slider
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  const summaryHandler = (feature) => {
    if (feature) {
      setSummary(feature);
    }
  };

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    summaryHandler();
  });

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  return (
    <div style={{ position: "relative" }}>
      <button
        style={{ position: "absolute", top: "40vh" }}
        onClick={() => setModalIsOpen(true)}
      >
        Open modal
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          // overlay: {
          //   position: "fixed",
          //   top: "0px",
          //   right: "0px",
          //   bottom: "0px",
          //   left: "0px",
          //   backgroundColor: "rgba(255,255,255,0.3)",
          // },
          content: {
            border: "none",
            backgroundColor: "rgba(255,255,255,0.3)",
            // position: "absolute",
            // top: "0px",
            // right: "0px",
            // bottom: "0px",
            // left: "0px",
            // borderRadius: "4px",
            // outline: "none",
            // padding: "20px 20px 20px 20px",
          },
        }}
      >
        <div
          className={`model ${height ? "model-height" : "model-height-normal"}`}
        >
          {/* <div className="model"> */}
          <div className="model-container">
            <button
              className="close"
              onClick={() => {
                setModalIsOpen(false);
                setSwipeModel(false);
                setHeight(false);
              }}
            >
              &times;
            </button>
            <div
              className={`swipe ${swipeModel ? "swipe-left" : "swipe-right"}`}
            >
              {/* FEATURES */}
              <div className="model-features">
                {data.map((item, index) => {
                  return (
                    <p className="feature-title" key={index}>
                      {item.study_name}
                    </p>
                  );
                })}
                {/* <button
                  className="feature-close"
                  onClick={() => setModalIsOpen(false)}
                >
                  X
                </button> */}
                {/* <div className="feature-title-close"></div> */}
                <div className="list">
                  <ul>
                    {data.map((item, index) => {
                      return item.features.map((feature, index) => {
                        return (
                          <li key={index}>
                            <button
                              onClick={() => {
                                setSwipeModel(true);
                                summaryHandler(feature.summary);
                                // heightHandler(true);
                                setHeight(true);
                              }}
                            >
                              {feature.name}
                            </button>
                            <span>
                              <button
                                onClick={() => {
                                  setSwipeModel(true);
                                  summaryHandler(feature.summary);
                                  // heightHandler(false);
                                  setHeight(true);
                                }}
                              >
                                &rang;
                              </button>
                            </span>
                          </li>
                        );
                      });
                    })}
                  </ul>
                </div>
              </div>

              {/* SUMMARY */}
              <div className="model-summary">
                <div className="heading">
                  <button
                    onClick={() => {
                      setSwipeModel(false);
                      setHeight(false);
                    }}
                  >
                    &lang;
                  </button>
                  <p>
                    <span> Subject</span> <span>Ages</span>
                  </p>
                </div>

                <p id="title">SUMMARY</p>
                <div className="summary">
                  <ul>
                    {summary.map((result, index) => {
                      return (
                        <li key={index}>
                          <span>{result.type}</span> <span>{result.value}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="cut-off">
                  <p>SET CUTOFF</p>
                  <p>
                    Minimum value <span>{minVal}</span>
                  </p>
                  <p>
                    Maximum value <span>{maxVal}</span>
                  </p>

                  {/* SLIDER */}
                  <div className="dual-range">
                    <input
                      type="range"
                      min={min}
                      max={max}
                      value={minVal}
                      onChange={(event) => {
                        const value = Math.min(
                          Number(event.target.value),
                          maxVal - 1
                        );
                        setMinVal(value);
                        minValRef.current = value;
                      }}
                      className="thumb thumb--left"
                      style={{ zIndex: minVal > max - 100 && "5" }}
                    />
                    <input
                      type="range"
                      min={min}
                      max={max}
                      value={maxVal}
                      onChange={(event) => {
                        const value = Math.max(
                          Number(event.target.value),
                          minVal + 1
                        );
                        setMaxVal(value);
                        maxValRef.current = value;
                      }}
                      className="thumb thumb--right"
                    />
                    <div className="slider">
                      <div className="slider__track" />
                      <div ref={range} className="slider__range" />
                      <div className="slider__left-value">MIN</div>
                      <div className="slider__right-value">MAX</div>
                      {/* <div className="slider__left-value">{minVal}</div>
                      <div className="slider__right-value">{maxVal}</div> */}
                    </div>
                  </div>
                </div>

                <div className="action">
                  <button>Apply</button>
                  <button>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Model;
