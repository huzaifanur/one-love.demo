import React, { useState } from "react";
import { FaHouseUser, FaRegClock } from "react-icons/fa";
import CalEventDialog from "./CalEventDialog";

const Card = ({
  item,
  description,
  title,
  dispDate,
  dispTime,
  location,
  host,
}: any) => {
  return (
    <div className="bg-lightblue relative ring-1 ring-navyblue space-y-4 m-4 rounded-lg w-[280px] h-[450px] p-3">
      <h3 className="text-2xl font-medium">{title}</h3>
      <p className="text-wrap">
        <span className="flex items-center mr-1">
          <FaRegClock className="mr-2" /> {dispDate}
        </span>
        at <span className="font-semibold">{location}</span>
      </p>
      <p>{description}</p>
      <p className="flex items-center">
        {<FaHouseUser className="mr-2" />}{" "}
        <span className="font-semibold">{host}</span>
      </p>
      <div className="absolute bottom-3 right-3">
        <CalEventDialog item={item} />
      </div>
    </div>
  );
};

export default Card;
