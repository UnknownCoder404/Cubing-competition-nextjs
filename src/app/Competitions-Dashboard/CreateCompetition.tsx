"use client";
import { useRouter } from "next/navigation";
import { createCompetition } from "../utils/competitions";
import styles from "./CompetitionDashboard.module.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";

const events = ["3x3", "3x3oh", "4x4", "2x2", "3x3bld", "megaminx", "teambld"];

function CreateCompDialog({
    showModal,
    closeModal,
}: {
    showModal: boolean;
    closeModal: () => void;
}) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [selectedEvents, setSelectedEvents] = useState<{
        [key: string]: { selected: boolean; rounds: number };
    }>({});
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (!dialogRef.current) return;

        if (showModal) dialogRef.current.showModal();
        else dialogRef.current.close();
    }, [showModal]);

    const handleEventChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setSelectedEvents((prevSelectedEvents) => ({
            ...prevSelectedEvents,
            [name]: {
                selected: checked,
                rounds: prevSelectedEvents[name]?.rounds || 1, // Default to 1 round if not set
            },
        }));
    };

    const handleRoundsChange = (
        event: ChangeEvent<HTMLSelectElement>,
        eventName: string,
    ) => {
        const { value } = event.target;
        setSelectedEvents((prevSelectedEvents) => ({
            ...prevSelectedEvents,
            [eventName]: {
                ...prevSelectedEvents[eventName],
                rounds: parseInt(value, 10),
            },
        }));
    };

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
        closeModal();
    };

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevents the form from submitting the traditional way

        try {
            const selectedEventList = Object.keys(selectedEvents)
                .filter((event) => selectedEvents[event].selected)
                .map((event) => ({
                    name: event,
                    rounds: selectedEvents[event].rounds,
                }));

            const compCreation = await createCompetition(
                name,
                date,
                selectedEventList,
            );

            if (!compCreation.success) {
                throw new Error("Failed to create competition");
            }
            handleClose(); // Close modal on successful creation
            router.refresh();
        } catch (error) {
            console.error("Error creating competition:", error);
            alert("Dogodila se greška pri stvaranju natjecanja.");
        }
    };

    return (
        <dialog
            className={styles["make-comp-modal"]}
            ref={dialogRef}
            onClose={handleClose}
        >
            <form className={styles["make-comp-form"]} onSubmit={handleSubmit}>
                <h2>Kreiraj natjecanje</h2>
                <label htmlFor="comp-name">Ime natjecanja</label>
                <br />
                <input
                    type="text"
                    id="comp-name"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    required
                />
                <br />
                <label htmlFor="comp-date">Datum natjecanja</label>
                <br />
                <input
                    type="datetime-local"
                    id="comp-date"
                    name="date"
                    value={date}
                    onChange={handleDateChange}
                    required
                />
                <br />
                <label>Eventovi</label>
                <br />
                {events.map((event, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            id={`event-${index}`}
                            name={event}
                            value={event}
                            onChange={handleEventChange}
                        />
                        <label htmlFor={`event-${index}`}>{event}</label>
                        <br />
                        <label htmlFor={`rounds-${event}`}>Broj rundi</label>
                        <select
                            id={`rounds-${event}`}
                            name={`rounds-${event}`}
                            disabled={!selectedEvents[event]?.selected}
                            value={selectedEvents[event]?.rounds || 1}
                            onChange={(e) => handleRoundsChange(e, event)}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                ))}
                <br />
                <button type="submit" className={styles["make-comp-submit"]}>
                    Napravi
                </button>
                <button type="button" onClick={handleClose}>
                    Zatvori
                </button>
            </form>
        </dialog>
    );
}

export function CreateCompButton() {
    const [showModal, setModalVisibility] = useState(false);

    function toggleModal() {
        setModalVisibility((current) => !current);
    }

    return (
        <>
            <button onClick={toggleModal}>Napravi natjecanje</button>
            {
                <CreateCompDialog
                    showModal={showModal}
                    closeModal={() => setModalVisibility(false)}
                />
            }
        </>
    );
}
