"use client";
import Sidebar from "@/components/layout/sidebar";
import JobListings from "./JobListings";
import { useState } from "react";
import { getHash } from "@/lib/utils";
import MailList from "./maillist";
import MessageList from "./messageList";
import EventsList from "./events";
import UserList from "./userList";

function AdminMain() {
  const [hash, setHash] = useState(getHash() || "user");
  return (
    <div className="w-full flex">
      <Sidebar hash={hash} setHash={setHash} />
      {hash === "joblisting" ? (
        <JobListings />
      ) : hash === "maillist" ? (
        <MailList />
      ) : hash === "message" ? (
        <MessageList />
      ) : hash === "events" ? (
        <EventsList />
      ) : hash === "user" ? (
        <UserList />
      ) : null}
    </div>
  );
}

export default AdminMain;
