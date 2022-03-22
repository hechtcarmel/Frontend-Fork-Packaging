import React, {useEffect, useState} from "react"
import AppsCatalog from "./Components/AppsCatalog";
import './Components/CSS/AppsCatalogPage.css';
import AppData from "./AppData";
import  IS_DEBUG from '../../GeneralConstants.js'
import DUMMY_APPS from './DummyApps'



function AppsCatalogPage(){

    const [displayedApps, setDisplayedApps] = useState<Array<AppData>>([])
    console.log(typeof(IS_DEBUG))
    useEffect( () => {
            setDisplayedApps(DUMMY_APPS)
    }, [])



    return (
      <div id='apps-catalog'>
          <AppsCatalog displayedApps={displayedApps} setDisplayedApps={setDisplayedApps} />
      </div>
    );
}

export default AppsCatalogPage

