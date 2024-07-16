import React, { useContext } from "react";
import { Drawer, Button } from "@material-tailwind/react";
import Logo from "./Logo";
import MemberNav from "./Dashboard Navlist/MemberNav";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useStatus from "../Hooks/useStatus";
import MCONavlist from "./Dashboard Navlist/MCONavlist";
import AdminNavlist from "./Dashboard Navlist/AdminNavlist";
import AdminTopbar from "./AdminTopbar";

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const closeDrawer = () => setOpen(false);
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);
  const navigate = useNavigate();
  const { userinfo, isLoading, refetch } = useStatus();
  const { pathname } = useLocation();

  const { signOutProfile } = useContext(AuthContext);
  const HandleLogout = () => {
    signOutProfile()
      .then(() => {
        navigate("/");
        swal("Good job!", "Logged out successfully!", "success");
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  React.useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 719); // Adjust breakpoint as needed
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleButtonClick = () => {
    if (isSmallScreen) {
      setOpen(true); // Open the drawer when the button is clicked on small screens
    }
  };

  const isMemberDashboard = pathname.startsWith("/dashboard/admin");

  return (
    <React.Fragment>
      {isSmallScreen ? (
        <div>
          <Drawer
            open={open}
            onClose={closeDrawer}
            className="bg-[#2f3349] min-w-[250px] w-[250px] "
          >
            <div className="mb-2 flex items-center justify-between p-4 ]">
              <Logo color={"text-white"} />
            </div>
            {isMemberDashboard ? (
              <AdminNavlist />
            ) : (
              <>
                {userinfo && userinfo === "member" ? (
                  <MemberNav />
                ) : (
                  <MCONavlist />
                )}
              </>
            )}
            <div className="rounded font-normal px-2">
              <Button
                className="w-full bg-red-400 font-medium  rounded"
                size="md"
                onClick={HandleLogout}
              >
                Sign out
              </Button>
            </div>
          </Drawer>
          <div className="flex-grow w-full  bg-gray-200 min-h-screen p-4 ">
            {isMemberDashboard ? (
              <AdminTopbar handleButtonClick={handleButtonClick} />
            ) : (
              <Topbar handleButtonClick={handleButtonClick} />
            )}
            <Outlet />
          </div>
        </div>
      ) : (
        <div className="flex  bg-gray-200 h-auto w-full">
          <Drawer
            open={true}
            overlay={false}
            className="bg-[#2f3349] sticky left-0 min-h-screen min-w-[250px] w-[250px]"
          >
            <div className="mb-2 flex items-center justify-between p-4 ]">
              <Logo color={"text-white"} />
            </div>
            {isMemberDashboard ? (
              <AdminNavlist />
            ) : (
              <>
                {userinfo && userinfo === "member" ? (
                  <MemberNav />
                ) : (
                  <MCONavlist />
                )}
              </>
            )}
            {/* {userinfo && userinfo === "member" ? <MemberNav /> : <MCONavlist />} */}
            <div className="rounded font-normal px-2">
              <Button
                className="w-full bg-red-400 font-medium rounded"
                size="md"
                onClick={HandleLogout}
              >
                Sign out
              </Button>
            </div>
          </Drawer>
          <div className="w-full sm:w-8/12  lg:w-9/12 xl:w-full p-4 pt-2  main-outlet">
            {isMemberDashboard ? (
              <AdminTopbar handleButtonClick={handleButtonClick} />
            ) : (
              <Topbar handleButtonClick={handleButtonClick} />
            )}
            {/* <Topbar /> */}
            <Outlet />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
