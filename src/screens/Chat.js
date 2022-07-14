import { Button } from "bootstrap";
import React, { useState } from "react";

export default function Chat() {
  const [email, setEmail] = useState("");

  const sendInvite = () => {};

  return (
    <div className="container mt-5">
      <div>
        <input
          type="text"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          className=""
        />
        <button onClick={sendInvite}>Send Chat Invitation</button>
      </div>
    </div>
  );
}
