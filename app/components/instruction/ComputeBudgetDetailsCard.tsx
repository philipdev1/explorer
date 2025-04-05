import { SignatureResult, TransactionInstruction } from '@bbachain/web3.js';
import { Address } from '@components/common/Address';
import { SolBalance } from '@components/common/SolBalance';
import { useCluster } from '@providers/cluster';
import {
    ComputeBudgetInstruction,
    identifyComputeBudgetInstruction,
    parseRequestHeapFrameInstruction,
    parseRequestUnitsInstruction,
    parseSetComputeUnitLimitInstruction,
    parseSetComputeUnitPriceInstruction,
    parseSetLoadedAccountsDataSizeLimitInstruction,
} from '@solana-program/compute-budget';
import { microLamportsToLamportsString } from '@utils/index';
import React from 'react';
import { address } from 'web3js-experimental';

import { InstructionCard } from './InstructionCard';

export function ComputeBudgetDetailsCard({
    ix,
    index,
    result,
    signature,
    innerCards,
    childIndex,
    InstructionCardComponent = InstructionCard,
}: {
    ix: TransactionInstruction;
    index: number;
    result: SignatureResult;
    signature: string;
    innerCards?: JSX.Element[];
    childIndex?: number;
    InstructionCardComponent?: React.FC<Parameters<typeof InstructionCard>[0]>;
}) {
    const { url } = useCluster();

    try {
        const type = identifyComputeBudgetInstruction(ix as any);
        switch (type) {
            case ComputeBudgetInstruction.RequestUnits: {
                const idata = { ...ix, programAddress: address(ix.programId.toBase58()) };
                const {
                    data: { units, additionalFee },
                } = parseRequestUnitsInstruction(idata as any);
                return (
                    <InstructionCardComponent
                        ix={ix}
                        index={index}
                        result={result}
                        title="Compute Budget Program: Request Units (Deprecated)"
                        innerCards={innerCards}
                        childIndex={childIndex}
                    >
                        <tr>
                            <td>Program</td>
                            <td className="text-lg-end">
                                <Address pubkey={ix.programId} alignRight link />
                            </td>
                        </tr>

                        <tr>
                            <td>Requested Compute Units</td>
                            <td className="text-lg-end font-monospace">{`${new Intl.NumberFormat('en-US').format(
                                units
                            )} compute units`}</td>
                        </tr>

                        <tr>
                            <td>Additional Fee (SOL)</td>
                            <td className="text-lg-end">
                                <SolBalance daltons={additionalFee} />
                            </td>
                        </tr>
                    </InstructionCardComponent>
                );
            }
            case ComputeBudgetInstruction.RequestHeapFrame: {
                const {
                    data: { bytes },
                } = parseRequestHeapFrameInstruction({ ...ix as any, programAddress: address(ix.programId.toBase58()) });
                return (
                    <InstructionCardComponent
                        ix={ix}
                        index={index}
                        result={result}
                        title="Compute Budget Program: Request Heap Frame"
                        innerCards={innerCards}
                        childIndex={childIndex}
                    >
                        <tr>
                            <td>Program</td>
                            <td className="text-lg-end">
                                <Address pubkey={ix.programId} alignRight link />
                            </td>
                        </tr>

                        <tr>
                            <td>Requested Heap Frame (Bytes)</td>
                            <td className="text-lg-end font-monospace">
                                {new Intl.NumberFormat('en-US').format(bytes)}
                            </td>
                        </tr>
                    </InstructionCardComponent>
                );
            }
            case ComputeBudgetInstruction.SetComputeUnitLimit: {
                const {
                    data: { units },
                } = parseSetComputeUnitLimitInstruction({ ...ix as any, programAddress: address(ix.programId.toBase58()) });
                return (
                    <InstructionCardComponent
                        ix={ix}
                        index={index}
                        result={result}
                        title="Compute Budget Program: Set Compute Unit Limit"
                        innerCards={innerCards}
                        childIndex={childIndex}
                    >
                        <tr>
                            <td>Program</td>
                            <td className="text-lg-end">
                                <Address pubkey={ix.programId} alignRight link />
                            </td>
                        </tr>

                        <tr>
                            <td>Compute Unit Limit</td>
                            <td className="text-lg-end font-monospace">{`${new Intl.NumberFormat('en-US').format(
                                units
                            )} compute units`}</td>
                        </tr>
                    </InstructionCardComponent>
                );
            }
            case ComputeBudgetInstruction.SetComputeUnitPrice: {
                const {
                    data: { microLamports },
                } = parseSetComputeUnitPriceInstruction({
                    ...ix as any,
                    programAddress: address(ix.programId.toBase58()),
                });
                return (
                    <InstructionCardComponent
                        ix={ix}
                        index={index}
                        result={result}
                        title="Compute Budget Program: Set Compute Unit Price"
                        innerCards={innerCards}
                        childIndex={childIndex}
                    >
                        <tr>
                            <td>Program</td>
                            <td className="text-lg-end">
                                <Address pubkey={ix.programId} alignRight link />
                            </td>
                        </tr>

                        <tr>
                            <td>Compute Unit Price</td>
                            <td className="text-lg-end font-monospace">{`${microLamportsToLamportsString(
                                microLamports
                            )} daltons per compute unit`}</td>
                        </tr>
                    </InstructionCardComponent>
                );
            }
            case ComputeBudgetInstruction.SetLoadedAccountsDataSizeLimit: {
                const {
                    data: { accountDataSizeLimit },
                } = parseSetLoadedAccountsDataSizeLimitInstruction({
                    ...ix as any,
                    programAddress: address(ix.programId.toBase58()),
                });
                return (
                    <InstructionCardComponent
                        ix={ix}
                        index={index}
                        result={result}
                        title="Compute Budget Program: Set Loaded Account Data Size Limit"
                        innerCards={innerCards}
                        childIndex={childIndex}
                    >
                        <tr>
                            <td>Program</td>
                            <td className="text-lg-end">
                                <Address pubkey={ix.programId} alignRight link />
                            </td>
                        </tr>

                        <tr>
                            <td>Account Data Size Limit</td>
                            <td className="text-lg-end font-monospace">{`${accountDataSizeLimit} bytes`}</td>
                        </tr>
                    </InstructionCardComponent>
                );
            }
        }
    } catch (error) {
        console.error(error, {
            signature: signature,
            url: url,
        });
    }

    return (
        <InstructionCardComponent
            ix={ix}
            index={index}
            result={result}
            title="Compute Budget Program: Unknown Instruction"
            innerCards={innerCards}
            childIndex={childIndex}
            defaultRaw
        />
    );
}
