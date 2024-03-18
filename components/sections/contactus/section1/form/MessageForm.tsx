"use client";
import React, { useState, useEffect } from "react";
import "./messageForm.css";

function MessageForm() {
  const [fName, setfName] = useState("");
  const [lName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loaded, setLoaded] = useState("");

  const MSubmit = (e: any) => {
    e.preventDefault();

    let url = `${process.env.NEXT_PUBLIC_API_HOST}/messages/create`;

    let requestBody = {
      fName: fName,
      lName: lName,
      email: email,
      subject: subject,
      message: message,
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoaded(data);
      })
      .then(() => {
        alert("Message Sent!");
      });
  };

  useEffect(() => {
    setfName("");
    setLname("");
    setLname("");
    setEmail("");
    setSubject("");
    setMessage("");
  }, [loaded]);

  const handleInputs = () => {
    return fName && lName && email && subject && message ? (
      <button className="message-submit" onClick={MSubmit}>
        Submit
      </button>
    ) : (
      <button disabled className="message-submit" onClick={MSubmit}>
        Submit
      </button>
    );
  };

  return (
    <div className="message-form-div">
      <form action="submit" method="post" className="message-form">
        <div className="first-last-name-div">
          <div className="nameField-div">
            <label className="labelNameFields">First Name</label>
            <input
              type="text"
              value={fName}
              placeholder=""
              onChange={(e) => setfName(e.target.value)}
              className="name-message-input"
              required
            ></input>
          </div>
          <div className="nameField-div">
            <label className="labelNameFields">Last Name</label>
            <input
              type="text"
              value={lName}
              placeholder=""
              onChange={(e) => setLname(e.target.value)}
              className="name-message-input"
              required
            ></input>
          </div>
        </div>
        <label className="labelNonNameFields">Email</label>
        <input
          type="text"
          value={email}
          placeholder=""
          onChange={(e) => setEmail(e.target.value)}
          className="message-input"
          required
        ></input>
        <label className="labelNonNameFields">Subject</label>
        <input
          type="text"
          value={subject}
          placeholder=""
          onChange={(e) => setSubject(e.target.value)}
          className="message-input"
        ></input>
        <label className="labelNonNameFields">Message</label>

        <textarea
          value={message}
          placeholder=""
          onChange={(e) => setMessage(e.target.value)}
          className="message-input"
        ></textarea>
        {handleInputs()}
      </form>
    </div>
  );
}

export default MessageForm;
