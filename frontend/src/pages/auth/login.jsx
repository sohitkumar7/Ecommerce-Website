import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import CommonForm from "../../components/commmon/form";
import { LoginFormControls } from "../../config";
import toast from "react-hot-toast";
import api from "@api";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/auth-slice";

const initialstate = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialstate);
  const navigate = useNavigate();
  // console.log(formData);


  const dispatch = useDispatch();

  function onSubmit(e){
    e.preventDefault();

    dispatch(loginUser(formData)).then((data)=>{
      // console.log(data);
      if(data?.payload?.success){
        toast.success(data?.payload?.message);
      }else{
        // console.log(data);
        toast.error(data?.payload?.message);
      }
    })
  }
  
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Dont't have an Account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        onSubmit={onSubmit}
        formData={formData}
        setFormData={setFormData}
        buttonText={"Sign In"}
        formControls={LoginFormControls}
      ></CommonForm>
    </div>
  );
}

export default AuthLogin;










