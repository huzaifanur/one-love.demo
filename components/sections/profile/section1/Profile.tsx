"use client";
import React, { useState, useEffect } from "react";
import "./profile.css";
import { jwtDecode } from "jwt-decode";
import { BsFilePerson } from "react-icons/bs";
import { MdOutlineEmail, MdSentimentSatisfiedAlt } from "react-icons/md";

function Profile() {
  const [user, setUser] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  useEffect(() => {
    let decode: any = jwtDecode(localStorage.getItem("token")!);
    let url = `${process.env.NEXT_PUBLIC_API_HOST}/basic/${decode._id}`;

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.findUser);
        setLoaded(true);
        setfName(data.findUser.fName);
        setlName(data.findUser.lName);
        setEmail(data.findUser.email);
        setPassword(data.findUser.password);
        setIsAdmin(data.findUser.isAdmin);
        setAboutMe(data.findUser.aboutMe);
      })
      .catch((err) => console.log(err));
  }, [loaded]);

  const updateUser = (e: any) => {
    e.preventDefault();
    let decode: any = jwtDecode(localStorage.getItem("token")!);
    let url = `${process.env.NEXT_PUBLIC_API_HOST}/user/user/${decode._id}`;

    let updateProfile = {
      fName: fName,
      lName: lName,
      email: email,
      // password: decode.password,
      isAdmin: isAdmin,
      aboutMe: aboutMe,
    };

    console.log(updateProfile);

    fetch(url, {
      method: "PUT",
      body: JSON.stringify(updateProfile),
      headers: new Headers({
        "Content-type": "application/json",
        authorization: localStorage.getItem("token")!,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const userProfile = () => {
    return loaded ? (
      <>
        <div className="profile-info-div">
          <div className="profile-header-div">
            <h1 className="profile-header">Welcome, {user?.fName}</h1>
          </div>
          <div className="profile-user-name-div">
            <h2 className="profile-user-name-header">Your Name</h2>
            <form action="submit" className="profile-user-name-form">
              <h5>First Name</h5>
              <input
                type="text"
                className="profile-user-name"
                placeholder={user?.fName}
                onChange={(e) => setfName(e.target.value)}
              />
              <h5>Last Name</h5>
              <input
                type="text"
                className="profile-user-name"
                placeholder={user?.lName}
                onChange={(e) => setlName(e.target.value)}
              />
              <button className="profile-user-name-button" onClick={updateUser}>
                Update
              </button>
            </form>
            <h2 className="profile-about-header">
              <BsFilePerson /> About Me
            </h2>
            <form action="submit" className="profile-about-form">
              <textarea
                className="profile-about-info"
                placeholder={user.aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
              />
              <button className="profile-about-button" onClick={updateUser}>
                Update
              </button>
            </form>
            <hr className="profile-line-break" />
            <h2 className="profile-email-header">
              <MdOutlineEmail />
              Email Address
            </h2>
            <form action="submit" className="profile-email">
              <input
                type="email"
                className="profile-email-input"
                placeholder={user.email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="profile-email-button" onClick={updateUser}>
                Update
              </button>
            </form>
          </div>
        </div>
      </>
    ) : (
      <div className="h-[58vh]"></div>
    );
  };

  return (
    <>
      <div className="profile-main-div">{userProfile()}</div>
    </>
  );
}

export default Profile;
