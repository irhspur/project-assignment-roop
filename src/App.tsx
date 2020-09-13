import React, { useState, useEffect } from "react";
import { getClubs, getMatchDetails } from "./services/footballApi";
import { TData, TTeamData } from "./utils";
import { FixtureTable } from "./components/FixtureTable";
import "./App.scss";
import { ClubModal } from "./components/ClubModal";
import { Spinner } from "./components/Spinner";
import { ClubSearchBox } from "./components/ClubSearchBox";
import { SeasonSelect } from "./components/SeasonSelect";
import { initialSeason } from "./utils/optionUtils";

const App = () => {
    const [clubs, setClubs] = useState<TData>();
    const [error, setError] = useState<string | null>(null);
    const [matches, setMatches] = useState<TTeamData[]>([]);
    const [openModal, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalData, setModalData] = useState({});
    const [season, setSeason] = useState(initialSeason);
    const [searchString, setSearchString] = useState("");

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const clubsResponse = await getClubs(season);
                setClubs(clubsResponse);
                const dataMatches = await getMatchDetails(season);
                setMatches(Object.values(dataMatches));
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        })();
    }, [season]);

    const handleModalOpen = (team: TTeamData) => {
        const selectedClub = clubs?.clubs.find(
            (club) => club.name === team.name
        );

        if (selectedClub) {
            setModalData({ ...selectedClub, ...team });
        }

        setModalOpen(true);
    };

    // else {
    return (
        <div>
            <div className="container main-container">
                <section className="section">
                    <h3 className="title is-3 is-centered">
                        Premier League Fixtures
                    </h3>
                    <div className="level">
                        <div className="level-left">
                            <SeasonSelect
                                loading={loading}
                                setSeason={setSeason}
                            />
                        </div>
                        <div className="level-right">
                            <ClubSearchBox
                                value={searchString}
                                handleSearch={setSearchString}
                            />
                        </div>
                    </div>
                    {loading ? (
                        <Spinner isActive={loading} />
                    ) : error ? (
                        <div className="message is-danger">
                            <div className="message-body">{error}</div>
                        </div>
                    ) : matches.length < 1 ? (
                        <div className="box">
                            No Matches Found for this Season
                        </div>
                    ) : (
                        <FixtureTable
                            searchString={searchString}
                            data={matches}
                            handleModalOpen={handleModalOpen}
                        />
                    )}
                </section>
                <ClubModal
                    isActive={openModal}
                    clubInfo={modalData}
                    onClose={() => setModalOpen(false)}
                />
            </div>
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>
                        <strong>Football Json Data Table</strong> by{" "}
                        <a href="#">Roop Bajracharya</a>.
                    </p>
                </div>
            </footer>
        </div>
    );
    // }
};

export default App;
