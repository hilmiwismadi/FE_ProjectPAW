"use client";

import React from "react";
import Image from "next/image";
import login from "../../../services/auth.service.js";
import { useEffect, useState, FormEvent } from "react";

export default function page() {
  const [loginFailed, setLoginFailed] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      username: (e.target as HTMLFormElement).username.value,
      password: (e.target as HTMLFormElement).password.value,
    };

    login(data, (status: boolean, res: any) => {
      if (status) {
        localStorage.setItem("token", res);
        window.location.href = "/mahasiswa";
      } else {
        setLoginFailed(res.response.data);
      }
    });
  };

  useEffect(() => {
    setLoginFailed("");
  }, [username, password]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col mx-3 sm:m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-3xl sm:text-4xl font-bold text-slate-800">
            Welcome back
          </span>
          <span className={`font-light text-sm sm:text-base text-slate-500 ${loginFailed ? "mb-4" : "mb-8"}`}>
            Welcome back! Please enter your details
          </span>
          {loginFailed && (
            <p className="text-center text-red-500">{loginFailed}</p>
          )}
          <form onSubmit={handleLogin}>
            <div className="py-4">
              <span className="mb-2 text-md text-slate-500 text-sm sm:text-base">Userame</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 text-slate-500"
                name="username"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md text-slate-500">Password</span>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 text-slate-500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between w-full py-4">
              <div className="mr-24">
                <input
                  type="checkbox"
                  name="ch"
                  id="ch"
                  className="mr-2 cursor-pointer"
                />
                <span className="text-md text-slate-500 sm:text-base text-sm">
                  Remember for 30 days
                </span>
              </div>
              <span className="font-bold text-md text-slate-500 cursor-pointer sm:text-base text-sm">
                Forgot password
              </span>
            </div>
            <button className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300">
              Sign in
            </button>
          </form>
          <button className="w-full border border-gray-300 text-slate-500 p-2 rounded-lg mb-6 hover:bg-black hover:text-white">
            <Image
              src="/googleIcon.svg"
              alt="img"
              className="w-6 h-6 inline mr-2"
              width={16}
              height={16}
            />
            Sign in with Google
          </button>
          <div className="text-center text-gray-400 sm:text-base text-sm">
            Don't have an account?
            <span className="font-bold text-black pl-3 cursor-pointer sm:text-base text-sm">
              Sign up for free
            </span>
          </div>
        </div>
        <div className="relative">
          <img
            src="/loginImage.jpg"
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
          <div className="absolute hidden bottom-10 right-6 p-6 bg-black bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
            <span className="text-white text-lg">
              Belajar bareng teman baru, saling support, dan jadi lebih pintar!
              <br />
              Mulai petualangan belajarmu sekarang!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
