export let helloWorldABI = [
  {
    constant: true,
    inputs: [],
    name: "message",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "newMessage",
        type: "string",
      },
    ],
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

export const HELLO_WORLD_ADRESS = "0x0eE0EdE82b4581Ef8A536116a0F0AdA7C30e770D";
