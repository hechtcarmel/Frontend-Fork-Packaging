import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IS_ON_ELECTRON } from "../../ElectronCommunication/SharedElectronConstants";
import { PublishedAppsTable } from "./Components/PublishedAppsTable";
import AppData from "../AppsPage/AppData";
import { getPublishedApps } from "../../Web3Communication/Web3ReactApi";
import "./PublishedPage.css";
interface PublishedProps {
  publishedApps: AppData[];
  setPublishedApps: Dispatch<SetStateAction<AppData[]>>;
  userId: string;
}

function PublishedPage({
  publishedApps,
  setPublishedApps,
  userId,
}: PublishedProps) {
  useEffect(() => {
    setPublishedApps(getPublishedApps(userId));
  }, [userId]);

  return (
    <>
      <h1 id="published-apps-title"> My Published Apps</h1>
      <PublishedAppsTable publishedApps={publishedApps} />
    </>
  );
}

export default PublishedPage;
