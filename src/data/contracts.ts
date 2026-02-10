// src/data/contracts.ts
import type { Contract } from "../types/Contract";

export const contracts: Contract[] = [
  {
    id: "1",
    name: "Employment Agreement",
    blueprintName: "HR Blueprint",
    status: "Active",
    createdAt: "2025-01-10",
    fields: [], // Added to satisfy the 'Contract' type
  },
  {
    id: "2",
    name: "NDA Agreement",
    blueprintName: "Legal Blueprint",
    status: "Pending",
    createdAt: "2025-01-15",
    fields: [], // Added to satisfy the 'Contract' type
  },
  {
    id: "3",
    name: "Vendor Contract",
    blueprintName: "Vendor Blueprint",
    status: "Signed",
    createdAt: "2025-01-18",
    fields: [], // Added to satisfy the 'Contract' type
  },
];