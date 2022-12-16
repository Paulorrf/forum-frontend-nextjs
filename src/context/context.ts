import { createContext, Dispatch, SetStateAction } from "react";

const Context = createContext<
  [
    boolean,
    Dispatch<SetStateAction<boolean>>,
    boolean,
    Dispatch<SetStateAction<boolean>>
  ]
>([false, () => {}, true, () => {}]);

export default Context;
