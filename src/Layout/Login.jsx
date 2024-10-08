import { useContext, useEffect } from "react";
import Loginlayout from "../Component/Loginlayout";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import swal from "sweetalert";
import useStatus from "../Hooks/useStatus";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const { loginWithPass, setLoading, loading } = useContext(AuthContext);
  const { userinfo, refetch } = useStatus();

  useEffect(() => {
    if (userinfo) {
      navigate(
        userinfo === "member"
          ? location?.state?.redirectTo || "/dashboard/member"
          : userinfo === "mco"
          ? location?.state?.redirectTo || "/dashboard/mco"
          : location?.state?.redirectTo || "/dashboard/admin"
      );
    }
  }, [userinfo, navigate, location]);

  const HandleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value.toLowerCase().trim();
    const password = form.password.value;

    loginWithPass(email, password)
      .then((userCredential) => {
        refetch();
        const loginData = {
          email,
          username: userCredential?.user?.displayName,
        };
        axiosPublic
          .post("/login", loginData)
          .then((res) => {
            swal("Good job!", res.data.message, "success");
            setLoading(false);
            navigate(
              location?.state?.redirectTo
                ? location?.state?.redirectTo
                : "/dashboard/member"
            );
          })
          .catch((error) => {
            console.log(error);
            swal("Opps!", error.response.data.error, "error");
            setLoading(false);
          });
      })
      .catch((error) => {
        swal("Opps!", error.message, "error");
        setLoading(false);
      });
  };

  return <Loginlayout HandleLogin={HandleLogin} loading={loading} />;
}
