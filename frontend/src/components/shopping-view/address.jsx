import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import CommonForm from "../commmon/form";
import { addressFormControls } from "../../config/index.js";
import {useDispatch, useSelector} from "react-redux"
import { addNewAddress, fetchAllAdress } from "../../store/shop/address-slice/index.js";
import {toast} from "react-hot-toast"


const initialAddressFormData = {
address: "",
city: "",
phone: "",
pincode: "",
notes: "",
};

function Address() {
  const [formData, setFormData] = useState(initialAddressFormData);
  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.auth)
  const {addressList} = useSelector(state=>state.shopAddress)
  console.log(user);

function handleManageAddress(e) {
  e.preventDefault();
  dispatch(addNewAddress({
    ...formData,
    userId :user?._id
  })).then(data => {
    console.log(data)
    if(data?.payload?.success){
      dispatch(fetchAllAdress(user?._id))
      setFormData(initialAddressFormData  )
    }
  }) 
}


useEffect(()=>{
  dispatch(fetchAllAdress(user?._id))
},[dispatch])

console.log(addressList)

function isFormValid() {
  return Object.keys(formData)
  .map((key) => formData[key].trim( ) !== "")
  .every((item) => item);
}
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
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
