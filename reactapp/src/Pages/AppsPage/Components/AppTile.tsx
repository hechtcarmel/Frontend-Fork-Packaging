import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import no_image_alt from './app_no_image_alt.jpg'
import dummy_car from '../product_img/Audi_R8_2017_189_19_610_52_10_76_48_174_14_AWD_2_2_2dr_nUS.jpg'
import AppData from "../AppData";

interface AppTileProps{
    appData: AppData
}

function AppTile({appData} : {appData:AppData}) {
    //console.log("AppTile: AppData = ", appData)


    return (
        <MDBCard style={{maxWidth: '22rem'}}>
            <MDBCardImage src={appData.img_url ? appData.img_url : no_image_alt} position='top' alt='...'/>
            <MDBCardBody>
                <MDBCardTitle>{appData.name}</MDBCardTitle>
                <MDBCardText>
                    {appData.description}
                </MDBCardText>
                <MDBBtn href='#'>Purchase</MDBBtn>
            </MDBCardBody>
        </MDBCard>
    );
}

export default AppTile