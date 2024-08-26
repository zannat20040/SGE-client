import { useContext, useState } from "react";
import SignupLayout from "../Component/SignupLayout";
import { AuthContext } from "../AuthProvider/AuthProvider";
import swal from "sweetalert";
import { updateProfile } from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [isPassSame, setIsPassSame] = useState(true);
  // const { createWithPass, loading, setLoading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const HandleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
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

    axiosPublic
      .post("/member/registration", data)
      .then((res) => {
        console.log(res);
        swal("Congratulations!", res.data.message, "success");
        navigate("/");
        setLoading(false);
      })
      .catch((err) => {
        swal("Ops!", err.response.data.message, "error");
        setLoading(false);
      });

    setLoading(false);
    setIsPassSame(true);
  };
  return (
    <SignupLayout
      HandleSignup={HandleSignup}
      isPassSame={isPassSame}
      loading={loading}
    />
  );
}
