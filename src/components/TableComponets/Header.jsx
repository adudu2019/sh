import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthProvider";
import { supabase } from "../../CreateClient";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [getTotalCart, setGetTotalCart] = useState("");

  const totalCart = async () => {
    const { data } = await supabase
      .from("keranjang")
      .select("*")
      .eq("id_user", user.id);
    setGetTotalCart(data.length);

    console.log(data.length);
  };

  useEffect(() => {
    totalCart();

    supabase
      .channel("keranjang")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "keranjang",
        },
        () => {
          totalCart();
        }
      )
      .subscribe();
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await logout();
      if (!error) {
        alert("Berhasil Logout");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex p-5 items-center absolute w-full mt-3 z-10">
        <h2 className="font-black text-white text-xl mb-0 ms-8">SHOESINN</h2>
        <div className="ml-auto flex">
          {user ? (
            <>
              <h2 className="text-white me-4 mt-2 hidden lg:block">
                Hai! {user.email}
              </h2>

              <Link to={"/checkout"}>
                <div className="indicator mt-2 me-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item text-white">
                    {getTotalCart}
                  </span>
                </div>
              </Link>

              <Link to={"/profile"}>
                <div className="dropdown dropdown-end ">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <button className="border-2  p-1 text-white rounded-md px-4 me-2">
                  Login
                </button>
              </Link>
              <Link to={"/register"}>
                <button className="border-2  p-1 text-white rounded-md px-4">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
