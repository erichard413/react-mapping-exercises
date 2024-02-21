import { useRef } from "react";
import { Point } from "./point";
import { Line } from "./line";

export function AddressInput({ setPoints, setLines }) {
  const URL = "https://geocode.maps.co/search?";
  // example: https://geocode.maps.co/search?q=address&api_key=api_key
  const APIKEY = "65d52edcb27d7716893779jcme710d4";
  const addrRef = useRef();
  const colorRef = useRef();
  const addrFromRef = useRef();
  const addrToRef = useRef();
  const colorLineRef = useRef();

  const handleSubmit = async e => {
    e.preventDefault();
    let res = await doGeoCode(addrRef.current.value);
    const { lat, lon, display_name } = res[0];
    const newPoint = new Point(lat, lon, display_name, colorRef.current.value);
    setPoints(d => {
      return [...d, newPoint];
    });
  };

  const handleLineSubmit = async e => {
    e.preventDefault();
    const fromRes = await doGeoCode(addrFromRef.current.value);
    const from = fromRes[0];

    setTimeout(async () => {
      const toRes = await doGeoCode(addrToRef.current.value);
      const to = toRes[0];
      const line = new Line(
        from.lat,
        from.lon,
        to.lat,
        to.lon,
        colorLineRef.current.value
      );
      setLines(l => [...l, line]);
    }, 2000);
  };

  const doGeoCode = async addr => {
    try {
      const res = await fetch(`${URL}q=${addr}&api_key=${APIKEY}`);
      const jsonData = await res.json();
      return jsonData;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="AddressInput">
      <div className="marker-form">
        <h3>Make a marker:</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="address">Address</label>
          <input type="text" name="address" ref={addrRef} />
          <label htmlFor="address">Color</label>
          <input type="color" name="color" ref={colorRef} />
          <button>Submit</button>
        </form>
      </div>
      <div className="line-form">
        <h3>Point to point:</h3>
        <form onSubmit={handleLineSubmit}>
          <label htmlFor="addressFrom">Address From:</label>
          <input type="text" name="addressFrom" ref={addrFromRef} />
          <label htmlFor="addressTo">Address To:</label>
          <input type="text" name="addressTo" ref={addrToRef} />
          <label htmlFor="address">Color</label>
          <input type="color" name="color" ref={colorLineRef} />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}
