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
export function getStepKey(step: unknown): string {
  if (!step || typeof step !== "object") return "";

  const value = step as { typeID?: unknown; type?: unknown };
  if (typeof value.typeID === "string" && value.typeID.length > 0) {
    return value.typeID;
  }
  if (typeof value.type === "string" && value.type.length > 0) {
    return value.type;
  }
  try {
    return JSON.stringify(step);
  } catch {
    return String(step);
  }
}
