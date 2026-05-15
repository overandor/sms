export type NetSettlementWindow = {
  windowId: string
  inboundValue: number
  outboundValue: number
  netPosition: number
  calculatedAt: string
}

export function calculateNetSettlement(
  inboundValue: number,
  outboundValue: number
): NetSettlementWindow {
  return {
    windowId: crypto.randomUUID(),
    inboundValue,
    outboundValue,
    netPosition: inboundValue - outboundValue,
    calculatedAt: new Date().toISOString()
  }
}
