import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

function Qr() {
  const [data, setData] = useState("No result");

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <video src="" id="video"></video>
        <p>{data}</p>
      </div>
      <QrReader
        className="h-0 w-0"
        onResult={(result, error) => {
          if (!!result) {
            console.log(result);
            setData(result?.text);
          }
        }}
      />
    </>
  );
}

export default Qr;
