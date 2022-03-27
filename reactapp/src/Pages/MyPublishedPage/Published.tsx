import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IS_ON_ELECTRON } from "../../ElectronCommunication/SharedElectronConstants";
import { PublishedAppsTable } from "./Components/PublishedAppsTable";
import AppData from "../AppsPage/AppData";
import { getPublishedApps } from "../../Web3Communication/Web3ReactApi";

interface PublishedProps {
  publishedApps: AppData[];
  setPublishedApps: Dispatch<SetStateAction<AppData[]>>;
  userId: string;
}

function Published({
  publishedApps,
  setPublishedApps,
  userId,
}: PublishedProps) {
  useEffect(() => {
    setPublishedApps(getPublishedApps(userId));
  }, [userId]);

  return <PublishedAppsTable publishedApps={publishedApps} />;
}

export default Published;
