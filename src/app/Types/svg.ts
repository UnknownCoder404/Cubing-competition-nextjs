import React from "react";

export type SvgProps = {
    fill: string;
    width: string;
    height: string;
} & React.HTMLAttributes<SVGElement>;
