import {
    MessageCompiledInstruction,
    ParsedInstruction,
    SignatureResult,
    TransactionInstruction,
    VersionedMessage,
} from '@bbachain/web3.js';
import { InspectorInstructionCard } from '@components/common/InspectorInstructionCard';
import { useCluster } from '@providers/cluster';
import { getProgramName } from '@utils/tx';
import React from 'react';

export function UnknownDetailsCard({
    ix,
    index,
    message,
    raw,
    result,
    innerCards,
    childIndex,
    InstructionCardComponent = InspectorInstructionCard,
}: {
    childIndex?: number;
    index: number;
    innerCards?: JSX.Element[];
    ix: TransactionInstruction | ParsedInstruction;
    message: VersionedMessage;
    raw: TransactionInstruction | MessageCompiledInstruction;
    result: SignatureResult;
    InstructionCardComponent?: React.FC<Parameters<typeof InspectorInstructionCard>[0]>;
}) {
    const { cluster } = useCluster();
    const programName = getProgramName(ix.programId.toBase58(), cluster);
    return (
        <InstructionCardComponent
            ix={ix}
            index={index}
            raw={raw}
            message={message}
            result={result}
            title={`${programName}: Unknown Instruction`}
            innerCards={innerCards}
            childIndex={childIndex}
            defaultRaw
        />
    );
}
