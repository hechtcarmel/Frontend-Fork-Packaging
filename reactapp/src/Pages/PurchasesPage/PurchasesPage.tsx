import React from "react"
import {IS_ON_ELECTRON} from '../../GeneralConstants'

function PurchasesPage(){
    if(IS_ON_ELECTRON){
        return (
            <div>
                <h1>Hello! Welcome to the homepage!</h1>
                <>  <h1> You are running on Electron! </h1></>
            </div>
        )
    }


    else{
        return (
            <div>
                <h1>Hello! Welcome to the homepage!</h1>
            </div>
        )
    }

}

export default PurchasesPage