//@ts-check
import Head from "next/head";
import Script from "next/script";
import Image from "next/image";
import MainNavPage from "../components/MainNav";
import CardPage from "../components/UI/Card";

// useState, useEffect
import { useState, useEffect } from "react";

// axios
import axios from "axios";

// hot toast
import { Toaster, toast } from "react-hot-toast";
import Footer from "../components/footer";

// init Home component
export default function Home() {
  // init useState
  const [carsList, setCarsList] = useState([]);

  // init useEffect
  useEffect(() => {
    // invoke fetchData function
    fetchData();
  }, []);

  // init fetch data function
  const fetchData = async () => {
    try {
      // make api request to fetch cars listing
      const response = await axios.get(
        `https://auto.dev/api/listings?apikey=${process.env.NEXT_PUBLIC_CARS_API_KEY}&year_min=2016`
      );

      //destructuring
      const { data } = response;

      // destructure record
      const { records } = data;

      console.log(records);

      // push records to cars state
      setCarsList(records);
    } catch (error) {
      console.log(error);
      return toast.error(error.message);
    }
  };

  return (
    <div>
      <Head>
        <title>Cars</title>
        <Script src="https://cdn.tailwindcss.com" />
      </Head>
      <Toaster />
      <MainNavPage />

      <div className="bg-white dark:bg-gray-800">
        <div className="container px-6 py-16 mx-auto">
          <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
              <div className=" lg:max-w-lg">
                <h1 className="text-2xl font-semibold leading-snug text-center text-gray-800 uppercase dark:text-white md:text-4xl lg:text-bold lg:text-left">
                  BEST PLACE TO GET{" "}
                  <span className="text-blue-800 ">AFFORDABLE CARS</span>
                </h1>
                <p className="mt-6 text-center text-gray-600 dark:text-gray-400 lg:text-left">
                  .CARS bring to you different brand of cars and also at
                  affordable price. SHOP NOW and PAY NOW
                </p>
              </div>
            </div>
            <div className="items-center justify-center hidden w-full mt-6 md:flex lg:mt-0 lg:w-1/2">
              <Image
                className="w-full h-full lg:max-w-2xl"
                src="/car2.jpg"
                alt="Car1"
                width={650}
                height={550}
                priority={true}
              />
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-center text-gray-800 lg:text-4xl ">
        Recommended <span className="text-blue-800">cars</span>{" "}
      </h2>
      <CardPage cars_list={carsList} />

      <Footer/>
    </div>
  );
}
