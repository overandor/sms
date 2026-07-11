// UNIMPLEMENTED: not called by any app/ route; returns synthetic data, no external integration.
export type TreasuryMapRegion = {
  jurisdiction: string
  reserveVolume: number
  activeCorridors: number
  validatorDensity: number
}

export function generateGlobalTreasuryMap(): TreasuryMapRegion[] {
  return [
    {
      jurisdiction: 'North America',
      reserveVolume: 8400000,
      activeCorridors: 12,
      validatorDensity: 0.92
    },
    {
      jurisdiction: 'Europe',
      reserveVolume: 6200000,
      activeCorridors: 9,
      validatorDensity: 0.88
    },
    {
      jurisdiction: 'Asia Pacific',
      reserveVolume: 9100000,
      activeCorridors: 15,
      validatorDensity: 0.94
    }
  ]
}
