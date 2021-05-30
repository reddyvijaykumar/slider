import React from "react";
import Model from "./component/model/Model";
import { data } from "./component/data";
import "./App.css";

const App = () => {
  // console.log(data);
  return (
    <div className="container">
      <Model data={data} min={0} max={100} />
    </div>
  );
};

export default App;
