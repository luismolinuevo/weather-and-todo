import React, { useState, useEffect } from "react";

function LiveTime() {
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();

      let period = "am";
      let formattedHours = hours;

      if (hours >= 12) {
        period = "pm";
        formattedHours = hours % 12 || 12;
      }

      const formattedTime = `${formattedHours}:${minutes
        .toString()
        .padStart(2, "0")} ${period}`;

      setFormattedTime(formattedTime);
    };

    const timerId = setInterval(updateTime, 1000); 

    return () => clearInterval(timerId);
  }, []);

  return <span>{formattedTime}</span>;

}

export default LiveTime;
