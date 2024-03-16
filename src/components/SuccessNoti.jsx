import React from "react";

import { success } from "../assets";

const SucessNoti = () => {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <img
        src={success}
        alt="success"
        className="w-[100px] h-[100px] object-contain"
      />
      <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center">
        Your Transaction is success submit <br />
      </p>
    </div>
  );
};

export default SucessNoti;
