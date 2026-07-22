// UNIMPLEMENTED: not called by any app/ route; returns synthetic data, no external integration.
const replayWindow = new Map<string, string>()

export function verifyReplayProtection(signature: string) {
  if (replayWindow.has(signature)) {
    return {
      accepted: false,
      reason: 'replay_detected'
    }
  }

  replayWindow.set(signature, new Date().toISOString())

  return {
    accepted: true,
    reason: 'signature_accepted'
  }
}
