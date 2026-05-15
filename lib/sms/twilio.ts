export type SmsDispatch = {
  recipient: string
  message: string
}

export async function dispatchSms(payload: SmsDispatch) {
  return {
    provider: 'twilio',
    recipient: payload.recipient,
    queued: true,
    messageId: crypto.randomUUID(),
    acceptedAt: new Date().toISOString()
  }
}
