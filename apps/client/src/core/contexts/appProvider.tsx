import { FC, PropsWithChildren, useState } from "react";

import { AppContext } from "./appContext";

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [searchTrack, setSearchTrack] = useState("");
  const [searchArtist, setSearchArtist] = useState("");

  return (
    <AppContext.Provider
      value={{ searchArtist, setSearchTrack, searchTrack, setSearchArtist }}
    >
      {children}
    </AppContext.Provider>
  );
};
