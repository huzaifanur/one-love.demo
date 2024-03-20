import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CreateEvent from "./CreateEvent";
import CalEvent from "./CalEvent";

const DialogRenderer = ({
  dialogInfo,
  toggleCalDialog,
  toggleCreateDialog,
  setDialog,
  date,
  info,
}: any) => {
  const closeCalEvent = () => {
    toggleCalDialog(false);
  };
  const closeCreateEvent = () => {
    toggleCreateDialog(false);
  };

  const handleCloseDialog = (_: any) => {
    setDialog({
      cal: false,
      create: false,
    });
  };

  return (
    <Dialog
      open={dialogInfo?.cal || dialogInfo?.create}
      onOpenChange={handleCloseDialog}
    >
      <DialogContent className="bg-bluetext w-fit p-10">
        {dialogInfo?.create ? (
          <CreateEvent closeEvent={closeCreateEvent} date={date} />
        ) : (
          <CalEvent closeInfo={closeCalEvent} info={info} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogRenderer;
