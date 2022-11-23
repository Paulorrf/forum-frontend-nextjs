import { createContext, Dispatch, SetStateAction } from "react";

const Context = createContext<[boolean, Dispatch<SetStateAction<boolean>>]>([
  false,
  () => {},
]);

export default Context;
