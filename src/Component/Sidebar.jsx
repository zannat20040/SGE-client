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
  // states
  const [open, setOpen] = React.useState(false);
  const closeDrawer = () => setOpen(false);
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);
  const navigate = useNavigate();
  const { userinfo } = useStatus();
  const { signOutProfile } = useContext(AuthContext);

  // logout function
  const HandleLogout = () => {
    signOutProfile()
      .then(() => {
        navigate("/");
        swal("Good job!", "Logged out successfully!", "success");
      })
      .catch((error) => {});
  };

  // responsive function
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



  return (
    <React.Fragment>
      {isSmallScreen ? (
        // side bar for mobile device
        <div>
          <Drawer
            open={open}
            onClose={closeDrawer}
            className="bg-[#2f3349] min-w-[270px] w-[270px] overflow-y-scroll "
          >
            <div className="mb-2 flex items-center justify-between p-4 ">
              <Logo color={"text-white"} role={userinfo?.substring(0, 3)}  />
            </div>
            {/* nav list change according to role */}
            {userinfo && userinfo === "member" ? (
              <MemberNav />
            ) : userinfo === "admin" ? (
              <AdminNavlist />
            ) : (
              <MCONavlist />
            )}

            {/* sign out button */}
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
          <div className="flex-grow w-full  bg-gray-200 min-h-screen md:p-4 p-2 ">
            {/* topbar change according to role */}
            {userinfo === "admin" ? (
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
            className="bg-[#2f3349] sticky left-0 min-h-screen min-w-[270px] w-[270px] overflow-y-scroll"
          >
            <div className="mb-2 flex items-center justify-between p-4 ]">
              <Logo color={"text-white"} role={userinfo?.substring(0, 3)} />
            </div>

            {/* nav list change according to role */}

            {userinfo && userinfo === "member" ? (
              <MemberNav />
            ) : userinfo === "admin" ? (
              <AdminNavlist />
            ) : (
              <MCONavlist />
            )}

            {/* sign out button according to role */}
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
          <div className="w-full sm:w-8/12  lg:w-9/12 xl:w-8/12 mx-auto md:p-4 p-2   main-outlet">
            {/* topbar change according to role */}
            {userinfo === "admin" ? (
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
