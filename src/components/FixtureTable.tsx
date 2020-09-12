import React from "react";
import { TTeamData } from "../utils";

const TeamDataFields: { field: keyof TTeamData; label: string }[] = [
    { field: "name", label: "Name" },
    { field: "matchesPlayed", label: "MP" },
    { field: "win", label: "W" },
    { field: "loss", label: "L" },
    { field: "draw", label: "D" },
    { field: "goalsFor", label: "GF" },
    { field: "goalsAgainst", label: "GA" },
    { field: "goalsDifference", label: "GD" },
    { field: "points", label: "Points" },
];

export const FixtureTable = ({ data }: { data: TTeamData[] }) => {
    return (
        <table>
            <thead>
                <tr>
                    {TeamDataFields.map(({ label }) => (
                        <th key={label}>{label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.length > 0
                    ? data.map((team) => (
                          <tr key={team.name}>
                              {TeamDataFields.map(({ field }) => (
                                  <td key={field}>{team[field]}</td>
                              ))}
                          </tr>
                      ))
                    : null}
            </tbody>
        </table>
    );
};
