import React from "react";

function UserPopup({ userInfo, closeUser, fetchEventsList }: any) {
  let fName = userInfo?.fName;
  let lName = userInfo?.lName;
  let email = userInfo?.email;
  let aboutMe = userInfo?.aboutMe;
  let id = userInfo?._id;
  let isAdmin = userInfo?.isAdmin;

  const toggleAdmin = () => {
    return isAdmin ? "Revoke admin access" : "Grant admin access";
  };
  console.log("usrerInfo", userInfo);
  const handleClick = () => {
    let url = `${process.env.NEXT_PUBLIC_API_HOST}/admin/user/${id}`;
    const admin = isAdmin ? false : true;
    let userBody = {
      isAdmin: admin,
    };

    fetch(url, {
      method: "PUT",
      body: JSON.stringify(userBody),
      headers: {
        "Content-type": "application/json",
        authorization: localStorage.getItem("token")!,
      },
    })
      .then((res) => {
        closeUser(res);
        fetchEventsList();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="text-yellow-500">
      <h1 className="text-lightblue mb-3 text-center text-3xl font-semibold">
        User info
      </h1>
      <h1>
        <span className="text-navyblue">Name : </span> {fName} {lName}
      </h1>
      <p>
        <span className="text-navyblue">Email : </span>
        {email}
      </p>
      <p>
        <span className="text-navyblue">About : </span>
        {aboutMe}
      </p>
      <button
        className="float-right p-2 rounded-md bg-yellow-500 hover:bg-yellow-400 text-navyblue font-semibold"
        onClick={handleClick}
      >
        {toggleAdmin()}
      </button>
    </div>
  );
}

export default UserPopup;
