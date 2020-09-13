import React from "react";
import { seasons } from "../utils/optionUtils";

export const SeasonSelect = ({
    setSeason,
    loading,
}: {
    setSeason: (season: string) => void;
    loading: boolean;
}) => {
    return (
        <div className="field">
            <label className="label">Seasons</label>
            <div className="control">
                <div className={`select ${loading ? "is-loading" : ""}`}>
                    <select onChange={(e) => setSeason(e.target.value)}>
                        {seasons.map((option: string) => (
                            <option key={option}>{option}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};
