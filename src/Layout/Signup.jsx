import { useState } from "react";
import SignupLayout from "../Component/SignupLayout";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export default function Signup() {
  const [isPassSame, setIsPassSame] = useState(true);
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const HandleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value.toLowerCase().trim(); 
    const primaryMobileNumber = form.number.value;
    const whatsappNumber = form.wpnumber.value;
    const password = form.password.value;
    const confirmpass = form.confirmpass.value;

    if (password !== confirmpass) {
      setIsPassSame(false);
      setLoading(false);
      return;
    }

    const data = {
      firstName,
      lastName,
      email,
      primaryMobileNumber,
      whatsappNumber,
      password,
    };

    try {
      const res = await axiosPublic.post("/member/registration", data);
      swal("Congratulations!", res.data.message, "success");
      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      swal("Ops!", errorMessage, "error");
    } finally {
      setLoading(false);
      setIsPassSame(true);
    }
  };

  return (
    <SignupLayout
      HandleSignup={HandleSignup}
      isPassSame={isPassSame}
      loading={loading}
    />
  );
}
