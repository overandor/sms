// UNIMPLEMENTED: not called by any app/ route; returns synthetic data, no external integration.
export type SolanaNetwork = 'devnet' | 'mainnet-beta'

export function createSolanaClient(network: SolanaNetwork = 'devnet') {
  const endpoint =
    network === 'mainnet-beta'
      ? 'https://api.mainnet-beta.solana.com'
      : 'https://api.devnet.solana.com'

  return {
    network,
    endpoint,
    connectedAt: new Date().toISOString()
  }
}
