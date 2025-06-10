import React, { useState } from "react";
import {
  SheetHeader,
  Sheet,
  SheetTitle,
  SheetContent,
} from "@/components/ui/sheet";

function Adminproduct() {
  const [openCreateProductDialog, setopenCreateProductDialog] = useState(false);
  return (
    <>
      <div className="w-full flex justify-end">
        <button
          onClick={() => setopenCreateProductDialog(true)}
          className=" font-medium shadow text-sm rounded-xl w-35 h-10 bg-black text-white"
        >
          Add New Product
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 "></div>

      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setopenCreateProductDialog(false);
        }}
      >
        <SheetContent>
          
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Adminproduct;
