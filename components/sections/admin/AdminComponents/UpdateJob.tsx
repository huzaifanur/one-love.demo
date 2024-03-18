import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Trigger } from "@radix-ui/react-dialog";
import * as React from "react";

const UpdateJob = ({ selectedJob, onSuccess }: any) => {
  const [status, setStatus] = React.useState("");

  const handleSubmit = (id: any) => {
    console.log(id);
    let url = `${process.env.NEXT_PUBLIC_API_HOST}/listing/approve/${id}`;
    try {
      fetch(url, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ status: status }),
      })
        .then((res) => res.json())
        .then((data) => data?.success && onSuccess());
    } catch (error) {
      console.log(error);
    }
  };

  const card = (
    <React.Fragment>
      <div>
        <h5 className="text-2xl text-center font-medium">Update Job</h5>
        <p>Title : {selectedJob.title}</p>
        <p>Description : {selectedJob.description}</p>
        <div className="flex">
          <label htmlFor="options">Update status : </label>
          <select
            id="options"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="select ring-1 ring-black w-48 rounded-sm p-1 ml-2"
          >
            <option value={""} disabled>
              None
            </option>
            <option value="approved">approve</option>
            <option value="rejected">reject</option>
            <option value="archived">archive</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          className="uppercase bg-navyblue hover:bg-[#363a78] text-white font-semibold p-2 rounded-md"
          onClick={() => handleSubmit(selectedJob._id)}
        >
          Approve
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Dialog open>
      <DialogContent closeButtonClasses="hidden" className="bg-lightblue">
        {card}
      </DialogContent>
    </Dialog>
  );
};

export default UpdateJob;
