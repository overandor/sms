export type TreasuryBridge = {
  bridgeId: string
  sourceVault: string
  targetVault: string
  activeLiquidity: number
  synchronizedAt: string
}

const treasuryBridges: TreasuryBridge[] = []

export function createTreasuryBridge(
  sourceVault: string,
  targetVault: string,
  activeLiquidity: number
) {
  const bridge: TreasuryBridge = {
    bridgeId: crypto.randomUUID(),
    sourceVault,
    targetVault,
    activeLiquidity,
    synchronizedAt: new Date().toISOString()
  }

  treasuryBridges.push(bridge)

  return bridge
}

export function getTreasuryBridges() {
  return treasuryBridges
}
