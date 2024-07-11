import { useContext } from "react";
import Loginlayout from "../Component/Loginlayout";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import swal from "sweetalert";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const { loginWithPass, setLoading, loading } = useContext(AuthContext);

  const HandleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginWithPass(email, password)
      .then((userCredential) => {
        const loginData = {
          email,
          username: userCredential?.user?.displayName,
        };
        console.log(loginData);
        axiosPublic
          .post("/login", loginData)
          .then((res) => {
            console.log("response==> ", res);
            swal("Good job!", res.message, "success");
            setLoading(false);
            navigate(
              location?.state?.redirectTo
                ? location?.state?.redirectTo
                : "/dashboard/member"
            );
          })
          .catch((error) => {
            console.log(error);
            swal("Opps!", error.message, "error");
            setLoading(false);
          });
        swal("Good job!", "Welcome to our Shabuj Global", "success");
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
