import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import no_image_alt from "./app_no_image_alt.jpg";
import dummy_car from "../product_img/Audi_R8_2017_189_19_610_52_10_76_48_174_14_AWD_2_2_2dr_nUS.jpg";
import AppData from "../AppData";
import "../../../CSS/appImage.css";

interface AppTileProps {
  appData: AppData;
  toggleShowModal: any;
  setSelectedAppData: any;
}

function AppTile({
  appData,
  toggleShowModal,
  setSelectedAppData,
}: AppTileProps) {
  //console.log("AppTile: AppData = ", appData)

  const handleShowDetails = () => {
    setSelectedAppData(appData);
    toggleShowModal();
  };
  return (
    <MDBCard
      style={{
        maxWidth: "22rem",
        padding: "10px",
        margin: "10px",
        marginTop: "20px",
      }}
    >
      <MDBCardImage
        src={appData.img_url ? appData.img_url : no_image_alt}
        position="top"
        alt="..."
        className={"app-image"}
      />
      <MDBCardBody
        style={{
          height: "140px",
          overflowY: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <MDBCardTitle>{appData.name}</MDBCardTitle>
        <MDBCardText>{appData.description}</MDBCardText>
      </MDBCardBody>
      <MDBBtn
        style={{
          marginTop: "20px",
          width: "90px",
          alignSelf: "center",
        }}
        onClick={handleShowDetails}
        href="#"
      >
        Details
      </MDBBtn>
    </MDBCard>
  );
}

export default AppTile;
