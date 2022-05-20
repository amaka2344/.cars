
import MainNavPage from "../components/MainNav";
//import head
import Head from "next/head";

//import footer
import Footer from "../components/footer";

//router
import { useRouter } from "next/router";

//import useState
import { useState } from "react";

//import filestack for uploading image
import * as filestack from "filestack-js";

//hot toast
import { Toaster, toast } from "react-hot-toast";

//validator
import isEmail from "validator/lib/isEmail";

import isMobilePhone from "validator/lib/isMobilePhone";

const client = filestack.init(process.env.NEXT_PUBLIC_FILESTACK_API);

const PersonalInfo = () => {
  // init use state for multiple input
  const [input, setInput] = useState({
    fName: "",
    lName: "",
    email: "",
    phoneNum: "",
  });

  //driving license statet
  const [drivingLicence, setDrivingLicense] = useState("");

  //nin usestate
  const [nationalId, setNationalId] = useState("");

  //init router
  const router = useRouter();



  //set the multiple input to target each value written
  const onChangeInHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleNationalId = () => {
    const options = {
      onFileSelected: (file) => {
        // validate file extension: We only want image files
        if (!/\.(jpe?g|png|bmp|webp)$/i.test(file.filename)) {
          return toast.error(`Please select only image files.`);
        }

        // validate file size
        if (file.size > 5000 * 1000) {
          return toast.error("File too big, select something smaller than 5MB");
        }
      },

      onFileUploadFinished: (reference) => {
        //get the uploaded image url
        const uploadedImageUrl = reference.url;

        //push the image url to state
        setNationalId(uploadedImageUrl);
      },
    };
    client.picker(options).open();
  };

  const handleUploadDrivingLincense = () => {
    const options = {
      onFileSelected: (file) => {
        // validate file extension: We only want image files
        if (!/\.(jpe?g|png|bmp|webp)$/i.test(file.filename)) {
          return toast.error(`Please select only image files.`);
        }

        // validate file size
        if (file.size > 5000 * 1000) {
          return toast.error(
            "Image too big, select something smaller than 5MB"
          );
        }
      },

      onFileUploadFinished: (reference) => {
        // get uploaded image url
        const uploadedImageUrl = reference.url;

        // push the image url to state
        setDrivingLicense(uploadedImageUrl);
      },
    };

    client.picker(options).open();
  };

  //submit function to validate each input using validator
  const onSubmitHandler = () => {
    
    // get input
    const formData = {
      ...input,
      drivingLicence: drivingLicence,
      nationalId: nationalId,
    };

    // validate
    if (!formData.fName) {
      return toast.error("Please enter your first name");
    }
    if (!formData.lName) {
      return toast.error("please enter your last name", {
        style: { maxWidth: "100%" },
      });
    }
    if (!formData.email) {
      return toast.error("please enter your email", {
        style: { maxWidth: "100%" },
      });
    }

    if (!isEmail(formData.email)) {
      return toast.error("please enter a valid email", {
        style: { maxWidth: "100%" },
      });
    }

    if (!formData.phoneNum) {
      return toast.error("please enter your phone number", {
        style: { maxWidth: "100%" },
      });
    }

    if (!isMobilePhone(formData.phoneNum, "en-NG")) {
      return toast.error("please enter a valid phone number", {
        style: { maxWidth: "100%" },
      });
    }

    if (!formData.drivingLicence) {
      return toast.error("Please upload your driving license", {
        style: { maxWidth: "100%" },
      });
    }

    if (!formData.nationalId) {
      return toast.error("Please upload your national identity card", {
        style: { maxWidth: "100%" },
      });
    }

    // save data to local storage
    localStorage.setItem("PersonalDetails", JSON.stringify(formData))

    //route to another page
    return router.push({ pathname: "/shipping-details" });

  };

  return (
    <>
      <Toaster />
      <Head>
        <title>Cars</title>
      </Head>
      <MainNavPage />
      <div className="px-4 py-10 text-center sm:px-0">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Personal Information
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Fill out the form for better Identification
        </p>
      </div>
      <section className="max-w-4xl px-6 pb-20 mx-auto mt-10 bg-white rounded-md dark:bg-gray-800">
        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="name"
              >
                First Name:{" "}
              </label>
              <input
                onChange={onChangeInHandler}
                id="Name"
                type={"text"}
                name="fName"
                value={input.fName}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="Lname"
              >
                Last Name:{" "}
              </label>
              <input
                onChange={onChangeInHandler}
                id="lName"
                name="lName"
                type={"text"}
                value={input.lName}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="email"
              >
                Email:{" "}
              </label>
              <input
                onChange={onChangeInHandler}
                id="email"
                type={"email"}
                name="email"
                value={input.email}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="tel">
                Phone Number:{" "}
              </label>
              <input
                onChange={onChangeInHandler}
                id="tel"
                type={"tel"}
                name="phoneNum"
                value={input.phoneNum}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div
              onClick={() => handleUploadDrivingLincense()}
              className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md"
            >
              <div className="space-y-1 text-center cursor-pointer">
                <svg
                  className="w-12 h-12 mx-auto text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {drivingLicence ? (
                  <div className="flex text-sm text-gray-600">
                    <p className="pl-1">Driving Lincense Added</p>
                    <label
                      htmlFor="file-upload"
                      className="relative ml-1 font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Change</span>
                    </label>
                  </div>
                ) : (
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a Driving License</span>
                    </label>
                    <p className="pl-1">For Legal Authorization</p>
                  </div>
                )}
                <p className="text-xs text-gray-500">PNG|JPG Max 5mb</p>
              </div>
            </div>

            <div
              onClick={() => handleNationalId()}
              className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md"
            >
              <div className="space-y-1 text-center cursor-pointer">
                <svg
                  className="w-12 h-12 mx-auto text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {nationalId ? (
                  <div className="flex text-sm text-gray-600">
                    <p className="pl-1">National Id Added</p>

                    <label
                      htmlFor="file-upload"
                      className="relative ml-1 font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span> Change</span>
                    </label>
                  </div>
                ) : (
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a National Identity Card</span>
                    </label>
                    <p className="pl-1">For Legal Authorization</p>
                  </div>
                )}

                <p className="text-xs text-gray-500">PNG|JPG Max 5mb</p>
              </div>
            </div>
          </div>


          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={() => onSubmitHandler()}
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-gray-600"
            >
              Next
            </button>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default PersonalInfo;
