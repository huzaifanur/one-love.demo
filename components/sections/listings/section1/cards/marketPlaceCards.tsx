import React from "react";
import heartCardContact from "@/assets/images/heartCardContact.jpeg";
import Image from "next/image";
const MarketPlaceCard = ({ info, handleOpenDialog }: any) => {
  return (
    <div
      onClick={() => {
        handleOpenDialog(info);
      }}
      className="max-w-[340px] bg-lightblue ring-1 ring-navyblue rounded-lg m-2 p-3 cursor-pointer"
    >
      <Image src={heartCardContact} alt="fallback" width={340} height={200} />
      <h3 className="text-2xl mt-2 font-semibold text-navyblue">
        {info?.title.slice(0, 23)}
        {info?.title.length > 23 && "..."}
      </h3>
      <h4 className="text-navyblue">
        {info?.description.slice(0, 160)}
        {info?.description.length > 160 && "..."}
      </h4>
      <h6 className="text-navyblue">
        <b>Location : </b>
        {info?.location}
      </h6>
      <div className="ring-1 rounded-sm mt-3 ring-yellow-700 relative p-2">
        <p className="text-yellow-700 absolute top-[-11px] bg-lightblue w-fit text-sm">
          Author Details
        </p>
        <h6 className="text-sm text-yellow-700">
          <b>Posted by : </b>
          {info?.posted_by}
        </h6>
        <h6 className="text-sm text-yellow-700">
          <b>Email : </b>
          {info?.email}
        </h6>
      </div>
    </div>
  );
};

export default MarketPlaceCard;
