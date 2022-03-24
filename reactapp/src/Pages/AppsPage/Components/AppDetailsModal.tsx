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
  MDBCardImage,
  MDBCardText,
} from "mdb-react-ui-kit";
import appData from "../AppData";
import no_image_alt from "./app_no_image_alt.jpg";
import "./CSS/AppDetailsModal.css";

interface AppDetailsModalProps {
  app: appData;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

function MDBRating(props: { data: any }) {
  return null;
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
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{app.name}</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBCardImage
                style={{ height: "200px", border: "1px solid" }}
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

              <MDBBtn>Purchase</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
