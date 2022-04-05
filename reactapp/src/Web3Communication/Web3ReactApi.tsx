import { IS_DEBUG } from "../ElectronCommunication/SharedElectronConstants";
import DUMMY_APPS, {
  DUMMY_OWNED,
  DUMMY_PUBLISHED,
} from "./DebugDummies/DummyApps";
import AppData from "../Pages/AppsPage/AppData";
import { createContract, getCurrAccount } from "./Web3Utils";
import {
  DAPPSTORE_ABI,
  DAPPSTORE_CONTRACT_ADDRESS,
} from "./Contracts/dAppContract";
import { Dispatch, SetStateAction } from "react";

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

export const getDisplayedApps = async (
  pageNum: number,
  itemsPerPage: number,
  setDisplayedApps: Dispatch<SetStateAction<Array<AppData>>>,
  setNumberOfPages: Dispatch<SetStateAction<number>>,
  filter?: string
) => {
  //request to fetch apps [(pageNum*itemsPerPage + 1), (pageNum*itemsPerPage + itemsPerPage) )
  let res: getDisplayedAppsObj;
  if (IS_DEBUG) {
    res = await fetchDummyDisplayedApps(itemsPerPage, pageNum, filter);
    setDisplayedApps(res.displayedApps);
    setNumberOfPages(res.pageCount);
  } else {
    res = await fetchDisplayedApps(itemsPerPage, pageNum, filter);
    setDisplayedApps(res.displayedApps);
    setNumberOfPages(res.pageCount);
  }
};

const fetchDummyDisplayedApps = async (
  itemsPerPage: number,
  currPageNum: number,
  filter?: string
) => {
  let appsPool = DUMMY_APPS;
  if (filter) {
    appsPool = appsPool.filter((app) => app.name?.includes(filter as string));
  }

  let appsList = appsPool.slice(
    currPageNum * itemsPerPage,
    currPageNum * itemsPerPage + itemsPerPage
  );
  console.log(
    `getDisplayedApps(pageNum: ${currPageNum}, itemsPerPage:${itemsPerPage}`,
    `filter: ${filter}`,
    appsList
  );
  let numberOfPages = Math.ceil(appsPool.length / itemsPerPage);
  return { displayedApps: appsList, pageCount: numberOfPages };
};

export const uploadDummyApps = async (num: number) => {
  //console.log("Dummyapps before upload: ", DUMMY_APPS);
  for (let i = 0; i < Math.max(num, DUMMY_APPS.length); i++) {
    await uploadApp(DUMMY_APPS[i]);
  }
  console.log("Uploaded All Dummy Apps");
};

const uploadApp = async (app: AppData) => {
  console.log("Uploading App: ", app);

  let contract = await createContract(
    DAPPSTORE_ABI,
    DAPPSTORE_CONTRACT_ADDRESS
  );

  await contract.methods
    .upload(
      app.name,
      app.description,
      app.SHA,
      app.img_url,
      app.magnetLink,
      app.company,
      app.price
    )
    .send({ from: await getCurrAccount() })
    .then(() => {
      console.log("Finished Uploading");
    })
    .catch((err: any) => {
      console.log("Error uploading contract: ", err);
    });
};

const fetchDisplayedApps = async (
  itemsPerPage: number,
  currPageNum: number,
  filter?: string
) => {
  let contract = await createContract(
    DAPPSTORE_ABI,
    DAPPSTORE_CONTRACT_ADDRESS
  );
  console.log(
    `from: ${currPageNum * itemsPerPage}, to: ${
      currPageNum * itemsPerPage + itemsPerPage
    }`
  );
  let from: number = currPageNum * itemsPerPage + 1;
  let to: number = from + itemsPerPage;
  let res = await contract.methods
    .getApps(from, to)
    .call()
    .then((res: any) => {
      console.log("fetchDisplayedApps returned = ", res);
      console.log("result returned apps array: ", res.result);
      console.log("result returned totalNumOfApps: ", res.totalNumOfApps);

      let appsToDisplay: Array<AppData> = [];
      res.result.forEach((solidityStruct: any) => {
        let app: AppData = {
          id: solidityStruct.id,
          name: solidityStruct.name,
          description: solidityStruct.description,
          price: solidityStruct.price,
          company: solidityStruct.company,
          img_url: solidityStruct.imgUrl,
          owned: solidityStruct.owned,
          rating: solidityStruct.rating,
          SHA: solidityStruct.fileSha256,
          version: 1,
          publication_date: "1.1.1",
          published: solidityStruct.creator === getCurrAccount(),
        };
        appsToDisplay.push(app);
      });
      let numberOfPages = Math.ceil(res.totalNumOfApps / itemsPerPage);

      return { displayedApps: appsToDisplay, pageCount: numberOfPages };
    })
    .catch((error: any) => {
      console.log("ERROR in getContractValue", error);
      return { displayedApps: [], pageCount: 1 };
    });
  console.log("res= ", res);
  return res;
};
