import WalletConnectProvider from "@walletconnect/web3-provider";
import { connectWalletWithModal, web3 } from "../../Web3Communication/Web3Init";
import {
  MDBCardImage,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PagePaths } from "../../ReactConstants";

interface LoginModalProps {
  setIsWalletConnected: Dispatch<SetStateAction<boolean>>;
  setCurrAccount: Dispatch<SetStateAction<string>>;
}
export function LoginModal({
  setIsWalletConnected,
  setCurrAccount,
}: LoginModalProps) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(true);

  return (
    <>
      <MDBModal show={showModal} tabIndex={-1} staticBackdrop={true}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Connect Wallet</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              {" "}
              <button onClick={() => connectWalletWithModal()}>
                Connect to rinkeby
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  connectWalletWithModal("HTTP://127.0.0.1:7545")
                    .then(() => {
                      setIsWalletConnected(true);
                      web3.eth.getAccounts().then((accounts) => {
                        setCurrAccount(accounts[0]);
                      });
                    })
                    .catch((error) => {
                      setShowModal(true);
                      console.log(error);
                    });
                }}
              >
                Connect to ganache
              </button>
            </MDBModalBody>

            <MDBModalFooter></MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
