import React, { useState, useEffect } from "react";
import { getClubs, getMatchDetails } from "./services/footballApi";
import { TData, TTeamData } from "./utils";
import { getTeams } from "./utils/dataUtils";
import { FixtureTable } from "./components/FixtureTable";
import "./App.scss";
import { ClubModal } from "./components/ClubModal";

const App = () => {
    const [clubs, setClubs] = useState<TData>();
    const [error, setError] = useState<string | null>(null);
    const [matches, setMatches] = useState<TTeamData[]>([]);
    const [openModal, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const clubsResponse = await getClubs("2015-16");
                setClubs(clubsResponse);
                const dataMatches = await getMatchDetails("2015-16");
                setMatches(Object.values(dataMatches));
            } catch (err) {
                setError("Something Went Wrong");
            }
        })();
    }, []);

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
            <section className="section">
                <h2 className="title">{clubs?.name}</h2>
                <FixtureTable
                    data={matches}
                    handleModalOpen={handleModalOpen}
                />
            </section>
            <ClubModal
                isActive={openModal}
                clubInfo={modalData}
                onClose={() => setModalOpen(false)}
            />
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
