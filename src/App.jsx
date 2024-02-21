import MapChart from "./MapChart";
import { useState } from "react";
import { AddressInput } from "./AddressInput";

function App() {
  const [points, setPoints] = useState([]);
  const [lines, setLines] = useState([]);

  return (
    <>
      <AddressInput setPoints={setPoints} setLines={setLines} />
      <MapChart points={points} lines={lines} />
    </>
  );
}

export default App;
