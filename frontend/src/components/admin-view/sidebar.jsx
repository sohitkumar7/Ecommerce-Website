import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  SheetHeader,
  Sheet,
  SheetTitle,
  SheetContent,
} from "@/components/ui/sheet";

export const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icons: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/product",
    icons: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/order",
    icons: <BadgeCheck />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ?  setOpen(false) : null;
          }}
          className="flex items-center gap-2 rounded-md px-3 py-2 
          text-muted-foreground hover:text-foreground text-md cursor-pointer"
        >
          {menuItem.icons}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function Adminsidebar({ open, setOpen }) {
  const navigate = useNavigate();
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b ">
              <SheetTitle className="flex gap-2">
                <ChartNoAxesCombined size={30} />
                <p className="mt-1">Admin Panel</p>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden w-64 flex-col bg-background border-r p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className=" cursor-pointer flex items-center gap-2 "
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-xl font-extrabold ">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </>
  );
}

export default Adminsidebar;
