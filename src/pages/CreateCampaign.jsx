import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useStateContext } from "../context";
import { money } from "../assets";
import {
  TextField,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { CustomButton, FormField, Loader } from "../components";
import FormSelect from "../components/FormSelect";
import SucessNoti from "../components/SuccessNoti";
import { bnb, mina, logo, switchicon } from "../assets";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsSuccess] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    // initiateTransfer: "",
    to: "",
    amount: "",
    targetChain:
      "8af43cf261ea10c761ec540f92aafb76aec56d8d74f77c836f3ab1de5ce4eac5",
  });
  useEffect(() => {
    if (isLoading1) {
      const timeout = setTimeout(() => {
        setIsSuccess(false);
      }, 3000);

      // Cleanup the timeout if the component is unmounted before three seconds
      return () => clearTimeout(timeout);
    }
  }, [isLoading1]);

  const handleFormFieldChange = (fieldName, e) => {
    console.log(fieldName);
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await createCampaign({
        ...form,
        target: ethers.utils.parseUnits("0.7"),
      });
      setIsLoading(false);
    } catch (error) {}
    setIsSuccess(true);
  };

  const listChain = [
    {
      value: "BNB",
      label: "BNB Chain",
      src: bnb,
    },
    {
      value: "MINA ",
      label: "MINA Chain",
      src: mina,
    },
  ];
  const listChainMINA = [
    {
      value: "MINA",
      label: "MINA",
      src: mina,
    },
  ];

  return (
    <div className="flex justify-center items-center gap-16 mt-[10px] flex-row  rounded-[10px] ">
      <section className=" flex w-[535px] bg-white justify-center items-center flex-col rounded-[10px] sm:p-8 p-4">
        {isLoading && <Loader />}
        {isLoading1 && <SucessNoti />}
        <div className="flex flex-row align-middle items-center gap-4 ">
          <div className={`rounded-full w-[100px] h-[100px] bg-[#f1f1f4] `}>
            <img
              src={logo}
              alt="fund_logo"
              className={"w-[100px] h-[100px] rounded-full grayscale"}
            />
          </div>
          <div className="flex justify-center flex-col items-center p-[10px] sm:min-w-[px]  rounded-[10px]">
            <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] ">
              Start Mina CrossChain
            </h1>
            <h2 className="font-epilogue sm:text-[20px] text-[18px] leading-[23px] ">
              Cross-Chain Bridge App
            </h2>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full mt-[25px] flex flex-col gap-[30px] "
        >
          <div className="border-slate-200  border-y-2">
            <div className="flex  items-center gap-[10px]  my-[20px]  ">
              <FormSelect
                labelName="Form*"
                value={form.fromchain}
                defaultValue="BNB"
                handleChange={(e) => handleFormFieldChange("fromchain", e)}
                listItem={listChain}
              ></FormSelect>
              <div className="cursor-pointer text-white shadow flex justify-center items-center transition-all bg-[#1dc071] shadow-lg rounded-full w-[120px] h-[50px]">
                <img className="w-1/2 " src={switchicon} alt="Image"></img>
              </div>

              <FormSelect
                labelName="To*"
                defaultValue="MINA"
                value={form.tochain}
                handleChange={(e) => handleFormFieldChange("tochain", e)}
                listItem={listChain}
              ></FormSelect>
            </div>
          </div>

          <div className="flex flex-col  gap-[30px]">
            <FormSelect
              labelName="Select Token"
              value={form.token}
              defaultValue="MINA"
              handleChange={(e) => handleFormFieldChange("tox", e)}
              listItem={listChainMINA}
            ></FormSelect>
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">
                To Address
              </InputLabel>
              <OutlinedInput
                onChange={(e) => handleFormFieldChange("to", e)}
                id="outlined-adornment-address"
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
                label="Address Mina"
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">
                Amount
              </InputLabel>
              <OutlinedInput
                onChange={(e) => handleFormFieldChange("amount", e)}
                id="outlined-adornment-amount"
                placeholder="Mina 3"
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
                label="Amount Mina"
              />
            </FormControl>
          </div>

          <div className="w-full flex justify-start items-center p-2 bg-[#8c6dfd] h-[100px] rounded-[10px]">
            <img
              src={money}
              alt="money"
              className="w-[40px] h-[40px] object-contain"
            />
            <h4 className="font-epilogue font-bold text-[20px] text-white ml-[20px]">
              You will stake to get 10% of the staking amount
            </h4>
          </div>

          <div className="flex justify-center items-center mt-[5px]">
            <CustomButton
              btnType="submit"
              title="Swap "
              styles="bg-[#1dc071]"
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default CreateCampaign;
