function MainNavPage() {
    return(
     <div>
            {/* NAVIGATION BAR*/}
         <nav className="shadow bg-white-300 dark:bg-gray-800">
  <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
    <div className="flex items-center justify-between">
      <div>
        <a
          className="text-2xl font-bold text-blue-800 transition-colors duration-200 transform dark:text-white lg:text-3xl hover:text-blue-700 dark:hover:text-blue-300"
          href="/"
        >
          .CARS
        </a>
      </div>
      {/* Mobile menu button */}
      <div className="flex md:hidden">
        <button
          type="button"
          className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
          aria-label="toggle menu"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
            <path
              fillRule="evenodd"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
            />
          </svg>
        </button>
      </div>
    </div>
    {/* Mobile Menu open: "block", Menu closed: "hidden" */}
    <div className="items-center md:flex">
      <div className="flex flex-col md:flex-row md:mx-6">
       
      <button className="px-4 py-2 mt-6 text-xs font-medium text-white uppercase transition duration-300 ease-in-out delay-150 transform bg-blue-600 rounded hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500w-full w-30 lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500"><a
          className="my-1 text-sm font-medium md:mx-4 md:my-0"
          href="#"
        >
          BUY A CAR
        </a></button>
     
      </div>
    </div>
  </div>
</nav>
</div>
    )
}
export default MainNavPage