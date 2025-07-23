import { Card, CardContent, CardHeader } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({addressInfo}) {
  return (
    <Card>
        <CardContent className="grid gap-4">
            <Label>{addressInfo?.address}</Label>
            <Label>{addressInfo?.city}</Label>
            <Label>{addressInfo?.pincode}</Label>
            <Label>{addressInfo?.phone}</Label>
            <Label>{addressInfo?.noted}</Label>
        </CardContent>
    </Card>
);
}
