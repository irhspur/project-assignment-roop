import React, { useState, useEffect } from "react";
import { getClubs, getMatchDetails } from "./services/footballApi";
import { TData, TMatchDetails } from "./utils";
import { getTeams } from "./utils/dataUtils";

const App = () => {
    const [data, setData] = useState<TData>();
    const [matches, setMatches] = useState<TMatchDetails>();

    useEffect(() => {
        (async () => {
            const dataResponse = await getClubs("2015-16");
            setData(dataResponse);
            const dataMatches = await getMatchDetails("2015-16");
            setMatches(dataMatches);
        })();
    }, []);

    if (!matches) return <div>Loading...</div>;
    else {
        return (
            <div>
                <h1>{matches?.name}</h1>
                <h2>Teams</h2>
                {getTeams(matches.rounds).map((team, idx) => (
                    <li key={idx}>{team}</li>
                ))}
                <h1>{data?.name}</h1>
                {data?.clubs.map((club) => (
                    <li key={club.code}>
                        {club.name} - {club.country}
                    </li>
                ))}
            </div>
        );
    }
};

export default App;
