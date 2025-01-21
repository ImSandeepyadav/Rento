'use client';

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from 'next-auth/react';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    },
  });
  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', { 
      ...data, 
      redirect: false,
    })
    .then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }
      
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  }

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <Heading
          title="Welcome back"
          subtitle="Login to your account!"
          center
        />
      </div>
      <div className="space-y-5">
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}  
          errors={errors}
          required
          className="bg-white text-gray-900 border-2 border-gray-200 rounded-xl px-4 py-3
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   placeholder-gray-400 transition-all duration-300"
        />
        <Input
          id="password"
          label="Password"
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          className="bg-white text-gray-900 border-2 border-gray-200 rounded-xl px-4 py-3
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   placeholder-gray-400 transition-all duration-300"
        />
      </div>
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-6 bg-gray-50 p-6 rounded-xl">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-gray-50 px-4 text-gray-600 font-medium">Or continue with</span>
        </div>
      </div>

      <Button 
        outline 
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
        className="bg-white text-gray-700 border border-gray-300 rounded-xl py-3
                 hover:bg-gray-50 active:bg-gray-100 transition-all duration-300
                 shadow-sm hover:shadow-md"
      />
      
      <div className="text-gray-700 text-center mt-2">
        <p className="text-sm">First time using ReNto?
          <span 
            onClick={onToggle} 
            className="ml-1 text-blue-600 cursor-pointer hover:underline font-medium
                     transition-colors duration-300"
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
      className="bg-white rounded-2xl shadow-xl max-w-md mx-auto p-6
               transform transition-all duration-300 ease-out"
    />
  );
}

export default LoginModal;