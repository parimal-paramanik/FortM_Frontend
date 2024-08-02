import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assests/favicon.png"
import logoo from "../../assests/contact.svg"
const Authentication = () => {
  const [loading,setLoading] = useState(false)
  return (
    <>
    <main className="font-space text-offblack bg-transparent w-full h-[80%] border-3 border-red-800  ">
        <section className="flex w-full h-full items-center ">
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
              <div className="w-full max-w-[424px] flex flex-col lg:block ">
                <div className="space-y-2 lg:space-y-4 mb-4 w-full mt-9 md:mt-0">
                  <h1 className="font-bold text-[28px] lg:text-5xl leading-9 lg:leading-[56px] text-offblack">
                   Admin Register
                  </h1>
                </div>
                <form action="" className="w-full" >
                  <div className="space-y-4">
                    <div className="flex flex-col lg:flex-row lg:space-x-5 space-y-4 lg:space-y-0">
                    </div>
                    <label htmlFor="" className="flex flex-col relative">
                      <span className="w-full flex items-center space-x-2 font-medium text-md text-left leading-5 text-offblack mb-2 capitalize">
                        Name
                      </span>
                      <input
                        type="text"
                        className="w-full active:border-light text-offblack p-4 bg-white  border-[1.5px] disabled:bg-[#83819729] disabled:border-[#83819729] border-offblack/10 focus:border-light text-md h-12 overflow-hidden font-normal rounded outline-none"
                        placeholder="JohnDoe"
                        // onChange={UserNameChange}
                      />
                    </label>
                    <label htmlFor="" className="flex flex-col relative">
                      <span className="w-full flex items-center space-x-2 font-medium text-md text-left leading-5 text-offblack mb-2 capitalize">
                        Mobile Number
                      </span>
                      <input
                        type="text"
                        className="w-full active:border-light text-offblack p-4 bg-white  border-[1.5px] disabled:bg-[#83819729] disabled:border-[#83819729] border-offblack/10 focus:border-light text-md h-12 overflow-hidden font-normal rounded outline-none"
                        placeholder="JohnDoe"
                        // onChange={UserNameChange}
                      />
                    </label>
                    <label htmlFor="" className="flex flex-col relative">
                      <span className="w-full flex items-center space-x-2 font-medium text-md text-left leading-5 text-offblack mb-2 capitalize">
                        email
                      </span>
                      <input
                        type="email"
                        className="w-full active:border-light text-offblack p-4 bg-white  border-[1.5px] disabled:bg-[#83819729] disabled:border-[#83819729] border-offblack/10 focus:border-light text-md h-12 overflow-hidden font-normal rounded outline-none"
                        placeholder="JohnDoe@gmail.com"
                        // onChange={emailChange}
                      />
                    </label>
                    <label htmlFor="" className="flex flex-col relative">
                      <span className="w-full flex items-center space-x-2 font-medium text-md text-left leading-5 text-offblack mb-2 capitalize">
                        password
                      </span>
                      <input
                        // type={isPasswordVisible ? "text" : "password"}
                        type={"password"}
                        className="w-full active:border-light text-offblack py-4 pl-4 pr-16 bg-white  border-[1.5px] disabled:bg-[#83819729] disabled:border-[#83819729] border-offblack/10 focus:border-light text-md h-12 overflow-hidden font-normal rounded outline-none"
                        placeholder="••••••••"
                        // onChange={passwordChange}
                      />
                      <button
                        type="button"
                        className="absolute focus:border-light focus:outline-light flex items-center justify-center h-[44px] w-12 right-[2px] top-[30px] cursor-pointer"
                        // onClick={TogglePassword}
                      >
                        <div className="text-primary font-bold pr-4 capitalize">
                          {/* {isPasswordVisible ? "Hide" : "Show"} */}
                          Hide
                        </div>
                      </button>
                    </label>
                   
                  </div>
                  <button
                    type="submit"
                    className="capitalize mt-5 p-4 bg-blue-200 w-full rounded-lg  text-lg font-bold text-primary "
                    // disabled={isSubmitting}
                  >
                    {/* {isSubmitting ? "Loading..." : "Submit"} */}
                    Submit
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

export default Authentication;
