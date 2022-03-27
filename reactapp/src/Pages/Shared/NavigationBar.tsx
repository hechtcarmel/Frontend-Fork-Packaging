import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "../../CSS/NavigationBar.css";
import { AiOutlineSearch } from "react-icons/ai";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import { APPS_PER_PAGE, PagePaths } from "../../ReactConstants";
import AppData from "../AppsPage/AppData";
import {
  getDisplayedApps,
  getDisplayedAppsObj,
} from "../AppsPage/AppsCatalogPage";

interface NavigationBarProps {
  setDisplayedApps: Dispatch<SetStateAction<Array<AppData>>>;
  setNumberOfPages: Dispatch<SetStateAction<number>>;
}

export default function NavigationBar(props: NavigationBarProps) {
  const setDisplayedApps = props.setDisplayedApps;
  const setNumberOfPages = props.setNumberOfPages;

  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault(); //Otherwise refreshes the page

    let res: getDisplayedAppsObj = getDisplayedApps(
      0,
      APPS_PER_PAGE,
      searchQuery
    );
    setDisplayedApps(res.displayedApps);
    setNumberOfPages(res.pageCount);

    //Reset the search query
    //setSearchQuery('')
  };

  const renderSearchbar = () => {
    if (location.pathname === PagePaths.AppsPagePath) {
      return (
        <form
          className="searchArea d-flex input-group w-auto"
          onSubmit={handleSearchSubmit}
        >
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <AiOutlineSearch />
            <i className="fa fa-search"></i>
          </button>
        </form>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <nav className="navbar sticky-top navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">dAppstore</a>
          {renderSearchbar()}
        </div>
      </nav>
    </>
  );
}
