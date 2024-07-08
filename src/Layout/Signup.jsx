import React, { useState } from "react";
import SignupLayout from "../Component/SignupLayout";

export default function Signup() {
  const [isPassSame, setIsPassSame] = useState(true)
  const HandleSignup = (e) => {
    e.preventDefault();

    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const number = form.number.value;
    const wpnumber = form.wpnumber.value;
    const password = form.password.value;
    const confirmpass = form.confirmpass.value;

    if (password !== confirmpass) {
      setIsPassSame(false);
      return;
    }

    const data = {
      firstName,
      lastName,
      email,
      number,
      wpnumber,
      password,
      confirmpass,
    };

    setIsPassSame(true);
    console.log(data)
  };
  return <SignupLayout HandleSignup={HandleSignup} isPassSame={isPassSame} />;
}
