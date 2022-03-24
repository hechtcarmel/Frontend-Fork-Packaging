import AppTile from "./AppTile";
import "./CSS/AppsCatalogPage.css";
import { Dispatch, SetStateAction } from "react";
import AppData from "../AppData";
import Pagination from "./Pagination";
interface AppsCatalogProps {
  displayedApps: AppData[];
  setDisplayedApps: Dispatch<SetStateAction<AppData[]>>;
}
function AppsCatalog(props: AppsCatalogProps) {
  return (
    <>
      {props.displayedApps.map((appData) => (
        <AppTile key={appData.id} appData={appData} />
      ))}
    </>
  );
}

export default AppsCatalog;
