import React, { Dispatch, SetStateAction, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import appData from "../AppData";

interface AppDetailsModalProps {
  app: appData;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function AppDetailsModal({
  app,
  showModal,
  setShowModal,
}: AppDetailsModalProps) {
  const toggleShow = () => setShowModal(!showModal);

  return (
    <>
      <MDBBtn onClick={toggleShow}>LAUNCH DEMO MODAL</MDBBtn>
      <MDBModal show={showModal} setShow={setShowModal} tabIndex={-1}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>...</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
