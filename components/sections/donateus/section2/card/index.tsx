import React from "react";

const Card = ({ amount, benefits, type }: any) => {
  return (
    <div className="bg-lightblue p-6 rounded-lg max-w-[300px]">
      <h3 className="text-2xl text-center font-semibold">{type}</h3>
      <div className="h-1 w-16 mt-1 mb-4 m-auto bg-green-500" />
      <h2 className="text-4xl font-bold text-center">
        $ {amount}
        <span className="text-3xl font-normal">/yr</span>
      </h2>
      <p className="mt-8 text-lg text-center font-semibold">Benefits</p>
      <ul className="list-disc mx-7  mb-12 text-lg">
        {benefits?.map((benefit: string) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>
      <button className="w-full bg-navyblue text-white font-bold p-2 rounded-md">
        Donate
      </button>
    </div>
  );
};

export default Card;
