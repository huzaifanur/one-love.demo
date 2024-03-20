"use client";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../../ui/select";
import { FaUserAlt } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DialogRenderer from "./Dialogs";
const ProfileButton = () => {
  const [user, setUser] = useState<any>(null);
  const [dialog, setDialog] = useState({
    signIn: false,
    signUp: false,
  });
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const { push } = useRouter();

  const setLoginToggle = (_bool: boolean) => {
    setDialog({ ...dialog, signIn: _bool });
  };
  const setSignupToggle = (_bool: boolean) => {
    setDialog({ ...dialog, signUp: _bool });
  };

  const openLogin = () => {
    setLoginToggle(true);
  };

  const openSignup = () => {
    console.log("first");
    setSignupToggle(true);
  };

  const logOut = () => {
    push("/");
    localStorage.clear();
    setSessionToken(null);
    window.location.reload();
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      try {
        setSessionToken(accessToken);
        let decode: any = jwtDecode(accessToken!);
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
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log("err", err);
      }
    }
  }, []);
  return (
    <Select>
      <SelectTrigger className="w-[48px] h-[48px] bg-transparent rounded-full">
        <FaUserAlt className="text-[30px]" />
      </SelectTrigger>
      <SelectContent>
        {user?.isAdmin && sessionToken && (
          <>
            <Link className="block px-2 my-2 text-gray-600" href={"/admin"}>
              Admin
            </Link>
            <hr className="mx-1" />
          </>
        )}
        {!sessionToken ? (
          <>
            <button
              className="block px-2 my-2 text-gray-600"
              onClick={openLogin}
            >
              Login
            </button>
            <hr className="mx-1" />
            <button className="block px-2 text-gray-600" onClick={openSignup}>
              Signup
            </button>
          </>
        ) : (
          <>
            <Link className="block px-2 my-2 text-gray-600" href={"/profile"}>
              Profile
            </Link>
            <hr className="mx-1" />
            <button className="block my-2 px-2 text-gray-600" onClick={logOut}>
              Logout
            </button>
          </>
        )}
      </SelectContent>
      {(dialog.signIn || dialog.signUp) && (
        <DialogRenderer
          key={`${dialog.signIn}-${dialog.signUp}`}
          dialogInfo={dialog}
          setDialog={setDialog}
          setLoginToggle={setLoginToggle}
          setSignupToggle={setSignupToggle}
        />
      )}
    </Select>
  );
};

export default ProfileButton;
