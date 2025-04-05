export enum ClusterStatus {
    Connected,
    Connecting,
    Failure,
}

export enum Cluster {
    Mainnet,
    Testnet,
    Custom,
}

export const CLUSTERS = [Cluster.Mainnet, Cluster.Testnet, Cluster.Custom];

export function clusterSlug(cluster: Cluster): string {
    switch (cluster) {
        case Cluster.Mainnet:
            return 'mainnet';
        case Cluster.Testnet:
            return 'testnet';
        case Cluster.Custom:
            return 'custom';
    }
}

export function clusterName(cluster: Cluster): string {
    switch (cluster) {
        case Cluster.Mainnet:
            return 'Mainnet';
        case Cluster.Testnet:
            return 'Testnet';
        case Cluster.Custom:
            return 'Custom';
    }
}

export const MAINNET_URL = 'https://api-mainnet.bbachain.com';
export const TESTNET_URL = 'https://api-testnet.bbachain.com';

export function clusterUrl(cluster: Cluster, customUrl: string): string {
    const modifyUrl = (url: string): string => {
        if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
            return url;
        } else {
            return url.replace('api', 'explorer-api');
        }
    };

    switch (cluster) {
        case Cluster.Mainnet:
            return process.env.NEXT_PUBLIC_MAINNET_RPC_URL ?? modifyUrl(MAINNET_URL);
        case Cluster.Testnet:
            return process.env.NEXT_PUBLIC_TESTNET_RPC_URL ?? modifyUrl(TESTNET_URL);
        case Cluster.Custom:
            return customUrl;
    }
}

export const DEFAULT_CLUSTER = Cluster.Mainnet;
