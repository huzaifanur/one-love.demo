"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import JobsTab from "./JobsTab";
import MarketPlaceTab from "./MarketPlaceTab";

const TabsSection = () => {
  const [activeTab, setActiveTab] = useState("job");
  const [lists, setListings] = useState({ job: [], market: [] });
  const setJobTab = () => {
    setActiveTab("job");
  };
  const setMarketPlaceTab = () => {
    setActiveTab("market");
  };

  const getJobs = () => {
    let url = `${process.env.NEXT_PUBLIC_API_HOST}/listing/all`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setListings({
          job: data?.data?.filter((job: any) => {
            return job?.status === "approved" && job?.listing_type === "job";
          }),
          market: data?.data?.filter((job: any) => {
            return (
              job?.status === "approved" && job?.listing_type === "marketplace"
            );
          }),
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div>
      <Tabs
        defaultValue="jobs"
        className="w-full flex flex-col items-center content-center"
      >
        <TabsList className="text-xl h-13">
          <TabsTrigger
            onClick={setJobTab}
            className="w-[150px] text-xl h-13"
            value="jobs"
          >
            Jobs
          </TabsTrigger>
          <TabsTrigger
            onClick={setMarketPlaceTab}
            className="w-[150px] text-xl h-13"
            value="marketplace"
          >
            Marketplace
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account"></TabsContent>
        <TabsContent value="password"></TabsContent>
      </Tabs>
      {activeTab === "job" ? (
        <JobsTab jobs={lists?.job} />
      ) : (
        <MarketPlaceTab items={lists?.market} />
      )}
    </div>
  );
};

export default TabsSection;
