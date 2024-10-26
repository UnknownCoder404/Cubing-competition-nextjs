"use client";
import React, { useEffect, useRef } from "react";
import { clsx } from "clsx";

type EventType =
    | null
    | "222"
    | "333"
    | "444"
    | "555"
    | "666"
    | "777"
    | "333bf"
    | "333fm"
    | "333oh"
    | "clock"
    | "minx"
    | "pyram"
    | "skewb"
    | "sq1"
    | "444bf"
    | "555bf"
    | "333mbf"
    | "333ft";

// Define the props for the component
interface ScrambleDisplayProps {
    event: EventType;
    scramble: null | string;
    visualization: "3D" | "2D";
    containerClassName: string;
    onClick?: () => void;
}

const ScrambleDisplayComponent: React.FC<ScrambleDisplayProps> = ({
    event,
    scramble,
    visualization,
    containerClassName,
    onClick,
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null); // A ref for the container element

    useEffect(() => {
        import("scramble-display").then(({ ScrambleDisplay }) => {
            if (containerRef.current) {
                const el = new ScrambleDisplay(); // Instantiate ScrambleDisplay
                el.event = event; // Set the event from props
                el.scramble = scramble; // Set the scramble from props
                el.visualization = visualization; // Set the visualization from props
                el.classList.add("scramble-display"); // Add the class to the ScrambleDisplay instance

                containerRef.current.replaceChildren(el); // Append the ScrambleDisplay instance to the DOM
            }
        });
    }, [event, scramble, visualization]); // Rerun the effect if the props change

    return (
        <div
            className={clsx("scramble-display-container", containerClassName)}
            ref={containerRef}
            onClick={() => {
                if (onClick) onClick();
            }}
        />
    );
};

export default ScrambleDisplayComponent;
