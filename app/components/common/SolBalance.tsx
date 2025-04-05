import { lamportsToSolString } from '@utils/index';
import React from 'react';

export function SolBalance({
    daltons,
    maximumFractionDigits = 9,
}: {
    daltons: number | bigint;
    maximumFractionDigits?: number;
}) {
    return (
        <span>
            ◎<span className="font-monospace">{lamportsToSolString(daltons, maximumFractionDigits)}</span>
        </span>
    );
}
