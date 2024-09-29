"use client";

import React from "react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FiChevronDown } from "react-icons/fi";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("mahasiswa");
  const [registerFailed, setRegisterFailed] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setRegisterFailed(
        passwordValidation.errorMessage || "Password validation failed."
      );
      return;
    }

    const data = {
      username,
      email,
      password,
      role
    };

    try {
      const res = await axios.post("", data);
      localStorage.setItem("token", res.data.token);
      router.push("/login");
    } catch (error: any) {
      if (error.response) {
        setRegisterFailed(error.response.data.message);
      } else {
        setRegisterFailed("Registration failed. Please try again.");
      }
    }
  };

  const validatePassword = (password: string) => {
    const hasMinimumLength = password.length >= 8;
    const hasLettersAndNumbers = /(?=.*[a-zA-Z])(?=.*[0-9])/.test(password);

    if (!hasMinimumLength) {
      return {
        isValid: false,
        errorMessage: "Password must be at least 8 characters long.",
      };
    } else if (!hasLettersAndNumbers) {
      return {
        isValid: false,
        errorMessage: "Password must contain both letters and numbers.",
      };
    } else if (password !== confirmPassword) {
      return { 
        isValid: false, 
        errorMessage: "Password do not match.",
      }
    }

    return { isValid: true };
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col mx-3 sm:m-6 bg-white shadow-2xl rounded-2xl md:flex-row-reverse md:space-y-0">
        <div className="flex flex-col justify-center p-8">
          <span className="mb-3 text-3xl sm:text-4xl font-bold text-slate-800 px-10">
            Create your account
          </span>
          <span
            className={`font-light text-sm sm:text-base text-center text-slate-500 ${
              registerFailed ? "mb-3" : "mb-6"
            }`}
          >
            Please fill in your details to make an account
          </span>
          {registerFailed && (
            <p className="text-center text-red-500">{registerFailed}</p>
          )}
          <form onSubmit={handleRegister} className="w-full">
            <div className="py-2">
              <span className="mb-2 text-md text-slate-500">Username</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 text-slate-500"
                name="username"
                id="username"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="py-2">
              <span className="mb-2 text-md text-slate-500">Email</span>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 text-slate-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="py-2">
              <span className="mb-2 text-md text-slate-500">Password</span>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 text-slate-500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="py-2">
              <span className="mb-2 text-md text-slate-500">
                Confirm Password
              </span>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                required
                className="w-full p-2 border border-gray-300 rounded-md
                placeholder:font-light placeholder:text-gray-500 text-slate-500"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="py-2 relative">
              <label htmlFor="role" className="mb-2 text-md text-slate-500">
                Role
              </label>
              <div
                className="w-full p-2 border border-gray-300 rounded-md text-slate-500 flex justify-between items-center cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{role.charAt(0).toUpperCase() + role.slice(1)}</span>
                <FiChevronDown
                  className={`transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              {isDropdownOpen && (
                <ul className="absolute z-10 bg-white border border-gray-300 text-slate-500 rounded-md mt-1 w-full">
                  <li
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setRole("mahasiswa");
                      setIsDropdownOpen(false);
                    }}
                  >
                    Mahasiswa
                  </li>
                  <li
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setRole("dosen");
                      setIsDropdownOpen(false);
                    }}
                  >
                    Dosen
                  </li>
                  <li
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setRole("admin");
                      setIsDropdownOpen(false);
                    }}
                  >
                    Admin
                  </li>
                </ul>
              )}
            </div>
            <button className="w-full bg-black text-white p-2 mt-6 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300">
              Sign up
            </button>
          </form>
          <div className="text-center text-gray-400 sm:text-base text-sm">
            Already have an account?
            <span
              className="font-bold text-black pl-3 cursor-pointer sm:text-base text-sm"
              onClick={() => router.push("/login")}
            >
              Log in
            </span>
          </div>
        </div>
        <div className="relative mx-4">
          <img
            src="/loginImage.jpg"
            alt="img"
            className="w-[400px] h-full hidden rounded-l-2xl md:block object-contain -scale-x-100"
          />
          <div className="absolute hidden bottom-10 left-6 p-5 bg-black bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
            <span className="text-white text-lg">
              Yuk, daftarkan diri dan mulai berpetualang dengan pembelajaran
              seru!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
