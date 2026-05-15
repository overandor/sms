export type MerkleNode = {
  hash: string
}

export function buildMerkleRoot(leaves: string[]) {
  const combined = leaves.join(':')

  return {
    root: btoa(combined).slice(0, 64),
    leafCount: leaves.length,
    generatedAt: new Date().toISOString()
  }
}
