import { React, useState } from "react";

const StakePayout = () => {
  const [isSelected, setSelected] = useState(0);
  const [stakePayout, setStakePayout] = useState(10);

  const increment = (e) => {
    e.preventDefault();
    setStakePayout(stakePayout + 1);
  };

  const decrement = (e) => {
    e.preventDefault();
    setStakePayout(stakePayout - 1);
  };

  const handleChange = (e) => {
    e.preventDefault();

    // Input must be numbers only

    // If stakePayout is less than 0, set it to 0
    if (stakePayout < 0) {
      setStakePayout(0);
    }
  };

  return (
    <>
      <div className="static h-36 w-38 m-6 bg-white rounded-md items-center justify-center">
        <button className="relative h-10 w-1/2 text-lg font-bold rounded-tl-md border-b border-r hover:bg-blue-500 hover:text-white">
          Stake
        </button>
        <button className="relative h-10 w-1/2 text-lg font-bold rounded-tr-md border-b border-r hover:bg-blue-500 hover:text-white">
          Payout
        </button>
        {/* number counter */}
        <div className="border-gray-300 border-2 flex h-10 w-3/4 rounded-md relative bg-transparent mt-7 ml-8 shadow-lg">
          <button
            //   data-action="decrement"
            onClick={(e) => decrement(e)}
            className=" bg-white text-gray-600 hover:text-gray-700 hover:bg-white h-full w-20 rounded-l cursor-pointer outline-none"
          >
            <span className="m-auto text-2xl font-thin">−</span>
          </button>
          <input
            type="tel"
            className="bg-white outline-none focus:outline-none text-center w-full font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700"
            name="custom-input-number"
            defaultValue={10}
            onChange={(e) => handleChange(e)}
          ></input>
          <p className="text-gray-600 font-medium my-auto">USD</p>
          <button
            //   data-action="increment"
            onClick={(e) => increment(e)}
            className="bg-white text-gray-600 hover:text-gray-700 hover:bg-white h-full w-20 rounded-r cursor-pointer"
          >
            <span className="m-auto text-2xl font-thin">+</span>
          </button>
        </div>
      </div>

      <div className="static h-36 w-38 m-6 bg-white rounded-md grid grid-cols-1 gap-2">
        <div>
          <label className="block text-sm">Payout</label>
          <button className="absolute h-10 w-1/2 text-white bg-[#6366F1] rounded-md hover:bg-[#6366F1]/80 shadow-lg">
            Rise
          </button>
        </div>
        <div>
          <label className="block text-sm">Payout</label>
          <button className="absolute h-10 w-1/2 text-white bg-[#FF5858] rounded-md hover:bg-[#FF5858]/80 shadow-lg">
            Fall
          </button>
        </div>
      </div>
    </>
  );
};

export default StakePayout;
