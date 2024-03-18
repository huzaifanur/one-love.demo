"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const MessageList = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [openMessage, setOpenMessage] = useState<any>({
    bool: false,
    info: null,
  });

  const closeMessage = (_: any) => setOpenMessage({ bool: false, info: null });

  const handleOpenMessage = (messageInfo: any) => {
    setOpenMessage({ bool: true, info: messageInfo });
  };

  const fetchMessageList = () => {
    let url = `${process.env.NEXT_PUBLIC_API_HOST}/messages/view/all`;
    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setAllMessages(data?.allMessages);
      })
      .catch((err) => console.log(err));
  };

  const deleteConfirm = (e: any) => {
    if (window.confirm(`Are you sure you want to delete ${e.email}?`)) {
      deleteUser(e);
    }
  };

  const deleteUser = (e: any) => {
    let url = `${process.env.NEXT_PUBLIC_API_HOST}/messages/${e._id}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token")!,
      },
    })
      .then((res: any) => {
        fetchMessageList();
      })
      .catch((err) => console.log("err", err));
  };

  useEffect(() => {
    fetchMessageList();
  }, []);

  return (
    <div className="w-full">
      <h3 className="text-4xl font-bold text-navyblue text-center my-2">
        All Messages
      </h3>
      <div className="mt-6">
        <ul className="p-4 bg-lightblue w-fit m-auto max-h-[70vh] overflow-scroll ring-1 ring-navyblue rounded-lg">
          {allMessages?.map((message: any) => (
            <li
              className="flex items-start m-auto justify-between rounded-md bg-white my-2 p-2 w-[420px]"
              key={message?.message}
              onDoubleClick={() => {
                handleOpenMessage(message);
              }}
            >
              <p>{message?.message}</p>
              <div className="">
                <button onClick={() => deleteConfirm(message)}>
                  <MdDeleteForever className="text-xl text-red-500" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <Dialog open={openMessage?.bool} onOpenChange={closeMessage}>
          <DialogContent className="bg-blue text-white">
            <div className="text-yellow-500">
              <div>
                <b className="text-navyblue">From:</b>{" "}
                {openMessage?.info?.fName} {openMessage?.info?.lName}
              </div>
              <div>
                <b className="text-navyblue">Subject:</b>{" "}
                {openMessage?.info?.subject}
              </div>
              <div>
                <b className="text-navyblue">Email:</b>{" "}
                {openMessage?.info?.email}
              </div>
              <p className="mt-2">{openMessage?.info?.message}</p>
              <button
                className="flex float-right  mt-2 items-center text-white hover:bg-red-400 bg-red-500 px-2 py-1 rounded-lg"
                onClick={() => deleteConfirm(openMessage?.info)}
              >
                <FaRegTrashAlt className=" text-white mr-2" />
                Delete Message
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MessageList;
