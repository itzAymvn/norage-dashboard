"use client";

import { Tooltip as ReactTooltip } from "react-tooltip";

export default function Tooltip({ id }: { id: string }) {
    return <ReactTooltip id={id} />;
}
