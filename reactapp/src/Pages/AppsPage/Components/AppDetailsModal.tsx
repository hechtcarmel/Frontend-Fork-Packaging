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
import appData from "../AppData";
import no_image_alt from "./app_no_image_alt.jpg";
import "./CSS/AppDetailsModal.css";
import { Rating } from "react-simple-star-rating";
import SpinnerButton from "@vlsergey/react-bootstrap-button-with-spinner";
import isElectron from "is-electron";

interface AppDetailsModalProps {
  app: appData;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  toggleShowModal: any;
}

export default function AppDetailsModal({
  app,
  showModal,
  setShowModal,
  toggleShowModal,
}: AppDetailsModalProps) {
  const [rating, setRating] = useState<number>(0); // initial rating value
  const [ownedState, setOwnedStateState] = useState<boolean>(false);

  const setAppOwned = (new_owned: boolean) => {
    setOwnedStateState(new_owned);
    app.owned = new_owned;
    if (new_owned) {
    }
  };

  useEffect(() => {
    setRating(app.myRating === undefined ? 0 : app.myRating);
    setOwnedStateState(app.owned);
  }, [app]);

  const handleRatingChanged = (newRating: number) => {
    console.log(newRating);
    //setRating(newRating);
    app.myRating = newRating;

    //send to backend/blockchain.
  };

  function getMyRating() {
    return app.myRating === undefined ? 0 : app.myRating;
  }
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handlePurchaseBtn = async () => {
    //TODO: Add error handling.

    if (ownedState) {
      if (isElectron()) {
        // Do download
      } else {
        window.open("https://easyupload.io/ihr4mn");
      }
    } else {
      return fetch("https://reqres.in/api/users/1")
        .then((response) => response.json())
        .then((data) => console.log(data))
        .then(() => new Promise((resolve) => setTimeout(resolve, 3000)))
        .then(() => setAppOwned(true));
    }
  };

  const getBtnText = () => {
    return ownedState ? "Download" : "Purchase";
  };

  return (
    <>
      <MDBModal show={showModal} setShow={setShowModal} tabIndex={-1}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{app.name}</MDBModalTitle>
              {ownedState ? (
                <Rating
                  style={{ left: "160px", position: "relative" }}
                  onClick={handleRatingChanged}
                  ratingValue={rating}
                />
              ) : (
                <></>
              )}

              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShowModal}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBCardImage
                style={{ height: "200px", width: "auto", border: "1px solid" }}
                src={app.img_url ? app.img_url : no_image_alt}
                position="top"
                alt="..."
              />
              <h4 id="description-paragraph-title">Description:</h4>
              <p id="description-paragraph" className="card-text">
                {app.description}
              </p>
            </MDBModalBody>

            <MDBModalFooter>
              <text id="developer-text">
                <span className="span_underline">Developer</span> :{app.creator}
              </text>
              <text id="rating-text">
                <span className="span_underline">Rating</span> : {app.rating}
              </text>

              <SpinnerButton onClick={handlePurchaseBtn}>
                {getBtnText()}
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
