import { useState, useEffect } from "react";
import Footer from "../components/footer";
import MainNavPage from "../components/MainNav";
import Head from "next/head";

// parse db
import Parse from "../config/db.config";

//nigeria-state-LGA
import NaijaStates from "naija-state-local-government";

// Toaster
import { Toaster, toast } from "react-hot-toast";

//paystack
import { usePaystackPayment } from "react-paystack";

// comma number
import commaNumber from "comma-number";

// useRouter
import { useRouter } from "next/router";

// axios
import axios from "axios";

// nanoId to generate order number for the car purchased
import {nanoid} from "nanoid";



// Delivery Address Component
const DeliveryAddress = () => {
  // init router
  const router = useRouter();

  // states
  const [naijaStates, setNaijaStates] = useState([]);

  // lgas
  const [lgas, setLgas] = useState([]);

  // init selectedLga
  const [selectedLga, setSelectedLga] = useState("");

  // init selectedNaijaState
  const [selectedNaijaState, setSelectedNaijaState] = useState("");

  // init popularLandMark
  const [popularLandMark, setPopularLandmark] = useState("");

  // init deliveryAddress
  const [deliveryAddress, setDeliveryAddress] = useState("");

  // init selectedCar
  const [selectedCar, setSelectedCar] = useState(null);

  // init selectedCarPrice
  const [selectedCarPrice, setSelectedCarPrice] = useState(0);

  // init useEffect
  useEffect(() => {
    // get naijaStates
    const _naijaStates = NaijaStates.states();

    // update naija states
    setNaijaStates(_naijaStates);

    // get data from local storage
    const selectedCar = localStorage.getItem("selectedCar");

    console.log("Selected car", JSON.parse(selectedCar));

    // update selectedCar
    setSelectedCar(selectedCar && JSON.parse(selectedCar));

    // update selectedCarPrice
    setSelectedCarPrice(
      selectedCar && Number(JSON.parse(selectedCar).priceUnformatted) * 580
    );

    console.log(process.env.NEXT_PUBLIC_PAYSTACK_API);
  }, []);

  // init handleSelectState function
  const handleSelectState = (selected_state) => {
    // check for selected state
    if (selected_state) {
      // update selectedNaijaState
      setSelectedNaijaState(selected_state);

      // get lgas
      const _lgas = NaijaStates.lgas(selected_state);

      // update lgas state
      setLgas(_lgas.lgas);
    }
  };

  //setting config to a state dynamically capture info from form
  const Config = {
    reference: new Date().getTime().toString(),
    name: ".Cars",
    email: "bchukwuemekab@gmail.com",
    amount: selectedCarPrice && selectedCarPrice * 10,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_API,
  };

  //init config
  const initializePayment = usePaystackPayment(Config);

  //callback if transaction is completed
  const onSuccess = async (reference) => {
    try {
      // show payment processing status
      toast.loading("Payment processing");

      // init orderNumber
      const orderNumber = nanoid()

      // payment reference
      const paymentReference = reference;

      // get selectedCar
      const _selectedCar = selectedCar;

      // get selectedCarPrice
      const _selectedCarPrice = selectedCarPrice;

      // get personalDetails
      const personalDetails = JSON.parse(
        localStorage.getItem("PersonalDetails")
      );

      // delivery details
      const _deliveryDetails = {
        selectedNaijaState,
        selectedLga,
        popularLandMark,
        deliveryAddress,
      };

      console.log("Car", _selectedCar);
      console.log("Personal Details", personalDetails);
      console.log("Delivery Details", _deliveryDetails);
      console.log("Reference", paymentReference);

      // init collection
      const Order = new Parse.Object("Order");

      // save order purchase
      Order.set("selectedCar", _selectedCar);
      Order.set("selectedCarPrice", _selectedCarPrice);
      Order.set("personalDetails", personalDetails);
      Order.set("deliveryDetails", _deliveryDetails);
      Order.set("orderNumber", orderNumber)
      Order.set("status", "processing")

      // save Order
      await Order.save();

      // init emailData
      const emailData = {
        firstName: personalDetails.fName,
        lastName: personalDetails.lName,
        email: personalDetails.email,
        carMake: _selectedCar.make,
        carModel: _selectedCar.model,
        carPrice: commaNumber(_selectedCarPrice),
        carCondition: _selectedCar.condition,
        orderNumber: orderNumber
      }

      // send email
      await axios.post(`${process.env.NEXT_PUBLIC_EMAIL_API}/send/order/purchase/email`, emailData)

      setTimeout(() => {
        // stop loading toast
        toast.dismiss();


         // show success toast
        toast.success(
          "Thank you for purchasing this car, You'll recieve an email notification on the status of your order",
          { style: { maxWidth: "100%" }, duration: 5000 }
        );


        return router.push({pathname: '/'});
      }, 5000);

     //show error toast
    } catch (error) {
      console.log(error);
      return toast.error(error.message);
    }
  };

  //callback if payment is closed
  const onClose = () => {
    return toast.error("oops, payment not completed");
  };

  const handleSubmit = () => {
    // init deliveryData
    const deliveryData = {
      selectedNaijaState: selectedNaijaState,
      selectedLga: selectedLga,
      popularLandMark: popularLandMark,
      deliveryAddress: deliveryAddress,
    };

    // validate
    if (!deliveryData.selectedNaijaState) {
      return toast.error("Please select state to continue", {
        style: { maxWidth: "100%" },
      });
    }
    if (!deliveryData.selectedLga) {
      return toast.error("Please select local government area to continue", {
        style: { maxWidth: "100%" },
      });
    }
    if (!deliveryData.popularLandMark) {
      return toast.error("Please select popular landmark to continue", {
        style: { maxWidth: "100%" },
      });
    }
    if (!deliveryData.deliveryAddress) {
      return toast.error("Please select delivery address to continue", {
        style: { maxWidth: "100%" },
      });
    }

    //save to local storage
    localStorage.setItem("DeliveryDetails", JSON.stringify(deliveryData));

    // invoke paystack init payment
    initializePayment(onSuccess, onClose);
  };

  return (
    <div>
      <Head>
        <title>Cars</title>
      </Head>
      <Toaster />

      <MainNavPage />

      <section className="max-w-4xl p-6 mx-auto mt-10 bg-white rounded-md dark:bg-gray-800">
        <h3 className="font-medium leading-6 text-center text-gray-900 text-">
          Shipping Information
        </h3>
        <p className="mt-1 mb-8 text-sm text-center text-gray-600">
          Fill out shipping details below
        </p>
        <form>
          <div className="mt-8">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              State:{" "}
            </label>
            <select
              onChange={(event) => handleSelectState(event.target.value)}
              id="country"
              className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option>select State</option>
              {naijaStates &&
                naijaStates.map((state, index) => {
                  return (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  );
                })}
            </select>
            <small>Select the state of delivery address</small>
          </div>

          <div className="mt-8">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Local Government Area (LGA):{" "}
            </label>
            <select
              onChange={(event) => setSelectedLga(event.target.value)}
              id="country"
              name="country"
              autoComplete="country-name"
              className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option>select Local government</option>
              {lgas &&
                lgas.map((lga, index) => {
                  return (
                    <option key={index} value={lga}>
                      {lga}
                    </option>
                  );
                })}
            </select>
            <small>
              Select the local government area (LGA) of delivery address
            </small>
          </div>

          <div className="mt-8">
            <label
              htmlFor="region"
              className="block text-sm font-medium text-gray-700"
            >
              Popular landmark of shipping address:{" "}
            </label>
            <input
              onChange={(event) => setPopularLandmark(event.target.value)}
              type="text"
              name="deliveryAdd"
              id="region"
              autoComplete="address-level1"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
          </div>

          <div className="mt-8">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium text-gray-700"
            >
              Delivery Address:{" "}
            </label>
            <input
              onChange={(event) => setDeliveryAddress(event.target.value)}
              type="text"
              name="streetAdd"
              id="street-address"
              autoComplete="street-address"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
          </div>

          <div className="my-8">
            <h3>
              Total:{" "}
              <b>
                &#8358;{selectedCarPrice ? commaNumber(selectedCarPrice) : 0}
              </b>
            </h3>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              PAY NOW
            </button>
          </div>
        </form>
      </section>
      <Footer />
    </div>
  );
};

export default DeliveryAddress;
