"use client";
import * as React from "react";
import "./joblistings.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ListTable = ({ data, handleUpdateButton }: any) => {
  return (
    <div className="max-h-[550px] overflow-scroll mx-auto ">
      <Table className="" aria-label="simple table">
        <TableHeader className="bg-navyblue">
          <TableRow>
            <TableHead className="text-white uppercase font-semibold">
              Title
            </TableHead>
            <TableHead
              className="text-white uppercase font-semibold"
              align="left"
            >
              Description
            </TableHead>
            <TableHead
              className="text-white uppercase font-semibold"
              align="center"
            >
              Type
            </TableHead>
            <TableHead
              className="text-white uppercase text-center font-semibold"
              align="center"
            >
              Status
            </TableHead>
            <TableHead className="text-white uppercase text-center font-semibold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-blue text-gray-100">
          {data?.map((job: any) => (
            <TableRow key={job._id}>
              <TableCell scope="row">{job.title}</TableCell>
              <TableCell align="left">{job.description}</TableCell>
              <TableCell align="center">{job.type}</TableCell>

              <TableCell className="uppercase" align="center">
                {job.status}
              </TableCell>
              <TableCell align="center" className="update-btn-wrapper">
                <button
                  onClick={() => handleUpdateButton(job)}
                  disabled={job.status === "approved"}
                  className={`p-2 ring-1 ring-navyblue ${
                    job.status !== "approved" &&
                    "bg-navyblue hover:bg-[#363a78]"
                  } text-white font-semibold uppercase rounded-lg`}
                >
                  Update
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListTable;
