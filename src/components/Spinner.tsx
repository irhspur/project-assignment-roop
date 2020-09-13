import React from "react";

export const Spinner = ({ isActive = false }: { isActive: boolean }) => {
    return (
        <div className={` loader-wrapper ${isActive ? "is-active" : ""}`}>
            <div className="loader is-loading" />
        </div>
    );
};
