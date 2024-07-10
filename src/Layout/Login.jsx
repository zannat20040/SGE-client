import React, { useContext } from "react";
import Loginlayout from "../Component/Loginlayout";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithPass, setLoading, loading } = useContext(AuthContext);

  const HandleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginWithPass(email, password)
      .then((userCredential) => {
        swal("Good job!", "Welcome back to our Shabuj Global!", "success");
        setLoading(false);
        navigate(
          location?.state?.redirectTo
            ? location?.state?.redirectTo
            : "/dashboard/member"
        );
      })
      .catch((error) => {
        swal("Opps!", error.message, "error");
        setLoading(false);
      });
  };

  return <Loginlayout HandleLogin={HandleLogin} loading={loading} />;
}
