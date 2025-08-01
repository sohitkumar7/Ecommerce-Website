import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import CommonForm from "../commmon/form";
import { addressFormControls } from "../../config/index.js";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  DeleteAddress,
  editaAddress,
  fetchAllAdress,
} from "../../store/shop/address-slice/index.js";
import { toast } from "react-hot-toast";
import AddressCard from "../../components/shopping-view/address-card.jsx";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({setCurrentSelectedAddress,selectedId}) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  function handleManageAddress(e) {
    e.preventDefault();

      if(addressList.length > 2){
        toast.error("You Can Only Add Max 3 Address")
        setFormData(initialAddressFormData);
        return;
      }

    let userId = user?._id;
    let addressId = currentEditedId;

    currentEditedId !== null
      ? dispatch(
          editaAddress({
            userId,
            addressId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAdress(user?._id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast.success("Address Updated Successfully  ")
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?._id,
          })
        ).then((data) => {
          console.log(data);
          if (data?.payload?.success) {
            dispatch(fetchAllAdress(user?._id));
            setFormData(initialAddressFormData);
            toast.success("New Address Successfully")
          }
        });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  function handleDeleteAddress(getCurrentAddres) {
    console.log(getCurrentAddres);
    let userId = user?._id;
    let addressId = getCurrentAddres?._id;

    dispatch(DeleteAddress({ userId, addressId })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAdress(user?._id));
        toast.success("Address Deleted Successfully")
      }
    });
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress.address,
      city: getCurrentAddress.city,
      phone: getCurrentAddress.phone,
      pincode: getCurrentAddress.pincode,
      notes: getCurrentAddress.notes,
    });
    dispatch(editaAddress());
  }

  useEffect(() => {
    dispatch(fetchAllAdress(user?._id));
  }, [dispatch]);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2  ">
        {addressList && addressList.length > 0
          ? addressList.map((singleaddresaItem) => (
              <AddressCard
              setCurrentSelectedAddress = {setCurrentSelectedAddress}
                handleDeleteAddress={handleDeleteAddress}
                addresInfo={singleaddresaItem}
                handleEditAddress={handleEditAddress}
                selectedId={selectedId}
              ></AddressCard>
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Adrress"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Edit" : "Add "}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
