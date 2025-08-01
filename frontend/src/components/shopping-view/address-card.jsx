import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addresInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addresInfo)
          : null
      }
      className={`cursor-pointer border-red-700  ${
        selectedId?._id === addresInfo?._id ? "border-red-900 border-[4px]" : "border-black"
      }`}
    >
      <CardContent
        className={`  grid gap-4`}
      >
        <Label>Address : {addresInfo?.address}</Label>
        <Label>City : {addresInfo?.city}</Label>
        <Label>PinCode : {addresInfo?.pincode}</Label>
        <Label>Phone No. : {addresInfo?.phone}</Label>
        <Label> Notes : {addresInfo?.notes}</Label>
      </CardContent>
      <CardFooter className=" p-3 flex justify-between ">
        <Button onClick={() => handleEditAddress(addresInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(addresInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
