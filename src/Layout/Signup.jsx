import { useContext, useState } from "react";
import SignupLayout from "../Component/SignupLayout";
import { AuthContext } from "../AuthProvider/AuthProvider";
import swal from "sweetalert";
import { updateProfile } from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";

export default function Signup() {
  const [isPassSame, setIsPassSame] = useState(true);
  const { createWithPass, loading, setLoading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();

  const HandleSignup = (e) => {
    e.preventDefault();

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

    createWithPass(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
        })
          .then(() => {
            axiosPublic.post("/member/registration", data).then((res) => {
              swal(
                "Bingo!",
                "Welcome to our Shabuj Global Education!",
                "success"
              );
              navigate("/");
              setLoading(false);
            });
          })
          .catch((error) => {
            console.log(error);
            swal("Opps!", error.message, "error");
            setLoading(false);
          });
      })
      .catch((error) => {
        setLoading(false);
        swal("Opps!", error.message, "error");
      });

    setIsPassSame(true);
    console.log(data);
  };
  return (
    <SignupLayout
      HandleSignup={HandleSignup}
      isPassSame={isPassSame}
      loading={loading}
    />
  );
}
