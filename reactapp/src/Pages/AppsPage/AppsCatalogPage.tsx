import React, {useEffect, useState} from "react"
import AppsCatalog from "./Components/AppsCatalog";
import './Components/CSS/AppsCatalogPage.css';
import AppData from "./AppData";
import  IS_DEBUG from '../../GeneralConstants.js'
import DUMMY_APPS from './DummyApps'
import Pagination from "./Components/Pagination";

interface getDisplayedAppsObj{
    displayedApps: Array<AppData>,
    pageCount: number
}

function AppsCatalogPage(){

    const [displayedApps, setDisplayedApps] = useState<Array<AppData>>([])
    const [numberOfPages, setNumberOfPages] = useState<number>(0)

    //Display Dummy apps
    useEffect( () => {
            //setDisplayedApps(DUMMY_APPS)
            let res: getDisplayedAppsObj = getDisplayedApps(0, 8)
            setDisplayedApps(res.displayedApps)
            setNumberOfPages(res.pageCount)
    }, [])

    const handlePageClick = (arg: { selected:number }) =>{
        console.log('Clicked Page: ', arg.selected)
        let res: getDisplayedAppsObj = getDisplayedApps(arg.selected, 8)
        setDisplayedApps(res.displayedApps)
        setNumberOfPages(res.pageCount)
    }

    const getDisplayedApps = (pageNum: number, itemsPerPage: number) : getDisplayedAppsObj => {
        //request to fetch apps [(pageNum*itemsPerPage + 1), (pageNum*itemsPerPage + itemsPerPage) )

        if(IS_DEBUG){
            let res = DUMMY_APPS.slice((pageNum*itemsPerPage), pageNum*itemsPerPage + itemsPerPage)
            console.log(`getDisplayedApps(pageNum: ${pageNum}, itemsPerPage:${itemsPerPage} `, res)
            let numberOfPages = Math.ceil(DUMMY_APPS.length/itemsPerPage)
            return {displayedApps: res, pageCount:numberOfPages }
        }
        else{
            return {displayedApps: [], pageCount: 0}

        }

    }


    return (
        <>
          <div id='apps-catalog'>
              <AppsCatalog displayedApps={displayedApps} setDisplayedApps={setDisplayedApps} />
          </div>
            <div id='pagination-div'>
                <Pagination handlePageClick={handlePageClick} numberOfPages={numberOfPages} />
            </div>
        </>
    );
}

export default AppsCatalogPage

