import React, { useState, useEffect } from "react";

//Allows me to get the live time on New York
function LiveTime() {
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const currentTime = new Date();
      const nycTime = new Date(currentTime.toLocaleString("en-US", { timeZone: "America/New_York" }));

      const hours = nycTime.getHours();
      const minutes = nycTime.getMinutes();

      let period = "am";
      let formattedHours = (hours % 12) || 12;

      if (hours >= 12) {
        period = "pm";
      }

      const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;

      setFormattedTime(formattedTime);
    };

    const timerId = setInterval(updateTime, 1000);

    return () => clearInterval(timerId);
  }, []);

  return <span>{formattedTime}</span>;
}

export default LiveTime;

