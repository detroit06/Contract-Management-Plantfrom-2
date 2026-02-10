import { useState } from "react";
import { contracts as mockContracts } from "../data/contracts";
import type{ ContractStatus } from "../types/Contract";

export default function ContractDashboard() {
  const [statusFilter, setStatusFilter] = useState<ContractStatus | "All">("All");

  const filteredContracts =
    statusFilter === "All"
      ? mockContracts
      : mockContracts.filter(c => c.status === statusFilter);

  return (
    <div>
      <h2>Contract Listing Dashboard</h2>

      {/* Filter */}
      <select onChange={(e) => setStatusFilter(e.target.value as any)}>
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Signed">Signed</option>
      </select>

      {/* Table */}
      <table border={1} cellPadding={10} style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Contract Name</th>
            <th>Blueprint Name</th>
            <th>Status</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredContracts.map(contract => (
            <tr key={contract.id}>
              <td>{contract.name}</td>
              <td>{contract.blueprintName}</td>
              <td>{contract.status}</td>
              <td>{contract.createdAt}</td>
              <td>
                <button>View</button>
                <button style={{ marginLeft: "5px" }}>
                  Change Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
