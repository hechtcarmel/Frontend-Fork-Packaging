import React, { useEffect, useState } from "react";
import { Button, Header, Form } from "semantic-ui-react";
import { helloWorldABI, HELLO_WORLD_ADRESS } from "./helloworldContract";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { Web3Test2 } from "../../Web3Communication/Web3Modal3";
interface Web3Demo1Props {
  web3: any;
  changeProvider: any;
}
export function Web3Demo1(props: Web3Demo1Props) {
  const [address, setAdress] = useState<string>("");

  console.log(JSON.stringify(helloWorldABI));

  const attempt2 = [
    {
      constant: true,
      inputs: [],
      name: "message",
      outputs: [{ name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "newMessage", type: "string" }],
      name: "setMessage",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "remove",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const [helloWorldAccount, setHelloWorldAccount] = useState(
    new props.web3.eth.Contract(attempt2 as AbiItem[], HELLO_WORLD_ADRESS)
  );

  useEffect(() => {
    setHelloWorldAccount(
      new props.web3.eth.Contract(attempt2 as AbiItem[], HELLO_WORLD_ADRESS)
    );
  }, props.web3);
  const helloWorldContract = new props.web3.eth.Contract(
    attempt2 as AbiItem[],
    HELLO_WORLD_ADRESS
  );

  return (
    <div>
      <Web3Test2 web3={props.web3} changeProvider={props.changeProvider} />
      <button
        onClick={() => {
          props.web3.setProvider("ws://localhost:7545");
          // @ts-ignore
          //web3.currentProvider();
          // @ts-ignore
          props.changeProvider(web3.currentProvider);
          props.web3.eth
            .getBalance("0x24Eb8E8e144E14AB7B3071B5312cc38ED01F6C52")
            .then(console.log);
        }}
      >
        {" "}
        Connect Ganache{" "}
      </button>

      <button
        onClick={() => {
          console.log(helloWorldContract);
          console.log("Default account: ", helloWorldContract.defaultAccount);
          helloWorldContract.methods
            .setMessage("ABC")
            .call()
            .then((res: any) => {
              console.log(res);
            });
        }}
      >
        Set Msg to "ABC"
      </button>
      <button
        onClick={() => {
          helloWorldContract.methods
            .message()
            .call()
            .then((res: any) => {
              console.log(res);
            });
        }}
      >
        get Msg
      </button>
    </div>
  );
}
