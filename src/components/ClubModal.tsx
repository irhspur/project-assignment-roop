import React from "react";
import { TClub } from "../utils";

type TModalProps = {
    isActive: boolean;
    onClose: () => void;
    clubInfo: TClub | {};
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
                        <div>
                            <strong>{clubInfo.name}</strong>
                            <div>
                                <strong>Country</strong>: {clubInfo.country}
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
