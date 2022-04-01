import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "7ac5f849f3984d56a7bea36e745ce0a4",
    },
  },
};

async function connectwallet() {
  try {
    const web3Modal = new Web3Modal({
      network: "rinkeby",
      theme: "dark",
      cacheProvider: false,
      providerOptions,
    });
    web3Modal.clearCachedProvider();

    var provider = await web3Modal.connect();
    var web3 = new Web3(provider);

    console.log("provider:", provider);
    console.log("web3: ", web3);
  } catch (error) {
    console.log("connectwallet() error: ", error);
  }
}

export function Web3Test2() {
  return <button onClick={connectwallet}>Connect 2</button>;
}
