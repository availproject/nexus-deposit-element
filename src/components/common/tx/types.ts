export type TransactionStatus =
  | "idle"
  | "preview"
  | "awaiting-approval"
  | "executing"
  | "success"
  | "error";

export type GenericStep<TStep> = {
  id: number;
  completed: boolean;
  step: TStep;
};

/**
 * Normalizes a step to a stable key. Prefers typeID, then type, otherwise JSON.
 */
export function getStepKey(
  step: unknown,
): string {
  if (!step) return "";
  if (typeof step === "object") {
    const stepWithMeta = step as { typeID?: unknown; type?: unknown };
    if (
      typeof stepWithMeta.typeID === "string" &&
      stepWithMeta.typeID.length > 0
    ) {
      return stepWithMeta.typeID;
    }
    if (typeof stepWithMeta.type === "string" && stepWithMeta.type.length > 0) {
      return stepWithMeta.type;
    }
  }
  try {
    return JSON.stringify(step);
  } catch {
    return String(step);
  }
}
