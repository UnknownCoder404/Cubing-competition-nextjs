"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CompetitionType } from "../Types/solve";
import { useRouter } from "next/navigation";
import styles from "./CompetitionDashboard.module.css";
import { Loader } from "../components/Loader/Loader";
import { editCompetition } from "../utils/competitions";
import { format } from "date-fns";
const events = ["3x3", "3x3oh", "4x4", "2x2", "3x3bld", "megaminx", "teambld"];

function EventSelection({
    selectedEvents,
    handleEventChange,
    handleRoundsChange,
}: {
    selectedEvents: { [key: string]: { selected: boolean; rounds: number } };
    handleEventChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleRoundsChange: (
        e: ChangeEvent<HTMLSelectElement>,
        eventName: string,
    ) => void;
}) {
    return (
        <>
            {events.map((event, index) => (
                <div key={index}>
                    <input
                        type="checkbox"
                        id={`event-${index}`}
                        name={event}
                        onChange={handleEventChange}
                        checked={selectedEvents[event]?.selected || false}
                    />
                    <label htmlFor={`event-${index}`}>{event}</label>
                    <br />
                    <label htmlFor={`rounds-${event}`}>Broj rundi</label>
                    <select
                        id={`rounds-${event}`}
                        disabled={!selectedEvents[event]?.selected}
                        value={selectedEvents[event]?.rounds || 1}
                        onChange={(e) => handleRoundsChange(e, event)}
                    >
                        {[...Array(5)].map((_, i) => (
                            <option key={i} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </>
    );
}

type Props = {
    competition: CompetitionType;
    show: boolean;
    setVisibilityAction: (visible: boolean) => void;
};

function CompetitionForm({
    competition,
    name,
    date,
    selectedEvents,
    setName,
    setDate,
    setSelectedEvents,
    isLoading,
    closeModal,
    setLoading,
}: {
    competition: CompetitionType;
    name: string;
    date: string;
    selectedEvents: { [key: string]: { selected: boolean; rounds: number } };
    setName: (value: string) => void;
    setDate: (value: string) => void;
    setSelectedEvents: React.Dispatch<
        React.SetStateAction<{
            [key: string]: { selected: boolean; rounds: number };
        }>
    >;
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
    closeModal: () => void;
}) {
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            const compEdit = await editCompetition(
                competition._id,
                name,
                date,
                Object.entries(selectedEvents).map(([eventName, event]) => ({
                    name: eventName,
                    rounds: event.rounds,
                })),
            );
            if (!compEdit.success) throw new Error("Greška prilikom izmjene");
            router.refresh();
        } catch (error) {
            console.error("Error editing competition:", error);
            alert(error || "Dogodila se greška prilikom izmjene natjecanja");
        } finally {
            setLoading(false);
            closeModal();
        }
    }

    function handleEventChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, checked } = e.target;
        setSelectedEvents((prev) => ({
            ...prev,
            [name]: { selected: checked, rounds: prev[name]?.rounds || 1 },
        }));
    }

    function handleRoundsChange(
        e: ChangeEvent<HTMLSelectElement>,
        eventName: string,
    ) {
        const { value } = e.target;
        setSelectedEvents((prev) => ({
            ...prev,
            [eventName]: { ...prev[eventName], rounds: parseInt(value, 10) },
        }));
    }

    return (
        <form className={styles["make-comp-form"]} onSubmit={handleSubmit}>
            <h2>Uredi natjecanje</h2>
            <label htmlFor="comp-name">Ime natjecanja</label>
            <input
                type="text"
                id="comp-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <label htmlFor="comp-date">Datum natjecanja</label>
            <input
                type="datetime-local"
                id="comp-date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />

            <label>Eventovi</label>
            <EventSelection
                selectedEvents={selectedEvents}
                handleEventChange={handleEventChange}
                handleRoundsChange={handleRoundsChange}
            />

            {isLoading ? (
                <Loader />
            ) : (
                <div className={styles["make-comp-form-buttons"]}>
                    <button
                        type="submit"
                        className={styles["make-comp-submit"]}
                    >
                        Uredi
                    </button>
                    <button type="button" onClick={closeModal}>
                        Zatvori
                    </button>
                </div>
            )}
        </form>
    );
}

export default function EditCompDialog({
    competition,
    show,
    setVisibilityAction,
}: Props) {
    const [name, setName] = useState<string>(competition.name);
    const [date, setDate] = useState<string>(() => {
        const parsedDate = new Date(competition.date);
        return isNaN(parsedDate.getTime())
            ? "" // fallback if date parsing fails
            : format(parsedDate, "yyyy-MM-dd'T'HH:mm");
    });
    const [selectedEvents, setSelectedEvents] = useState<{
        [key: string]: { selected: boolean; rounds: number };
    }>(
        competition.events.reduce(
            (
                acc: { [key: string]: { selected: boolean; rounds: number } },
                event,
            ) => {
                acc[event.name] = { selected: true, rounds: event.rounds };
                return acc;
            },
            {},
        ),
    );
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    function closeModal() {
        setVisibilityAction(false);
    }

    useEffect(() => {
        if (!dialogRef.current) return;
        if (show) dialogRef.current.showModal();
        else dialogRef.current.close();
    }, [show]);

    return (
        <dialog ref={dialogRef}>
            <CompetitionForm
                competition={competition}
                name={name}
                date={date}
                selectedEvents={selectedEvents}
                setName={setName}
                setDate={setDate}
                setSelectedEvents={setSelectedEvents}
                setLoading={setIsLoading}
                isLoading={isLoading}
                closeModal={closeModal}
            />
        </dialog>
    );
}
