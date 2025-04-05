export type FeatureInfoType = {
    key: string;
    title: string;
    description: string | null;
    simd: number | null;
    simd_link: string | null;
    testnetActivationEpoch: number | null;
    mainnetActivationEpoch: number | null;
};
