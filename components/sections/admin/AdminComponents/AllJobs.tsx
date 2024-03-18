"use client";
import { useState } from "react";
import * as React from "react";

import UpdateJob from "./UpdateJob";
import "./joblistings.css";

import Table from "./Table";

export default function AllJobs() {
  // const [allJobs, setAllJobs] = React.useState();
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});

  const [data, setData] = useState<any>(null);

  const [filter, setFilter] = React.useState("all");

  console.log("filter,", filter);
  // console.log("alljobs", allJobs);

  const handleUpdateButton = (job: any) => {
    setSelectedJob(job);
    setShowCreateJob(!showCreateJob);
  };

  const fetcher = async (url: any) => {
    const response = await fetch(url);
    const data = await response.json();
    setData(data.data);
  };

  React.useEffect(() => {
    fetcher(`${process.env.NEXT_PUBLIC_API_HOST}/listing/all`);
  }, []);

  return showCreateJob ? (
    <div>
      <UpdateJob
        selectedJob={selectedJob}
        onSuccess={() => {
          setShowCreateJob(!showCreateJob);
        }}
      />
    </div>
  ) : (
    <div className="flex flex-col mt-3 items-center w-full">
      <div className="w-[700px] overflow-scroll">
        <h2 className="text-navyblue mt-4 text-4xl font-semibold text-center">
          Job Listing
        </h2>
        <div className="selection-field">
          <label htmlFor="options" className="font-medium">
            Filter:
          </label>
          <select
            id="options"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="select ring-1 ml-2 rounded-md p-2 ring-black"
          >
            <option value="all">All Jobs</option>
            <option value="approved">Approved Jobs</option>
            <option value="pending">Pending Jobs</option>
          </select>
        </div>

        <Table
          data={
            filter === "all"
              ? data
              : data.filter((job: any) => job.status === filter)
          }
          handleUpdateButton={handleUpdateButton}
        />
      </div>
    </div>
  );
}
