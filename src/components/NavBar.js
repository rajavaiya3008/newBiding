import React from "react";
import { NavBarContainer } from "../container/NavBarContainer";
import Button from "../shared/Button";

const NavBar = () => {
  const { visible, currUser, coin, navBtn, navigate } = NavBarContainer();

  return (
    <div className="h-[50px] bg-gray-900 text-white flex justify-around">
      {visible && (
        <p className="my-auto text-lg">
          User: {currUser?.[0]?.toUpperCase() + currUser?.substring(1)}
        </p>
      )}
      <div className="flex gap-[10px] my-auto">
        {visible && <p className="my-auto">{coin.coin}</p>}
        {navBtn.map(
          (btn, i) =>
            btn?.visible && (
              <Button
                onClick={() => btn?.onClick(navigate)}
                disabled={btn?.disable}
                style={`ml-[20px] border border-gray-300 rounded-[5px] p-[5px] hover:bg-gray-600 hover:text-white ${
                  btn?.disable && "cursor-not-allowed opacity-50"
                }`}
              >
                {btn?.name}
              </Button>
            )
            //   <button
            //     onClick={() => btn?.onClick(navigate)}
            //     disabled={btn?.disable}
            //     className={`ml-[20px] border border-gray-300 rounded-[5px] p-[5px] hover:bg-gray-600 hover:text-white ${
            //       btn?.disable && "cursor-not-allowed opacity-50"
            //     }`}
            //     key={i}
            //   >
            //     {btn?.name}
            //   </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
