"use client";
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

const MailList = () => {
  const [allMails, setAllMails] = useState([]);

  const fetchEmailList = () => {
    let url = `${process.env.NEXT_PUBLIC_API_HOST}/newsletterReq/view/all`;
    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setAllMails(data?.newsletterReqs);
      })
      .catch((err) => console.log(err));
  };

  const deleteConfirm = (e: any) => {
    if (window.confirm(`Are you sure you want to delete ${e.email}?`)) {
      deleteUser(e);
    }
  };

  const deleteUser = (e: any) => {
    let url = `${process.env.NEXT_PUBLIC_API_HOST}/newsletterReq/${e._id}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token")!,
      },
    })
      .then((res: any) => {
        fetchEmailList();
      })
      .catch((err) => console.log("err", err));
  };

  useEffect(() => {
    fetchEmailList();
  }, []);

  return (
    <div className="w-full">
      <h3 className="text-4xl font-bold text-navyblue text-center my-2">
        All Mails
      </h3>
      <div className="mt-6">
        <ul className="p-4 bg-lightblue w-fit m-auto max-h-[70vh] overflow-scroll ring-1 ring-navyblue rounded-lg">
          {allMails?.map((mail: any) => (
            <li
              className="flex items-center m-auto justify-between rounded-md bg-white my-2 p-2 w-[420px]"
              key={mail?.email}
            >
              <p>{mail?.email}</p>
              <button onClick={() => deleteConfirm(mail)}>
                <MdDeleteForever className="text-xl text-red-500" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MailList;
