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

async function connectwallet(web3: Web3) {
  try {
    const web3Modal = new Web3Modal({
      network: "rinkeby",
      theme: "dark",
      cacheProvider: false,
      providerOptions,
    });
    //web3Modal.clearCachedProvider();

    var provider = await web3Modal.connect();
    //web3 = new Web3(provider);
    web3.setProvider(provider);
    console.log("provider:", provider);
    console.log("web3: ", web3);
    return web3;
  } catch (error) {
    console.log("connectwallet() error: ", error);
  }
}

interface Web3Test2Props {
  web3: Web3;
}
export function Web3Test2({ web3 }: Web3Test2Props) {
  return <button onClick={() => connectwallet(web3)}>Connect 2</button>;
}
