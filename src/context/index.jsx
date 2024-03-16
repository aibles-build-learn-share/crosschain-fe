import React, { createContext, useContext } from "react";
// import { readFileSync } from "fs";

import {
  useAddress,
  useContract,
  useContractWrite,
  useMetamask,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { BridgeABI } from "./BridgeABI";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // const abi = JSON.parse(readFileSync("src//Users/phuongtt/Downloads/BridgeABI.tsjson", "utf-8"));
  const { contract } = useContract(
    "0xe8c9F3178AA45C5c3B906fFe4D26A76685C7A345",
    BridgeABI
  );
  const { mutateAsync: initiateTransfer, isLoading } = useContractWrite(
    contract,
    "initiateTransfer"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await initiateTransfer({
        args: [
          form.to, // description
          ethers.utils.parseEther(form.amount).toString(),
          form.targetChain,
        ],
        overrides: {
          value: ethers.utils.parseEther("0.04"),
        },
      });
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    return filteredCampaigns;
  };

  const donate = async (pId, amount) => {
    const data = await contract.call("donateToCampaign", [pId], {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("getDonators", [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,

        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
