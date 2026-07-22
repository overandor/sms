// UNIMPLEMENTED: not called by any app/ route; returns synthetic data, no external integration.
export type ValidatorNode = {
  validatorId: string
  region: string
  reputation: number
  active: boolean
}

const validatorMesh: ValidatorNode[] = []

export function registerValidator(
  region: string,
  reputation: number
): ValidatorNode {
  const validator: ValidatorNode = {
    validatorId: crypto.randomUUID(),
    region,
    reputation,
    active: true
  }

  validatorMesh.push(validator)

  return validator
}

export function getValidatorMesh() {
  return validatorMesh
}
