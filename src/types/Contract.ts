// types/Contract.ts
import type { Field } from "./Blueprint";

export type ContractStatus =
  | "Created"
  | "Approved"
  | "Sent"
  | "Signed"
  | "Locked"
  | "Revoked"
  | "Active"
  | "Pending";

export type Contract = {
  id: string;
  blueprintName: string;
  name: string;
  fields: (Field & { value: string | boolean | Date | null })[];
  status: ContractStatus;
  createdAt: string; // <--- Add this line here
};