'use client';

import axios from "axios";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
    .then(() => {
      toast.success('Registered!');
      registerModal.onClose();
      loginModal.onOpen();
    })
    .catch((error) => {
      toast.error(error);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal])

  const bodyContent = (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <Heading
          title="Welcome to ReNto"
          subtitle="Create an account!"
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
          id="name"
          label="Name"
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
  )

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
        <p className="text-sm">Already have an account?
          <span 
            onClick={onToggle} 
            className="ml-1 text-blue-600 cursor-pointer hover:underline font-medium
                     transition-colors duration-300"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
      className="bg-white rounded-2xl shadow-xl max-w-md mx-auto p-6
               transform transition-all duration-300 ease-out"
    />
  );
}

export default RegisterModal;