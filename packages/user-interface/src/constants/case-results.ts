import { AlertProps } from "@gemeente-denhaag/alert";

export const caseResults: Record<string, AlertProps["variant"]> = {
  verwerkt: "success",
  toegekend: "success",
  verleend: "success",
  afgehandeld: "success",
  verstrekt: "success",
  afgewezen: "error",
  geweigerd: "error",
  afgebroken: "info",
  ingetrokken: "info",
};
