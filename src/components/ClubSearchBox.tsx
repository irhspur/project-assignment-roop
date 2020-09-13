import React, { useState } from "react";

export const ClubSearchBox = ({
    value,
    handleSearch,
}: {
    value: string;
    handleSearch: (search: string) => void;
}) => {
    return (
        <div className="field">
            <label className="label">Search Club</label>
            <p className="control has-icons-right">
                <input
                    className="input"
                    placeholder="Enter Clubname"
                    type="text"
                    name="searchString"
                    value={value}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <span className="icon is-small is-right">
                    <i className="fas fa-search" />
                </span>
            </p>
        </div>
    );
};
