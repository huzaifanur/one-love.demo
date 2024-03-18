import React, { useState, useEffect } from "react";
import "./styles.css";

function Signup({ closeSignup }: any) {
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [aboutMe, setAboutMe] = useState("");
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
  };
  const errorSignup = () => {
    localStorage.clear();
    setError(true);
  };

  const signupSubmit = (e: any) => {
    e.preventDefault();

    let url = `${process.env.NEXT_PUBLIC_API_HOST}/basic/signup`;

    let signupBody = {
      fName: fName,
      lName: lName,
      email: email,
      password: password,
      aboutMe: aboutMe,
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(signupBody),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        updateLocalStorage(data.token);
        data.token ? closeSignup() : errorSignup();
      })
      .catch((err) => console.log(err));
  };
  const handleInputs = () => {
    return fName && lName && email && password ? (
      <button className="signup-submi bg-yellow-500t" onClick={signupSubmit}>
        Sign-up
      </button>
    ) : (
      <button
        disabled
        className="signup-submit bg-yellow-500"
        onClick={signupSubmit}
      >
        Sign-up
      </button>
    );
  };
  return (
    <div className="signup-div">
      <form action="" className="signup-form">
        <input
          type="text"
          value={fName}
          onChange={(e) => setFname(e.target.value)}
          className="fName"
          placeholder="First name"
        />
        <input
          type="text"
          value={lName}
          onChange={(e) => setLname(e.target.value)}
          className="lName"
          placeholder="Last name"
        />
        {error && <p className="error-text">This email is already in use</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="email"
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="password"
          placeholder="Password"
        />
        <textarea
          name="bio"
          id="enter-bio"
          onChange={(e) => setAboutMe(e.target.value)}
          placeholder="Tell us your story"
        ></textarea>
        {handleInputs()}
      </form>
    </div>
  );
}

export default Signup;
