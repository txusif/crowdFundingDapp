import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from 'ethers';


const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract("0xbbB138fB03a5c93eb7e976F888e3B1a84f392b90");
    console.log("contract: ", contract);
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
        try {
            const data = await createCampaign({
                args: [
                    address, // owner
                    form.title, // title
                    form.description, // description
                    form.target,
                    new Date(form.deadline).getTime(), // deadline,
                    form.image,
                ],
            });

            // const data = await contract.call("createCampaign", [address, form.title, form.description, form.target, new Date(form.deadline).getTime(), form.image]);

            console.log("contract call success", data)
        } catch (error) {
            console.log("contract call failure", error)
        }
    }

    const getCampaigns = async () => {
        try {
            const campaigns = await contract.call("getCampaigns");
            console.log(campaigns);
            const parseCampaigns = campaigns.map((campaign, i) => ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.utils.formatEther(campaign.target.toString()),
                deadline: campaign.deadline.toNumber(),
                amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
                image: campaign.image,
                pId: i
            }));
            return parseCampaigns;
            console.log(parseCampaigns);
        } catch (error) {
            console.log("Fetch campaigns failure: ", error)
        }
    }

    const getUserCampaigns = async () => {
        try {
            const allCampaigns = await getCampaigns();
            const filteredCampaigns = allCampaigns.filter((campaign) =>
                campaign.owner === address
            );
            return filteredCampaigns;
        } catch (error) {
            console.log("Fetch user campaigns failure: ", error)
        }
    }

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createCampaign: publishCampaign,
                getCampaigns,
                getUserCampaigns
            }}
        >
            {children}
        </StateContext.Provider >
    )
}

export const useStateContext = () => useContext(StateContext);
