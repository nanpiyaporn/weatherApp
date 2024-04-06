import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import CoinChart from './CoinChart'; // Make sure to import CoinChart

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function weatherDetail() {
  let params = useParams();
  const [fullDetails, setFullDetails] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      const details = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${params.symbol}&units=metric&appid=${API_KEY}`
      );
      const description = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${params.symbol}&units=metric&appid=${API_KEY}`
      );

      const detailsJson = await details.json();
      const descripJson = await description.json();

      setFullDetails({ "numbers": detailsJson, "textData": descripJson });
    };

    getDetail().catch(console.error);
  }, [params.symbol]);

  if (!fullDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>{fullDetails.textData.name}</h1>

      <div> {fullDetails.textData.weather[0].description}</div>
      <br></br>
      <div>
        {fullDetails.textData.weather[0].main}{" "}
      </div>
      <table>
        <tbody>

        </tbody>
      </table>
      {/*<CoinChart
        symbol={params.symbol}
        market={fullDetails.numbers.main.temp}
  />*/}
    </>
  );
}

export default weatherDetail;