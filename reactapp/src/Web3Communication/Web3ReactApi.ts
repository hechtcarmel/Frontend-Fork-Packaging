import { IS_DEBUG } from "../ElectronCommunication/SharedElectronConstants";
import { DUMMY_OWNED, DUMMY_PUBLISHED } from "./DebugDummies/DummyApps";

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
