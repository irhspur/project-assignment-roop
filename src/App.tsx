import React, { useState, useEffect } from "react";
import { getClubs, getMatchDetails } from "./services/footballApi";
import { TData, TTeamData } from "./utils";
import { getTeams } from "./utils/dataUtils";
import { FixtureTable } from "./components/FixtureTable";
import "./App.scss";

const App = () => {
    const [clubs, setClubs] = useState<TData>();
    const [error, setError] = useState<string | null>(null);
    const [matches, setMatches] = useState<TTeamData[]>([]);

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

    // if (error) return <div>{error}</div>;
    // else {
    return (
        <div>
            <h1>{clubs?.name}</h1>
            <FixtureTable data={matches} />
            <h2>Clubs</h2>
            {/* {getTeams(matches.rounds).map((team, idx) => (
                    <li key={idx}>{team}</li>
                ))} */}
            {clubs?.clubs.map((club) => (
                <li key={club.code}>
                    {club.name} - {club.country}
                </li>
            ))}
        </div>
    );
    // }
};

export default App;
