import React from "react";
import { QrReader } from "react-qr-reader";
import { useHistory } from "react-router-dom";

function Qr() {
  const history = useHistory();

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <video className="" id="video"></video>
      </div>

      <QrReader
        className="h-0 w-0"
        onResult={(result, error) => {
          if (!!result) {
            history.push(`/${result.text}`);
          }
        }}
      />
    </>
  );
}

export default Qr;
