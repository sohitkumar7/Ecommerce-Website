import React from "react";
import { AlignJustify } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/auth-slice";
function AdminHeader({setOpen}) {

  const dispatch = useDispatch() 
  function handlelogout(){
    dispatch(logoutUser())
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <button onClick={()=>setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only"> Toggle Menu</span>
      </button>
      <div className="flex flex-1 justify-end">
        <button onClick={handlelogout}className=" bg-black text-white inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow ">
          Logout
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
