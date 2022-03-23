import React from "react"
import {IS_ON_ELECTRON} from '../../GeneralConstants'

function PurchasesPage(){
    if(IS_ON_ELECTRON){
        return (
            <div>
                <h1>The data displayed here is correct, as you couldn't purchase anything</h1>
                <>  <h1> You are running on Electron! </h1></>
            </div>
        )
    }


    else{
        return (
            <div>
                <h1>The data displayed here is correct, as you couldn't purchase anything</h1>
            </div>
        )
    }

}

export default PurchasesPage