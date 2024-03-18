import React, { useState, useEffect } from "react";
import "./styles.css";
import { jwtDecode } from "jwt-decode";

function Login({ closeLogin }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sessionToken, setSessionToken] = useState<any>(undefined);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token")!);
    }
  }, [sessionToken]);

  const updateLocalStorage = (newToken: any) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);

    if (localStorage.getItem("token")) {
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
          localStorage.setItem("user", JSON.stringify(data.findUser));
        })
        .catch((err) => console.log(err));
    }
  };

  const errorLogin = () => {
    localStorage.clear();
    setError(true);
  };

  const loginSubmit = (e: any) => {
    e.preventDefault();

    let url = `${process.env.NEXT_PUBLIC_API_HOST}/basic/login`;

    let loginBody = {
      email: email,
      password: password,
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(loginBody),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        updateLocalStorage(data.token);
        localStorage.setItem("user", JSON.stringify(data.findUser));
        data.token ? closeLogin() : errorLogin();
      })
      .catch((err) => console.log(err));
  };
  const handleInputs = () => {
    return email && password ? (
      <button className="login-submit bg-yellow-500" onClick={loginSubmit}>
        Login
      </button>
    ) : (
      <button
        className="login-submit bg-yellow-500"
        disabled
        onClick={loginSubmit}
      >
        Login
      </button>
    );
  };

  return (
    <div className="login-div">
      <form action="" className="login-form">
        {error && <p className="error-text">Please enter a valid email</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="email"
          placeholder="Enter Email"
        />
        {error && <p className="error-text">Please enter a valid password</p>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="password"
          placeholder="Enter Password"
        />

        {handleInputs()}
      </form>
    </div>
  );
}

export default Login;
