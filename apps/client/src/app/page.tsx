"use client";

import { Footer, LyricsModal, MainList } from "@components/home";
import { useMediaQuery } from "@mui/material";
import { useAppContext } from "src/contexts";
import { theme } from "src/theme";

const Home = () => {
    const { selectedSong, songs } = useAppContext();
    const breakLG = useMediaQuery(theme.breakpoints.up("lg"));
    return (
        <>
            <div className="hidden h-screen w-full px-4 pt-8 xl:block">
                <div className="flex h-[90%] space-x-2">
                    <MainList />
                    <LyricsModal />
                </div>
                <Footer />
            </div>
            {/* <MobileTabs /> */}

            {/* <ThemeProvider theme={theme}>
                <div className="theme relative z-10 min-h-[100vh] w-full overflow-x-hidden bg-primary.dark">
                    <Header />

                    <div className="rgb-bg absolute -z-20 h-[50vh] w-full bg-gradient-to-b from-transparent to-primary.dark opacity-80" />
                    <Container
                        maxWidth="xl"
                        sx={{
                            marginTop: 2,
                            marginBottom: 8,
                            padding: 4,
                        }}
                    >
                        <div
                            className={clsx(
                                "w-full rounded-lg bg-primary.main p-6"
                            )}
                        >
                            <SearchBar />
                            <div
                                className={clsx(
                                    "flex w-full space-x-4",
                                    breakLG ? "flex-row" : "flex-col"
                                )}
                            >
                                <div
                                    className={clsx(
                                        "mt-8",
                                        breakLG ? "w-3/5" : "w-full"
                                    )}
                                >
                                    {songs?.map((s, idx) => (
                                        <SongCard
                                            id={idx + 1}
                                            key={s.id}
                                            title={s.title}
                                            album={s.album}
                                            albumArt={s.albumArt}
                                            artist={s.artists}
                                            url={s.id}
                                            duration={s.duration}
                                        />
                                    ))}
                                </div>
                                {selectedSong && (
                                    <div
                                        className={clsx(
                                            breakLG ? "w-2/5" : "w-full"
                                        )}
                                    >
                                        <LyricsCard
                                            title={selectedSong.title}
                                            lyrics={selectedSong.lyrics}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </Container>
                </div>
            </ThemeProvider> */}
        </>
    );
};

export default Home;
