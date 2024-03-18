"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, { useState } from "react";
import CalEvent from "../section1/dialogs/CalEvent";

const CalEventDialog = ({ item }: any) => {
  const [openDialog, setOpenDialog] = useState(false);
  const closeCalEvent = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <button
        className="bg-navyblue float-end text-white p-2 rounded-md ring-1 ring-bluetext"
        onClick={handleOpenDialog}
      >
        View Details
      </button>
      <DialogContent className="bg-bluetext w-fit p-10">
        <CalEvent closeInfo={closeCalEvent} info={item} />
      </DialogContent>
    </Dialog>
  );
};

export default CalEventDialog;
