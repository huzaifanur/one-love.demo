import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";
import heartCardContact from "@/assets/images/heartCardContact.jpeg";

const ProductDialog = ({ open, closeDialog, jobInfo }: any) => {
  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent
        closeButtonClasses="top-[4px] right-[4px]"
        className="bg-lightblue"
      >
        <Image src={heartCardContact} alt="fallback" width={500} height={200} />
        <h3 className="text-2xl font-semibold text-navyblue">
          {jobInfo?.title.slice(0, 23)}
        </h3>
        <h4 className="text-navyblue">{jobInfo?.description.slice(0, 160)}</h4>
        <h6 className="text-navyblue">
          <b>Location : </b>
          {jobInfo?.location}
        </h6>
        <div className="ring-1 rounded-sm mt-3 ring-yellow-700 relative p-2">
          <p className="text-yellow-700 absolute top-[-11px] bg-lightblue w-fit text-sm">
            Author Details
          </p>
          <h6 className="text-sm text-yellow-700">
            <b>Posted by : </b>
            {jobInfo?.posted_by}
          </h6>
          <h6 className="text-sm text-yellow-700">
            <b>Email : </b>
            {jobInfo?.email}
          </h6>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
