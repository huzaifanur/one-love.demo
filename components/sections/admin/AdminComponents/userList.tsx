"use client";
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import UserPopup from "./UserPopup";

const UserList = () => {
  const [users, setUser] = useState({
    admin: [],
    simple: [],
  });
  const [openUser, setOpenUser] = useState({
    bool: false,
    info: null,
  });

  const handleOpenUserDialog = (_user: any) => {
    setOpenUser({
      bool: true,
      info: _user,
    });
  };

  const handleCloseUserDialog = (_user: any) => {
    setOpenUser({
      bool: false,
      info: null,
    });
  };

  const fetchUserList = () => {
    let url = `${process.env.NEXT_PUBLIC_API_HOST}/basic/`;
    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setUser({
          admin: data.findAll.filter((e: any) => e.isAdmin),
          simple: data.findAll.filter((e: any) => !e.isAdmin),
        });
      })
      .catch((err) => console.log(err));
  };

  const deleteConfirm = (e: any) => {
    if (window.confirm(`Are you sure you want to delete ${e.email}?`)) {
      deleteUser(e);
    }
  };

  const deleteUser = (_user: any) => {
    let url = `${process.env.NEXT_PUBLIC_API_HOST}/admin/user/${_user._id}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token")!,
      },
    })
      .then((res: any) => {
        fetchUserList();
      })
      .catch((err) => console.log("err", err));
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <div className="w-full">
      <h3 className="text-4xl font-bold text-navyblue text-center my-2">
        All User
      </h3>
      <div className="mt-6">
        <ul className="p-4  min-w-[452px] bg-lightblue w-fit m-auto max-h-[70vh] overflow-scroll ring-1 ring-navyblue rounded-lg">
          <h5>Admin users</h5>
          {users?.admin?.map((_user: any) => (
            <li
              className="flex items-center m-auto justify-between rounded-md bg-white my-2 p-2 w-[420px]"
              key={`${_user?.fName}-${_user.lName}`}
              onDoubleClick={() => {
                handleOpenUserDialog(_user);
              }}
            >
              <p>
                {_user.fName} {_user.lName}
              </p>
              <button onClick={() => deleteConfirm(_user)}>
                <MdDeleteForever className="text-xl text-red-500" />
              </button>
            </li>
          ))}
          <h5>Users</h5>
          {users?.simple?.map((_user: any) => (
            <li
              className="flex items-center m-auto justify-between rounded-md bg-white my-2 p-2 w-[420px]"
              key={`${_user?.fName}-${_user.lName}`}
              onDoubleClick={() => {
                handleOpenUserDialog(_user);
              }}
            >
              <p>
                {_user.fName} {_user.lName}
              </p>
              <button onClick={() => deleteConfirm(_user)}>
                <MdDeleteForever className="text-xl text-red-500" />
              </button>
            </li>
          ))}
        </ul>
        <Dialog open={openUser?.bool} onOpenChange={handleCloseUserDialog}>
          <DialogContent className="bg-blue text-white">
            <UserPopup
              userInfo={openUser?.info}
              fetchEventsList={fetchUserList}
              closeUser={handleCloseUserDialog}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UserList;
