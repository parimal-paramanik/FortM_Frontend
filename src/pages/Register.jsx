import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import logoo from "../../assests/contact.svg";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !mobile) {
      return toast.error("Fields are required");
    }

    const nameRegex = /^[A-Za-z\s]{4,}$/; // Minimum 4 letters in the name
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{8,16}$/;
    const mobileregx = /^(\+\d{1,3}[- ]?)?\d{10}$/;

    if (!nameRegex.test(name)) {
      return toast.error("Require Minimum 4 letters in the name (NO NUMBERS)");
    }
    if (!emailRegex.test(email)) {
      return toast.error("Invalid email format!");
    }
    if (!mobileregx.test(mobile)) {
      return toast.error("Invalid mobile format!");
    }
    if (!passwordRegex.test(password)) {
      return toast.error("Password must be 8-16 characters, contain at least one special character, one number, and one uppercase letter!");
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `http://localhost:8080/signup`,
        {
          name,
          email,
          password,
          mobile,
        }
      );
      // console.log(response.data);
      if (response.status === 200) {
        toast.success("Signup successful");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error registering:", error.response?.data?.error || error);
      toast.error(error.response?.data?.error || "An error occurred during registration");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="font-space text-offblack bg-transparent w-full min-h-[75%] border-3 border-red-800">
        <section className="flex w-full h-full items-center">
          <figure className="w-1/2 h-full relative hidden lg:block lg:bg-transparent">
            <section className="fixed top-0 h-full w-1/2">
              <img
                src={logoo}
                alt="logoo"
                decoding="async"
                className="absolute top-[60%] -translate-y-[70%] left-[20%] -translate-x-1/2 w-[80vh]"
              />
            </section>
          </figure>
          <main className="w-full lg:w-1/2 px-3 md:px-0">
            <section className="container relative pt-16 md:pt-20 pb-8 flex justify-center xl:justify-start">
              <div className="w-full max-w-[424px] flex flex-col lg:block">
                <div className="space-y-2 lg:space-y-4 mb-4 w-full mt-9 md:mt-0">
                  <h1 className="font-bold text-[20px] lg:text-3xl leading-9 lg:leading-[56px] text-offblack">
                    Admin Register
                  </h1>
                </div>
                <form className="w-full" onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <label htmlFor="name" className="flex flex-col relative">
                      <span className="w-full flex items-center space-x-2 font-medium text-md text-left leading-5 text-offblack mb-2 capitalize">
                        Name
                      </span>
                      <input
                        type="text"
                        className="w-full active:border-light text-offblack p-4 bg-white border-[1.5px] disabled:bg-[#83819729] disabled:border-[#83819729] border-offblack/10 focus:border-light text-md h-12 overflow-hidden font-normal rounded outline-none"
                        placeholder="JohnDoe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </label>
                    <label htmlFor="mobile" className="flex flex-col relative">
                      <span className="w-full flex items-center space-x-2 font-medium text-md text-left leading-5 text-offblack mb-2 capitalize">
                        Mobile Number
                      </span>
                      <input
                        type="text"
                        className="w-full active:border-light text-offblack p-4 bg-white border-[1.5px] disabled:bg-[#83819729] disabled:border-[#83819729] border-offblack/10 focus:border-light text-md h-12 overflow-hidden font-normal rounded outline-none"
                        placeholder="456987452"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </label>
                    <label htmlFor="email" className="flex flex-col relative">
                      <span className="w-full flex items-center space-x-2 font-medium text-md text-left leading-5 text-offblack mb-2 capitalize">
                        Email
                      </span>
                      <input
                        type="email"
                        className="w-full active:border-light text-offblack p-4 bg-white border-[1.5px] disabled:bg-[#83819729] disabled:border-[#83819729] border-offblack/10 focus:border-light text-md h-12 overflow-hidden font-normal rounded outline-none"
                        placeholder="JohnDoe@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>
                    <label htmlFor="password" className="flex flex-col relative">
                      <span className="w-full flex items-center space-x-2 font-medium text-md text-left leading-5 text-offblack mb-2 capitalize">
                        Password
                      </span>
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        className="w-full active:border-light text-offblack py-4 pl-4 pr-16 bg-white border-[1.5px] disabled:bg-[#83819729] disabled:border-[#83819729] border-offblack/10 focus:border-light text-md h-12 overflow-hidden font-normal rounded outline-none"
                        placeholder="•••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute focus:border-light focus:outline-light flex items-center justify-center h-[44px] w-12 right-[2px] top-[30px] cursor-pointer"
                        onClick={() => setIsPasswordVisible((prev) => !prev)}
                      >
                        <div className="text-primary font-bold pr-4 capitalize">
                          {isPasswordVisible ? "Hide" : "Show"}
                        </div>
                      </button>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="capitalize mt-5 p-4 bg-blue-200 w-full rounded-lg text-lg font-bold text-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Loading..." : "Submit"}
                  </button>
                </form>
                <div className="my-7 text-center lg:text-left text-offblack">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary capitalize font-bold leading-6 hover:underline"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </section>
          </main>
        </section>
      </main>
    </>
  );
};

export default Register;
