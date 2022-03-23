import React from "react"
import './UploadPage.css'
import {IS_ON_ELECTRON} from '../../GeneralConstants'
function ErrorPage(){
    if(!IS_ON_ELECTRON){
        return (
            <div id="upload-page-goto-desktop-div">
                <h1>Files can only be uploaded from our desktop application!</h1>
            </div>
        )
    }
    else{

        return (
            <div id="upload-page-electron-view-div">
                <h1>Congratulation on  openning our Desktop App! </h1>
                <h1>Too bad this page is still under construction..</h1>
            </div>
        )



    }
    return (
        <div id="upload-page-text-div">
            <h1>Well, This is embarrassing...</h1>
            <>  <h1> This Page Doesn't Exist! </h1></>
        </div>
    )
}

export default ErrorPage