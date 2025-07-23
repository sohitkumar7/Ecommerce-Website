import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import CommonForm from "../commmon/form";
import { addressFormControls } from "../../config/index.js";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function handleManageAddress(e) {
  e.preventDefaut();
}

function Address() {
  const [formData, setFormData] = useState(initialAddressFormData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Adrress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Add"}
          onSubmit={handleManageAddress}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
