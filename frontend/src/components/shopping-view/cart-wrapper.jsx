import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import {Button} from "../ui/button"
function UserCartWrapper() {
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4"></div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold ml-5">Total</span>
          <span className="font-bold mr-5">1000</span>
        </div>
      </div>
      <Button className="w-full mt-6">
        CheckOut
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
