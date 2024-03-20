import React, { useState } from "react";
import ProductDialog from "../dialog/Product";
import MarketPlaceCard from "../cards/marketPlaceCards";
import CreateProductDialog from "../dialog/CreateProduct";

const MarketPlaceTab = ({ items }: any) => {
  const [openJob, setOpenJob] = useState({ bool: false, info: null });

  const handleOpenJobDialog = (_item: any) => {
    setOpenJob({
      bool: true,
      info: _item,
    });
  };

  const handleCloseJobDialog = () => {
    setOpenJob({
      bool: false,
      info: null,
    });
  };

  return (
    <div className="mt-4 relative">
      <CreateProductDialog />
      <p className="text-navyblue my-4 text-center mx-auto max-w-[80%]">
        Explore our marketplace to buy and sell disability-related equipment
        such as wheelchairs, walkers, and more. Find the equipment you need or
        declutter your home by selling items you no longer use
      </p>
      <div className="grid grid-cols-3 gap-4 ">
        {items?.map((item: any) => {
          return (
            <MarketPlaceCard
              handleOpenDialog={handleOpenJobDialog}
              key={item?._id}
              info={item}
            />
          );
        })}
        <ProductDialog
          open={openJob?.bool}
          closeDialog={handleCloseJobDialog}
          jobInfo={openJob?.info}
        />
      </div>
    </div>
  );
};

export default MarketPlaceTab;
