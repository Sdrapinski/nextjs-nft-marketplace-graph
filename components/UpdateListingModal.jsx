import { ethers } from "ethers";
import React, { useState } from "react";
import { useWeb3Contract } from "react-moralis";
import { Modal, Input, useNotification } from "web3uikit";
import nftMarketplaceAbi from "../constants/NftMarketplace.json";

const UpdateListingModal = ({
  nftAddress,
  tokenId,
  isVisible,
  marketplaceAddress,
  onClose,
}) => {
  const [priceToUpdateListingWith, setPriceToUpdateListingWith] = useState(0);
  const dispatch = useNotification();

  const handleUpdateLisitngSuccess = async (tx) => {
    await tx.wait(1);
    dispatch({
      type: "success",
      message: "Lisitng updated",
      title: "Lisitng updated - please refresh",
      position: "topR",
    });
    onClose && onClose();
    setPriceToUpdateListingWith("0");
  };

  const { runContractFunction: updateListing } = useWeb3Contract({
    abi: nftMarketplaceAbi,
    contractAddress: marketplaceAddress,
    functionName: "updateListing",
    params: {
      nftAddress: nftAddress,
      tokenId: tokenId,
      newPrice: ethers.utils.parseEther(priceToUpdateListingWith || "0"),
    },
  });

  return (
    <Modal
      isVisible={isVisible}
      onCancel={onClose}
      onCloseButtonPressed={onClose}
      onOk={() => {
        updateListing({
          onError: (error) => {
            console.warn(error);
          },
          onSuccess: handleUpdateLisitngSuccess,
        });
      }}
    >
      <Input
        label="Update listing price (ETH)"
        name="New listing price"
        type="number"
        onChange={(event) => {
          setPriceToUpdateListingWith(event.target.value);
        }}
      />
    </Modal>
  );
};

export default UpdateListingModal;
