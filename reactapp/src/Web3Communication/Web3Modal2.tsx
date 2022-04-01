import Web3Modal from "web3modal";
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";

export default function Web3Test() {
  const web3ModalRef = useRef(); //returns object with key named current
  const [connectedWallet, setConnectedWallet] = useState<boolean>(false);

  const getSignerOrProvider = async (needSigner = false) => {
    // providers and signer =>
    // providers is used to get data from smart contract
    //signer is used to sign data /s set data of smart contract

    // @ts-ignore
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId != 4) {
      alert("Use rinkeby network!"); //Not Rinkeby
      throw new Error("Not Rinkeby Network!");
    }
    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return provider;
  };

  const connectWallet = async () => {
    try {
      await getSignerOrProvider();
      setConnectedWallet(true);
    } catch (error) {
      console.log("connectWallet error:", error);
    }
  };
  /*
  const providerOptions = {
    binancechainwallet: {
      package: true,
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "7ac5f849f3984d56a7bea36e745ce0a4",
      },
    },
    walletLink: {
      package: WalletLink,
      options: {
        appName: "dAppstore",
        infuraId: "7ac5f849f3984d56a7bea36e745ce0a4",
        rpc: "",
        chainId: 4, //Rinkeby
        appLogoUrl: null,
        darkMode: true,
      },
    },
  };*/

  useEffect(() => {
    // @ts-ignore
    web3ModalRef.current = new Web3Modal({
      disableInjectedProvider: false,
      cacheProvider: false,
      network: "rinkeby",
      //providerOptions: providerOptions,
    });

    console.log(web3ModalRef.current);
  }, []);

  return (
    <div className="text-center mt-8">
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
}
