//@ts-check

//import image from nextjs
import Image from "next/image";

// import comma number
import commaNumber from "comma-number";

// router
import { useRouter } from "next/router";



// cardpage component
function CardPage({ cars_list }) {
  // invole useRouter
  const router = useRouter();

  console.log("CARD PAGE", cars_list);


  // init handleSelectCar function
  const handleSelectCar = (selectedCar) => {
    console.log("CARD", selectedCar);

      // save to local storage
      localStorage.setItem('selectedCar', JSON.stringify(selectedCar))
      
    // redirect user to details page
    return router.push("/details");
  };

  return (
    <div className="flex items-center justify-center w-screen p-10">
      <div className="grid max-w-6xl grid-cols-1 gap-2 xl:grid-cols-4 md:grid-cols-2">
        {cars_list.map((car, index) => {
          return (
            <div
              key={index}
              onClick={() => handleSelectCar(car)}
              className="flex flex-col p-4 m-2 rounded-lg cursor-pointer"
            >
              <Image
                className="h-40 rounded-lg"
                src={car.primaryPhotoUrl}
                alt={"car2.jpg"}
                width={100}
                height={150}
              />
              <div className="flex flex-col items-start mt-4">
                <div
                  className="tooltip"
                  data-tip={`${car.make}-${car.model}`}
                  style={{ maxWidth: "100%" }}
                >
                  <h4 className="text-2xl font-bold truncate">
                    {car.make}-{car.model}
                  </h4>
                </div>

                <p className="text-xl">
                  &#8358;{commaNumber(car.priceUnformatted * 580)}
                </p>

                <div className="mt-3 badge">{car.condition}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default CardPage;
