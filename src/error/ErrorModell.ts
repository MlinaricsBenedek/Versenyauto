
import { ZodError } from "zod/v3"

export function formatZodError(zodError: ZodError<unknown>) {
  return zodError.errors.map((e) => ({
    field: e.path.join("."),
    detail: e.message ?? "Invalid properties",
  }));
}
