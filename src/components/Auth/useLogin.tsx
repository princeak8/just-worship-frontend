import { useLoginMutation } from "@/app/api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from 'js-cookie';

interface LoginResponse {
  data: {
    user: { name: string; role: string };
    token: string;
  }
}


interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

function useLogin() {
  const [login, result] = useLoginMutation();
  const { isLoading } = result;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const validationRules = {
    email: {
      required: "Email is required",
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: "Please enter a valid email address",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
  };

  async function onSubmit(data: LoginFormValues) {
    const { email, password } = data;
    try {
      const response = await login({ email, password }).unwrap() as LoginResponse;
      localStorage.setItem("user", response?.data?.user?.name)
      localStorage.setItem("role", response?.data?.user?.role)
      Cookies.set("token", response?.data?.token, {
        expires: 7,
        // secure: true,
        // sameSite: "strict",
      });
      navigate(`/dashboard`);
    } catch (error: any) {
      console.log(error)
      // toast(error.data.error);
    }
  }

  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      navigate(`/dashboard`);
      window.location.reload();
    }
  }, [token, navigate]);

  return {
    isLoading,
    formInstance: { register, handleSubmit, errors, validationRules },
    onSubmit,
  };
}

export default useLogin;
