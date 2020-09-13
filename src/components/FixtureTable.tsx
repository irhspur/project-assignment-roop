import React, { useState, useEffect } from "react";
import { TTeamData } from "../utils";
import {
    sortByPoints,
    mapPointClass,
    getStatusClass,
} from "../utils/dataUtils";

const TeamDataFields: { field: keyof TTeamData; label: string }[] = [
    { field: "name", label: "Club" },
    { field: "matchesPlayed", label: "MP" },
    { field: "win", label: "W" },
    { field: "loss", label: "L" },
    { field: "draw", label: "D" },
    { field: "goalsFor", label: "GF" },
    { field: "goalsAgainst", label: "GA" },
    { field: "goalsDifference", label: "GD" },
    { field: "points", label: "Points" },
    { field: "last5", label: "Last 5 Games" },
];

export const FixtureTable = ({
    data,
    searchString,
    handleModalOpen,
}: {
    data: TTeamData[];
    handleModalOpen: (clubName: TTeamData) => void;
    searchString?: string;
}) => {
    const [viewData, setViewData] = useState(data);
    const [sortOrder, setSortOrder] = useState(1);

    useEffect(() => {
        const formatted = data.sort(sortByPoints(1)).map((team, idx) => ({
            ...team,
            class:
                idx < 4
                    ? "is-positive"
                    : idx > data.length - 4
                    ? "is-negative"
                    : "",
        }));
        setViewData(formatted);
    }, [data]);

    useEffect(() => {
        const sorted = viewData.sort(sortByPoints(sortOrder));
        setViewData(sorted);
    }, [sortOrder]);

    useEffect(() => {
        if (searchString) {
            const regex = new RegExp(searchString, "gi");
            const filtered = data.filter((team) => regex.test(team.name));
            setViewData(filtered);
        } else {
            const revertedData = data
                .sort(sortByPoints(1))
                .map(mapPointClass(data.length));
            setViewData(revertedData);
        }
    }, [searchString]);

    const renderSortableHeader = (label: string) => (
        <th
            key={label}
            className="is-sortable"
            onClick={() => setSortOrder((prevSort) => -1 * prevSort)}
        >
            {label}
            <span
                className={`icon has-info-success ${
                    sortOrder > 0 ? "is-rotated" : ""
                }`}
            >
                <i className="fas fa-chevron-up" />
            </span>
        </th>
    );

    const renderTableData = (team: TTeamData, field: keyof TTeamData) => {
        if (field === "name") {
            return (
                <a>
                    <td
                        className="media"
                        onClick={() => handleModalOpen(team)}
                        key={field}
                    >
                        <figure className="media-left">
                            <p className="image is-32x32">
                                <img
                                    src={team.clubLogo}
                                    alt={team.name}
                                    width={20}
                                />
                            </p>
                        </figure>
                        <div className="media-content">
                            <strong>{team[field]}</strong>
                        </div>
                    </td>
                </a>
            );
        } else if (field === "last5") {
            return (
                <td>
                    {team[field]?.map((match) => (
                        <span
                            key={match.date}
                            title={match.date}
                            className={`tag ${getStatusClass(match.status)}`}
                        >
                            {match.status}
                        </span>
                    ))}
                </td>
            );
        } else {
            return <td key={field}>{team[field]}</td>;
        }
    };

    return (
        <div>
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        {TeamDataFields.map(({ label, field }) => (
                            <React.Fragment key={label}>
                                {field === "points" ? (
                                    renderSortableHeader(label)
                                ) : (
                                    <th>{label}</th>
                                )}
                            </React.Fragment>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {viewData.length > 0
                        ? viewData.map((team) => (
                              <tr key={team.name} className={team.class}>
                                  {TeamDataFields.map(({ field }) => (
                                      <React.Fragment key={field}>
                                          {renderTableData(team, field)}
                                      </React.Fragment>
                                  ))}
                              </tr>
                          ))
                        : null}
                </tbody>
            </table>
        </div>
    );
};
