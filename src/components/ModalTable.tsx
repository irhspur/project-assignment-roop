import React from "react";
import { TLast5 } from "../utils";
import { getStatusClass } from "../utils/dataUtils";

export const ModalTable = ({ data }: { data?: TLast5[] }) => {
    return (
        <div>
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Match Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((match) => (
                            <tr key={match.date}>
                                <td>{match.date}</td>
                                <td>
                                    <span
                                        className={`tag ${getStatusClass(
                                            match.status
                                        )}`}
                                    >
                                        {match.status}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr aria-colspan={2}>No Data</tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
