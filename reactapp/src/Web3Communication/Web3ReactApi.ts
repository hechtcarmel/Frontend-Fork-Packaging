import IS_DEBUG from "../ElectronCommunication/SharedElectronConstants";
import DUMMY_APPS, {
  DUMMY_OWNED,
  DUMMY_PUBLISHED,
} from "./DebugDummies/DummyApps";
import AppData from "../Pages/AppsPage/AppData";

export function getPublishedApps(userId: string) {
  if (IS_DEBUG) {
    return DUMMY_PUBLISHED;
  } else {
    return [];
  }
}

export function getOwnedApps(userId: string) {
  if (IS_DEBUG) {
    return DUMMY_OWNED;
  } else {
    return [];
  }
}

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
    //Web3
    return { displayedApps: [], pageCount: 0 };
  }
};
