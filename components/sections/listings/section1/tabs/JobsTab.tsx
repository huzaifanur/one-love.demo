import React, { useState } from "react";
import JobCards from "../cards/jobCards";
import JobDialog from "../dialog/Job";
import CreateJobDialog from "../dialog/CreateJob";

const JobsTab = ({ jobs }: any) => {
  const [openJob, setOpenJob] = useState({ bool: false, info: null });

  const handleOpenJobDialog = (_job: any) => {
    setOpenJob({
      bool: true,
      info: _job,
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
      <CreateJobDialog />
      <p className="text-navyblue my-4 text-center mx-auto max-w-[80%]">
        Are you a parent or guardian in need of a caring and experienced
        professional to work with your disabled son or daughter? Browse through
        our job listings to find the perfect match for your family&apos;s needs
      </p>
      <div className="grid grid-cols-3 gap-4 ">
        {jobs?.map((job: any) => {
          return (
            <JobCards
              handleOpenDialog={handleOpenJobDialog}
              key={job?._id}
              info={job}
            />
          );
        })}
        <JobDialog
          open={openJob?.bool}
          closeDialog={handleCloseJobDialog}
          jobInfo={openJob?.info}
        />
      </div>
    </div>
  );
};

export default JobsTab;
