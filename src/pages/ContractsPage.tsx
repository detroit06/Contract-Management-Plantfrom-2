import { useContext } from "react";
import { ContractContext } from "../context/ContractContext";
import type { Contract } from "../types/Contract";

const ContractsPage = () => {
  const { contracts, updateContractField, changeContractStatus } = useContext(ContractContext);

  const isEditable = (contract: Contract) =>
    contract.status !== "Locked" && contract.status !== "Revoked";

  const actionMap: Record<string, Contract["status"]> = {
    Approve: "Approved",
    Send: "Sent",
    Sign: "Signed",
    Lock: "Locked",
    Revoke: "Revoked",
  };

  const nextActions: Record<Contract["status"], string[]> = {
    Created: ["Approve", "Revoke"],
    Approved: ["Send", "Revoke"],
    Sent: ["Sign", "Revoke"],
    Signed: ["Lock"],
    Locked: [],
    Revoked: [],
  };

  const handleFieldChange = (contractId: string, fieldId: string, value: any) => {
    updateContractField(contractId, fieldId, value);
  };

  return (
    <div style={{ padding: 20, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>Contracts Dashboard</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
        {contracts.map(contract => (
          <div
            key={contract.id}
            style={{
              position: "relative",
              width: 350,
              padding: 15,
              borderRadius: 12,
              backgroundColor: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <h3>{contract.name}</h3>
            <p>
              Status: <b>{contract.status}</b>
            </p>

            {/* Lifecycle Actions */}
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
              {nextActions[contract.status].map(action => (
                <button
                  key={action}
                  onClick={() => changeContractStatus(contract.id, actionMap[action])}
                  style={{
                    padding: "5px 10px",
                    backgroundColor:
                      action === "Revoke"
                        ? "#f44336"
                        : action === "Lock"
                        ? "#555"
                        : "#1976d2",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  {action}
                </button>
              ))}
            </div>

            {/* Fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {contract.fields.map(field => (
                <div key={field.id} style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontWeight: 600, marginBottom: 3 }}>{field.label}</label>
                  {field.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      checked={field.value as boolean || false}
                      disabled={!isEditable(contract)}
                      onChange={e =>
                        handleFieldChange(contract.id, field.id, e.target.checked)
                      }
                      style={{ width: 20, height: 20 }}
                    />
                  ) : field.type === "date" ? (
                    <input
                      type="date"
                      value={field.value as string || ""}
                      disabled={!isEditable(contract)}
                      onChange={e =>
                        handleFieldChange(contract.id, field.id, e.target.value)
                      }
                      style={{
                        padding: "5px",
                        borderRadius: 4,
                        border: "1px solid #ccc",
                        fontSize: 14,
                      }}
                    />
                  ) : (
                    <input
                      type="text"
                      value={field.value as string || ""}
                      disabled={!isEditable(contract)}
                      onChange={e =>
                        handleFieldChange(contract.id, field.id, e.target.value)
                      }
                      style={{
                        padding: "5px",
                        borderRadius: 4,
                        border: "1px solid #ccc",
                        fontSize: 14,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractsPage;
