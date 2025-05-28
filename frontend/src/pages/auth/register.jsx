import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import CommonForm from "../../components/commmon/form";
import { registerFormControls } from "../../config";
import toast, { Toaster } from "react-hot-toast";
import {useDispatch} from "react-redux";
import { registerUser } from "../../store/auth-slice";

const initialstate = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialstate);
  const navigate = useNavigate();
  console.log(formData);

  const dispatch = useDispatch();

  function onSubmit(e){
    e.preventDefault();
    dispatch(registerUser(formData)).then((data)=>{
      if(data?.payload?.success){
        toast.success(data?.payload?.message)
        console.log(data);
        navigate('/auth/login')
      }else{
        console.log(data);
        toast.error("User Already Exist with this Email Id")
      }
    })
  }


  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an Account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        onSubmit={onSubmit}
        formData={formData}
        setFormData={setFormData}
        buttonText={"Sign Up"}
        formControls={registerFormControls}
      ></CommonForm>
    </div>
  );
}

export default AuthRegister;
