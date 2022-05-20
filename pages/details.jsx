import { useEffect, useState } from "react";

import Head from "next/head";

import Image from "next/image";

import MainNavPage from "../components/MainNav";

// router
import { useRouter } from "next/router";

//import comma number
import commaNumber from "comma-number";
import Footer from "../components/footer";

//import react-loading-skeleton
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// init Details component
const Details = () => {
  // init router
  const router = useRouter();

  // init selectedCar
  const [selectedCar, setSelectedCar] = useState({});

  useEffect(() => {
    // get selected car from local storage
    const _selectedCar = localStorage.getItem("selectedCar");

    // push to selectedCar state
    setSelectedCar(JSON.parse(_selectedCar));

    console.log("DETAILS", JSON.parse(_selectedCar));
  }, []);

  // init handleNext
  const handleNext = () => {
    router.push({ pathname: "/personal" });
  };

  return (
    <>
      <Head>
        <title>Cars</title>
      </Head>
      <MainNavPage />

      <div>
        {selectedCar.photoUrls ? (
          <>
            <div className="carousel">
              {selectedCar.photoUrls.map((photo, index) => {
                return (
                  <div key={index} className="carousel-item">
                    <img src={photo} alt={"car"} />
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <Skeleton height="100px" />
          </>
        )}
      </div>

      <div className="container px-6 mx-auto my-24">
        <section className="mb-32 text-center text-gray-800">
          <div className="grid items-center md:grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-0">
            <div className="relative mb-12 lg:mb-0">
              <svg
                className="w-12 h-12 mx-auto mb-6 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M488.6 250.2L392 214V105.5c0-15-9.3-28.4-23.4-33.7l-100-37.5c-8.1-3.1-17.1-3.1-25.3 0l-100 37.5c-14.1 5.3-23.4 18.7-23.4 33.7V214l-96.6 36.2C9.3 255.5 0 268.9 0 283.9V394c0 13.6 7.7 26.1 19.9 32.2l100 50c10.1 5.1 22.1 5.1 32.2 0l103.9-52 103.9 52c10.1 5.1 22.1 5.1 32.2 0l100-50c12.2-6.1 19.9-18.6 19.9-32.2V283.9c0-15-9.3-28.4-23.4-33.7zM358 214.8l-85 31.9v-68.2l85-37v73.3zM154 104.1l102-38.2 102 38.2v.6l-102 41.4-102-41.4v-.6zm84 291.1l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6zm240 112l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6z"
                />
              </svg>
              <h5 className="mb-4 text-lg font-medium text-blue-600">
                {selectedCar.mileage}
              </h5>
              <h6 className="font-medium text-gray-500">Mileage (upto)</h6>
              <hr className="absolute top-0 right-0 hidden w-px h-full bg-gray-200 lg:block" />
            </div>
            <div className="relative mb-12 lg:mb-0">
              <svg
                className="w-12 h-12 mx-auto mb-6 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M12.41 148.02l232.94 105.67c6.8 3.09 14.49 3.09 21.29 0l232.94-105.67c16.55-7.51 16.55-32.52 0-40.03L266.65 2.31a25.607 25.607 0 0 0-21.29 0L12.41 107.98c-16.55 7.51-16.55 32.53 0 40.04zm487.18 88.28l-58.09-26.33-161.64 73.27c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.51 209.97l-58.1 26.33c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 276.3c16.55-7.5 16.55-32.5 0-40zm0 127.8l-57.87-26.23-161.86 73.37c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.29 337.87 12.41 364.1c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 404.1c16.55-7.5 16.55-32.5 0-40z"
                />
              </svg>
              <h5 className="mb-4 text-lg font-medium text-blue-600">
                {selectedCar.bodyType}
              </h5>
              <h6 className="font-medium text-gray-500">Body Type</h6>
              <hr className="absolute top-0 right-0 hidden w-px h-full bg-gray-200 lg:block" />
            </div>
            <div className="relative mb-12 md:mb-0">
              <svg
                className="w-12 h-12 mx-auto mb-6 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"
                />
              </svg>
              <h5 className="mb-4 text-lg font-medium text-blue-600">
                {selectedCar.displayColor}
              </h5>
              <h6 className="font-medium text-gray-500">Color</h6>
              <hr className="absolute top-0 right-0 hidden w-px h-full bg-gray-200 lg:block" />
            </div>
            <div className="relative">
              <svg
                className="w-12 h-12 mx-auto mb-6 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M320,32a32,32,0,0,0-64,0v96h64Zm48,128H16A16,16,0,0,0,0,176v32a16,16,0,0,0,16,16H32v32A160.07,160.07,0,0,0,160,412.8V512h64V412.8A160.07,160.07,0,0,0,352,256V224h16a16,16,0,0,0,16-16V176A16,16,0,0,0,368,160ZM128,32a32,32,0,0,0-64,0v96h64Z"
                />
              </svg>
              <h5 className="mb-4 text-lg font-medium text-blue-600">
                {selectedCar.trim}
              </h5>
              <h6 className="mb-0 font-medium text-gray-500">Trim</h6>
            </div>
          </div>
        </section>
      </div>

      <div className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
        <div className="w-full lg:w-1/2">
          <div className="lg:max-w-lg">
            <h1 className="text-2xl font-medium tracking-wide text-gray-800 dark:text-white lg:text-4xl">
              {selectedCar.make} {selectedCar.model}
            </h1>

            <div className="mt-2 badge">{selectedCar.city}</div>
            <div className="badge badge-primary">{selectedCar.condition}</div>
            <div className="badge badge-accent">{selectedCar.year}</div>

            <div className="grid gap-6 mt-8 sm:grid-cols-2">
              <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                <svg
                  className="w-5 h-5 mx-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="mx-3">All legal documents</span>
              </div>
              <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                <span className="mx-3 text-3xl font-bold">
                  {" "}
                  &#8358;{commaNumber(selectedCar.priceUnformatted * 580)}
                </span>
              </div>
              <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                <svg
                  className="w-5 h-5 mx-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="mx-3">Payment Security</span>
              </div>
              <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                <svg
                  className="w-5 h-5 mx-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="mx-3">Fast shipping (+ Express)</span>
              </div>
              <button
                onClick={() => handleNext()}
                className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
              >
                BUY NOW
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
          <img
            className="object-cover w-full h-full max-w-2xl rounded-md"
            src={selectedCar.primaryPhotoUrl}
            alt="glasses photo"
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Details;
