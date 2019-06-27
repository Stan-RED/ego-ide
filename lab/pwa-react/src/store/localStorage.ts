import { IApplicationState } from "./reducers/index";

export const loadState = (): Partial<IApplicationState> | undefined => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.log("No localStorage support");
    return undefined;
  }
};

export const saveState = (state: Partial<IApplicationState>) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.log("No localStorage support");
  }
};
