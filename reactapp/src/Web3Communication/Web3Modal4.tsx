import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

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
};
/*
export const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: false, // optional
  providerOptions, // required
});*/

//const provider = await web3Modal.connect();

//const web3 = new Web3(provider);

export function Web3Test4() {
  let provider: any = null;
  let web3: any = null;
  let accounts: any = null;

  async function showPortis() {
    if (!provider) {
      const web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: false, // optional
        providerOptions, // required
      });

      web3 = await connect(web3Modal);
    }

    provider._portis.showPortis();

    if (!accounts) {
      accounts = await web3.eth.getAccounts();
      print(`Wallet address: ${accounts[0].toLowerCase()}`);
    }
  }

  async function connect(web3Modal: any) {
    provider = await web3Modal.connect();
    return new Web3(provider);
  }

  function print(str: any) {
    const p = document.createElement("p");
    p.innerText = str;
    // @ts-ignore
    document.getElementById("userWalletAddress").appendChild(p);
  }

  return <button onClick={showPortis}>TEST 4</button>;
}
