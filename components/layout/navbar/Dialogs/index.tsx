import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Signup from "./Signup";
import Login from "./Login";

const DialogRenderer = ({
  dialogInfo,
  setLoginToggle,
  setSignupToggle,
  setDialog,
}: any) => {
  const closeLogin = () => {
    setLoginToggle(false);
    window.location.reload();
  };
  const closeSignup = () => {
    setSignupToggle(false);
    window.location.reload();
  };

  const handleCloseDialog = (_: any) => {
    setDialog({
      signIn: false,
      signUp: false,
    });
  };

  return (
    <Dialog
      open={dialogInfo?.signIn || dialogInfo?.signUp}
      onOpenChange={handleCloseDialog}
    >
      <DialogContent className="bg-bluetext w-fit p-10">
        {dialogInfo?.signUp ? (
          <Signup closeSignup={closeSignup} />
        ) : (
          <Login closeLogin={closeLogin} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogRenderer;
