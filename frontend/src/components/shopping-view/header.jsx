import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { HousePlug, Menu, ShoppingCart, LogOut, UserCog } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { shopingViewHeaderMenuItems } from "../../config";
import { logoutUser } from "../../store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "../../store/shop/cart-slice";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handeNavigate(getCurrentItem) {
    sessionStorage.removeItem("filter");
    const currentFilter =
      getCurrentItem.id !== "home" &&
      getCurrentItem.id !== "products" &&
      getCurrentItem.id !== "search"
        ? {
            category: [getCurrentItem.id],
          }
        : null;

    sessionStorage.setItem("filter", JSON.stringify(currentFilter));
    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(new URLSearchParams(`?category=${getCurrentItem.id}`))
      : navigate(getCurrentItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shopingViewHeaderMenuItems.map((menuItems) => (
        <label
          onClick={() => {
            handeNavigate(menuItems);
          }}
          className="text-sm font-medium cursor-pointer"
        >
          {menuItems.label}
        </label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const { cartItems } = useSelector((state) => state.shopCart);

  useEffect(() => {
    const userId = user?._id;
    console.log(userId, "userid");
    dispatch(fetchCartItems({ userId }));
  }, [dispatch]);

  function handlelogout() {
    console.log("logout");
    dispatch(logoutUser());
  }

  return (
    <div className="flex lg:items-center lg:flex-row  flex-col gap-4 ">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative flex flex-row p4-2"
        >
          <ShoppingCart className="w-6 h-6 " />
          <span className=" absolute top-[-8px] left-6 font-bold text-sm" >{cartItems?.items?.length || 0 }</span>
          <span className="sr-only">User cart</span>
        </button>
        <UserCartWrapper
          serOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black ">
            <AvatarFallback className="bg-black text-white font-extrabold ">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4 "></UserCog>
            Account
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handlelogout}>
            <LogOut className="mr-2 h-4 w-4 "></LogOut>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function Shoppingheader() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <button varient="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default Shoppingheader;
