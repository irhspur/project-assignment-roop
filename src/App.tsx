import React, { useState, useEffect } from "react";

type TClub = {
    code: string;
    country: string;
    name: string;
};

type TData = {
    name: string;
    clubs: TClub[];
};

const App = () => {
    const [data, setData] = useState<TData>();
    useEffect(() => {
        (async () => {
            const response = await fetch(
                "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.clubs.json"
            );
            const dataResponse = await response.json();
            setData(dataResponse);
        })();
    }, []);

    return (
        <div>
            <h1>{data?.name}</h1>
            {data?.clubs.map((club) => (
                <li key={club.code}>
                    {club.name} - {club.country}
                </li>
            ))}
        </div>
    );
};

export default App;
