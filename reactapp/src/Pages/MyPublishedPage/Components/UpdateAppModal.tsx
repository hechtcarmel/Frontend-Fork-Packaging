import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBCardImage,
  MDBCardText,
} from "mdb-react-ui-kit";

import no_image_alt from "../../../Misc/app_no_image_alt.jpg";
import "../../../CSS/AppDetailsModal.css";
import { Rating } from "react-simple-star-rating";
import SpinnerButton from "@vlsergey/react-bootstrap-button-with-spinner";
import isElectron from "is-electron";
import "../../../CSS/appImage.css";
import AppData from "../../AppsPage/AppData";

interface UpdateAppModalProps {
  app: AppData;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  toggleShowModal: any;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateAppModal({
  app,
  showModal,
  setShowModal,
  toggleShowModal,
  isLoading,
  setIsLoading,
}: UpdateAppModalProps) {
  const [appToUpdate, setAppToUpdate] = useState<AppData>();

  useEffect(() => {
    setAppToUpdate(app);
  }, [app]);

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleUpdateBtn = async () => {
    //TODO: Add error handling.
    setIsLoading(true);
    return fetch("https://reqres.in/api/users/1")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => new Promise((resolve) => setTimeout(resolve, 3000)))
      .catch((err) => {
        /*TODO*/
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <MDBModal
        show={showModal}
        setShow={setShowModal}
        tabIndex={-1}
        staticBackdrop={isLoading}
      >
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{`Update ${app.name}`}</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody></MDBModalBody>

            <MDBModalFooter>
              <SpinnerButton onClick={handleUpdateBtn}>
                Upload New Version
              </SpinnerButton>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
/*              <MDBBtn>Purchase</MDBBtn>
 */
