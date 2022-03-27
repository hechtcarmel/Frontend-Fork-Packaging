import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import AppsCatalog from "./Components/AppsCatalog";
import "../../CSS/AppsCatalogPage.css";
import AppData from "./AppData";
import IS_DEBUG from "../../ElectronCommunication/SharedElectronConstants.js";
import DUMMY_APPS from "../../Web3Communication/DebugDummies/DummyApps";
import Pagination from "./Components/Pagination";
import { APPS_PER_PAGE, DEFAULT_EMPTY_APP } from "../../ReactConstants";
import AppDetailsModal from "./Components/AppDetailsModal";

export interface getDisplayedAppsObj {
  displayedApps: Array<AppData>;
  pageCount: number;
}

export const getDisplayedApps = (
  pageNum: number,
  itemsPerPage: number,
  filter?: string
): getDisplayedAppsObj => {
  //request to fetch apps [(pageNum*itemsPerPage + 1), (pageNum*itemsPerPage + itemsPerPage) )

  if (IS_DEBUG) {
    let appsPool = DUMMY_APPS;
    if (filter) {
      appsPool = appsPool.filter((app) => app.name?.includes(filter as string));
    }

    let res = appsPool.slice(
      pageNum * itemsPerPage,
      pageNum * itemsPerPage + itemsPerPage
    );
    console.log(
      `getDisplayedApps(pageNum: ${pageNum}, itemsPerPage:${itemsPerPage}`,
      `filter: ${filter}`,
      res
    );
    let numberOfPages = Math.ceil(appsPool.length / itemsPerPage);
    return { displayedApps: res, pageCount: numberOfPages };
  } else {
    return { displayedApps: [], pageCount: 0 };
  }
};

interface AppsCatalogPageProps {
  displayedApps: Array<AppData>;
  setDisplayedApps: Dispatch<SetStateAction<Array<AppData>>>;
  numberOfPages: number;
  setNumberOfPages: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

function AppsCatalogPage(props: AppsCatalogPageProps) {
  const displayedApps = props.displayedApps;
  const setDisplayedApps = props.setDisplayedApps;
  const numberOfPages = props.numberOfPages;
  const setNumberOfPages = props.setNumberOfPages;

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedAppData, setSelectedAppData] =
    useState<AppData>(DEFAULT_EMPTY_APP);
  const toggleShowModal = () => setShowModal(!showModal);

  //Display Dummy apps
  useEffect(() => {
    //setDisplayedApps(DUMMY_APPS)
    let res: getDisplayedAppsObj = getDisplayedApps(0, APPS_PER_PAGE);
    setDisplayedApps(res.displayedApps);
    setNumberOfPages(res.pageCount);
  }, []);

  const handlePageClick = (arg: { selected: number }) => {
    console.log("Clicked Page: ", arg.selected);
    let res: getDisplayedAppsObj = getDisplayedApps(
      arg.selected,
      APPS_PER_PAGE
    );
    setDisplayedApps(res.displayedApps);
    setNumberOfPages(res.pageCount);
  };

  return (
    <>
      <AppDetailsModal
        app={selectedAppData}
        showModal={showModal}
        toggleShowModal={toggleShowModal}
        setShowModal={setShowModal}
        isLoading={props.isLoading}
        setIsLoading={props.setIsLoading}
      />
      <div id="apps-catalog">
        <AppsCatalog
          displayedApps={displayedApps}
          setDisplayedApps={setDisplayedApps}
          toggleShowModal={toggleShowModal}
          setSelectedAppData={setSelectedAppData}
        />
      </div>
      <div id="pagination-div">
        <Pagination
          handlePageClick={handlePageClick}
          numberOfPages={numberOfPages}
        />
      </div>
    </>
  );
}

export default AppsCatalogPage;
