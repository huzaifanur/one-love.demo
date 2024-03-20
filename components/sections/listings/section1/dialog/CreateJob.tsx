"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useState } from "react";

const CreateJobDialog = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    "posted-by": "",
    email: "",
  });
  const handleChangeField = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleCloseJobDialog = () => {
    setOpenDialog(!openDialog);
    setFormData({
      title: "",
      location: "",
      description: "",
      "posted-by": "",
      email: "",
    });
  };

  const handleSubmit = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_HOST}/listing/new`, {
      body: JSON.stringify({
        ...formData,
        "posted-by": formData["posted-by"],
        listing_type: "job",
      }),
      method: "POST",
      headers: {
        Content_Type: "application/json",
        authorization: localStorage.getItem("token")!,
      },
    })
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const areAllFieldsFilled = () => {
    return (
      !formData?.title ||
      !formData?.email ||
      !formData["posted-by"] ||
      !formData?.description
    );
  };

  return (
    <Dialog open={openDialog} onOpenChange={handleCloseJobDialog}>
      <DialogTrigger asChild>
        <button className="p-2 absolute right-16 -top-16 font-medium text-white hover:bg-[#2b87ce] bg-blue rounded-md">
          Create Job
        </button>
      </DialogTrigger>
      <DialogContent className="bg-lightblue w-[340px]">
        <form>
          <h2 className="text-2xl text-navyblue font-semibold text-center">
            Create Job
          </h2>
          <label htmlFor="title" className="text-sm w-f">
            Title<span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            className="rounded-md ring-1 py-1 block ring-navyblue  w-full"
            onChange={(e) => {
              handleChangeField("title", e?.target?.value);
            }}
          />
          <label htmlFor="posted-by" className="text-sm">
            Posted by<span className="text-red-500">*</span>
          </label>
          <input
            id="posted-by"
            type="text"
            value={formData["posted-by"]}
            className="rounded-md ring-1 py-1 block ring-navyblue w-full"
            onChange={(e) => {
              handleChangeField("posted-by", e?.target?.value);
            }}
          />
          <label htmlFor="email" className="text-sm">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="text"
            value={formData.email}
            className="rounded-md ring-1 py-1 block ring-navyblue w-full"
            onChange={(e) => {
              handleChangeField("email", e?.target?.value);
            }}
          />
          <label htmlFor="location" className="text-sm">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={formData.location}
            className="rounded-md ring-1 py-1 block ring-navyblue  w-full"
            onChange={(e) => {
              handleChangeField("location", e?.target?.value);
            }}
          />
          <label htmlFor="description" className="text-sm">
            Description<span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            value={formData.description}
            rows={4}
            className="rounded-md ring-1 py-1 block ring-navyblue  w-full"
            onChange={(e) => {
              handleChangeField("description", e?.target?.value);
            }}
          />
          <button
            className="p-2 mt-3 w-full font-medium text-white hover:bg-[#2b87ce] bg-blue rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={areAllFieldsFilled()}
          >
            Create Job
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateJobDialog;
