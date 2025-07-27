import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle } from "../../components/ui/card";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { capturePayment } from "../../store/shop/order-Slice";

function paypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if ((payerId, paymentId)) {
      const orderId = JSON.parse(sessionStorage.getItem("CurrentOrderId"));
      dispatch(capturePayment({ paymentId, payerId, orderId })).then(data => {
        if(data?.payload?.success){
            sessionStorage.removeItem("CurrentOrderId")
            window.location.href = '/shop/payment-success'
          }
      })
    }
  }, [dispatch, paymentId, payerId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment Please Wait.. !</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default paypalReturnPage;
