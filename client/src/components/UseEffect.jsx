import React, { useEffect, useState } from "react";

function UseEffectCleanUp() {
  const [width, setWidth] = useState(window.innerWidth);

  const checkSize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", checkSize);

    // clean up function
    return () => {
      console.log("cleanup");
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  useEffect(() => {
    console.log("useEffect is called");
  }, []);

  return (
    <div className="h-screen flex flex-wrap gap-5 justify-center content-center">
      <h1>Window width : {width}</h1>
    </div>
  );
}

export default UseEffectCleanUp;
