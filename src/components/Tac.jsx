import React from "react";
import { PiNumberZeroBold } from "react-icons/pi";
import { HiMiniXMark } from "react-icons/hi2";


export default function Tac() {
  return (
    <div className="grid place-items-center bg-slate-800 h-[100vh]">
      <div className="grid grid-col-3 grid-flow-col gap-4">
        <div className="grid items-center justify-center w-24 h-16 rounded-md">
          <div className="flex ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-14 text-blue-500">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
            <PiNumberZeroBold className="text-orange-500"/>

          </div>
        </div>
        <div className="bg-blue-500 items-center justify-self-center-center w-24 h-16 rounded-md"></div>
        <div className="bg-blue-500 items-center justify-self-center-center w-24 h-16 rounded-md"></div>
      </div>
      <div className="grid grid-rows-3 grid-flow-col gap-4 text-white place-items-center">
        <div className="bg-slate-600 items-center justify-self-center-center w-24 h-24 rounded-md"></div>
        <div className="bg-slate-600 items-center justify-self-center-center w-24 h-24 rounded-md"></div>
        <div className="bg-slate-600 items-center justify-self-center-center w-24 h-24 rounded-md"></div>
        <div className="bg-slate-600 items-center justify-self-center-center w-24 h-24 rounded-md"></div>
        <div className="bg-slate-600 items-center justify-self-center-center w-24 h-24 rounded-md"></div>
        <div className="bg-slate-600 items-center justify-self-center-center w-24 h-24 rounded-md"></div>
        <div className="bg-slate-600 items-center justify-self-center-center w-24 h-24 rounded-md"></div>
        <div className="bg-slate-600 items-center justify-self-center-center w-24 h-24 rounded-md"></div>
        <div className="bg-slate-600 items-center justify-self-center-center w-24 h-24 rounded-md"></div>
      </div>
      <div className="grid grid-col-3 grid-flow-col gap-4">
        <div className="grid bg-blue-500 items-center justify-center w-24 h-16 rounded-md">
          1
        </div>
        <div className="grid bg-gray-400 items-center justify-center w-24 h-16 rounded-md">
          2
        </div>
        <div className="grid bg-orange-400 items-center justify-center w-24 h-16 rounded-md">
          3
        </div>
      </div>
    </div>
  );
}
