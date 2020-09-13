import React from "react";
import { TClub, TTeamData } from "../utils";
import { ModalTable } from "./ModalTable";

type TModalProps = {
    isActive: boolean;
    onClose: () => void;
    clubInfo: (TClub & TTeamData) | {};
};

export const ClubModal = ({ isActive, onClose, clubInfo }: TModalProps) => {
    return (
        <div className={`modal ${isActive ? "is-active" : ""}`}>
            <div className="modal-background" onClick={onClose} />
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Club Info</p>
                    <button
                        className="delete"
                        aria-label="close"
                        onClick={onClose}
                    />
                </header>
                <section className="modal-card-body">
                    {"name" in clubInfo ? (
                        <div className="level">
                            <div className="level-left">
                                <article className="media">
                                    <figure className="media-left">
                                        <p className="image is-64x64">
                                            <img
                                                src={clubInfo.clubLogo}
                                                alt={clubInfo.name}
                                            />
                                        </p>
                                    </figure>
                                    <div className="media-content">
                                        <div className="content">
                                            <p>
                                                <strong>{clubInfo.name}</strong>
                                            </p>
                                        </div>
                                        <div>
                                            <strong>Country</strong>:{" "}
                                            {clubInfo.country}
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <div className="level-right">
                                <ModalTable data={clubInfo.last5} />
                            </div>
                        </div>
                    ) : (
                        <strong>Club Info Not Found</strong>
                    )}
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-info" onClick={onClose}>
                        Close
                    </button>
                </footer>
            </div>
        </div>
    );
};
