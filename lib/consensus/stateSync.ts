export type StateSyncPacket = {
  packetId: string
  sourceValidator: string
  stateRoot: string
  height: number
  syncedAt: string
}

const syncPackets: StateSyncPacket[] = []

export function publishStateSync(
  sourceValidator: string,
  stateRoot: string,
  height: number
): StateSyncPacket {
  const packet: StateSyncPacket = {
    packetId: crypto.randomUUID(),
    sourceValidator,
    stateRoot,
    height,
    syncedAt: new Date().toISOString()
  }

  syncPackets.unshift(packet)

  return packet
}

export function getLatestStateSync() {
  return syncPackets[0] ?? null
}
