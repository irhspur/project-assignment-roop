import React, { useState, useEffect } from "react";
import { getClubs, getMatchDetails } from "./services/footballApi";
import { TData, TTeamData } from "./utils";
import { getTeams } from "./utils/dataUtils";
import { FixtureTable } from "./components/FixtureTable";
import "./App.scss";
import { ClubModal } from "./components/ClubModal";
import { seasons } from "./utils/optionUtils";
import { Spinner } from "./components/Spinner";
import { match } from "assert";
import { ClubSearchBox } from "./components/ClubSearchBox";

const App = () => {
    const [clubs, setClubs] = useState<TData>();
    const [error, setError] = useState<string | null>(null);
    const [matches, setMatches] = useState<TTeamData[]>([]);
    const [openModal, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalData, setModalData] = useState({});
    const [season, setSeason] = useState("2015-16");
    const [searchString, setSearchString] = useState("");

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const clubsResponse = await getClubs(season);
                setClubs(clubsResponse);
                const dataMatches = await getMatchDetails(season);
                setMatches(Object.values(dataMatches));
            } catch (err) {
                setError("Something Went Wrong");
            }
            setLoading(false);
        })();
    }, [season]);

    const handleModalOpen = (clubName: string) => {
        const selectedClub = clubs?.clubs.find(
            (club) => club.name === clubName
        );

        if (selectedClub) {
            setModalData(selectedClub);
        }

        setModalOpen(true);
    };

    // if (error) return <div>{error}</div>;
    // else {
    return (
        <div>
            <div className="container">
                <section className="section">
                    <h3 className="title is-3 is-centered">
                        Premier League Fixtures
                    </h3>
                    <div className="level">
                        <div className="level-left">
                            <div className="field">
                                <label className="label">Seasons</label>
                                <div className="control">
                                    <div
                                        className={`select ${
                                            loading ? "is-loading" : ""
                                        }`}
                                    >
                                        <select
                                            onChange={(e) =>
                                                setSeason(e.target.value)
                                            }
                                        >
                                            {seasons.map((option: string) => (
                                                <option key={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
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
