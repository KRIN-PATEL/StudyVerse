import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import logo from "../assets/logo.png";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "./ui/dialog"; // Importing Modal
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const logoutHandler = async () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    await logoutUser();
    setShowLogoutConfirm(false);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Logged Out Successfully", {
        style: { color: "green" },
      });
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <>
      <div className="h-16 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 dark:bg-gray-900 border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10 shadow-md">
        <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full px-6">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <Avatar className="h-20 w-20 mt-3">
                <AvatarImage
                  className="h-full w-full object-contain"
                  src={logo}
                  alt="Logo"
                />
                <AvatarFallback>SV</AvatarFallback>
              </Avatar>
              <h1 className="font-extrabold text-2xl text-gray-800 dark:text-white">
                StudyVerse
              </h1>
            </Link>
          </div>

          {/* Navbar */}
          <div className="flex items-center gap-8">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center justify-center">
                    <Avatar className="h-12 w-12 cursor-pointer flex items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-600">
                      <AvatarImage
                        src={
                          user?.photoUrl ||
                          "https://imgs.search.brave.com/ULdUqCYl85mL4y5vUutulLJAS7dxYXur9W2TvaKEDLI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hdmF0/YXIuaXJhbi5saWFy/YS5ydW4vcHVibGlj/LzE0.jpeg"
                        }
                        className="rounded-full object-cover h-full w-full"
                      />
                      <AvatarFallback className="rounded-full bg-gray-200 dark:bg-gray-700">
                        SV
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link to="my-learning"> My Learning</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="profile"> Edit Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/contact">Contact</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/aboutus">About Us</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logoutHandler}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  {user?.role === "instructor" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link to="/admin/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate("/login")}
                  className="text-gray-800 border-gray-800 dark:text-white dark:border-white hover:bg-gray-300 dark:hover:bg-gray-700"
                >
                  Login
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/signup")}
                  className="text-gray-800 border-gray-800 dark:text-white dark:border-white hover:bg-gray-300 dark:hover:bg-gray-700"
                >
                  Signup
                </Button>
              </div>
            )}
            <DarkMode />
          </div>
        </div>

        {/* Mobile View */}
        <div className="flex md:hidden items-center justify-between px-4 h-full">
          <div className="flex items-center gap-2">
            <Avatar className="h-12 w-12">
              <AvatarImage
                className="h-full w-full object-cover"
                src={logo}
                alt="Logo"
              />
              <AvatarFallback>SV</AvatarFallback>
            </Avatar>
            <h1 className="font-extrabold text-xl text-gray-800 dark:text-white">
              StudyVerse
            </h1>
          </div>
          <MobileNavbar />
        </div>
      </div>

      {/* Logout */}
      {showLogoutConfirm && (
        <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
          <DialogContent className="p-6">
            <DialogHeader>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Are you sure you want to logout?
              </h3>
            </DialogHeader>
            <DialogFooter className="flex justify-end gap-4 mt-4">
              <Button
                variant="outline"
                onClick={() => setShowLogoutConfirm(false)}
                className="text-gray-800 border-gray-800 dark:text-white dark:border-white hover:bg-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmLogout}
                className="bg-red-500 text-white hover:bg-red-700"
              >
                Yes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const role = "instructor";
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>StudyVerse</SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4">
          <span>My Learning</span>
          <span>Edit Profile</span>
          <span>Log Out</span>
          <span>Log Out</span>
        </nav>
        {role === "instructor" && (
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Dashboard</Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
