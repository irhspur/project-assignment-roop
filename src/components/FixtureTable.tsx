import React, { useState, useEffect } from "react";
import { TTeamData } from "../utils";
import { sortByPoints, mapPointClass } from "../utils/dataUtils";

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
    handleModalOpen,
}: {
    data: TTeamData[];
    handleModalOpen: (clubName: string) => void;
}) => {
    const [viewData, setViewData] = useState(data);
    const [sortOrder, setSortOrder] = useState(1);
    const [searchString, setSearchString] = useState("");

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
            // tslint:disable-next-line: jsx-no-lambda
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
                <td onClick={() => handleModalOpen(team[field])} key={field}>
                    {team[field]}
                </td>
            );
        } else if (field === "last5") {
            return (
                <td>
                    <span className="tag is-success">W</span>
                    <span className="tag is-success">W</span>
                    <span className="tag is-light">D</span>
                    <span className="tag is-danger">L</span>
                    <span className="tag is-success">W</span>
                </td>
            );
        } else {
            return <td key={field}>{team[field]}</td>;
        }
    };

    return (
        <div>
            <div className="field">
                <p className="control has-icons-right">
                    <input
                        className="input"
                        placeholder="Enter Clubname"
                        type="text"
                        name="searchString"
                        value={searchString}
                        onChange={(e) => setSearchString(e.target.value)}
                    />
                    <span className="icon is-small is-right">
                        <i className="fas fa-search" />
                    </span>
                </p>
            </div>
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
