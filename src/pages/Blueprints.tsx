import { useState, useContext } from "react";
import type { FormEvent } from "react";
import { BlueprintContext } from "../context/BlueprintContext";
import { ContractContext } from "../context/ContractContext";
import type { Blueprint, Field, FieldType } from "../types/Blueprint";
import type { Contract } from "../types/Contract";

/* ---------------- TEMPLATE COLORS ---------------- */
const templateColors = [
  { background: "#ffe0b2", field: "#ff9800" },
  { background: "#c8e6c9", field: "#4caf50" },
  { background: "#bbdefb", field: "#2196f3" },
  { background: "#f8bbd0", field: "#e91e63" },
];

/* ---------------- CONTRACT STATUS ---------------- */
export const ContractStatus = {
  Created: "Created",
  Approved: "Approved",
  Sent: "Sent",
  Signed: "Signed",
  Locked: "Locked",
  Revoked: "Revoked",
} as const;

type ContractStatusType =
  typeof ContractStatus[keyof typeof ContractStatus];

/* ---------------- PAGE ---------------- */
const BlueprintsPage = () => {
  const { blueprints, addBlueprint, deleteBlueprint } =
    useContext(BlueprintContext);

  const { contracts, addContract, changeContractStatus } =
    useContext(ContractContext);

  const [showBlueprintForm, setShowBlueprintForm] = useState(false);
  const [blueprintName, setBlueprintName] = useState("");
  const [selectedBlueprintId, setSelectedBlueprintId] =
    useState<string | null>(null);

  const [fieldLabel, setFieldLabel] = useState("");
  const [fieldType, setFieldType] = useState<FieldType>("text");
  const [selectedFieldIds, setSelectedFieldIds] = useState<string[]>([]);

  /* ---------------- CREATE BLUEPRINT ---------------- */
  const handleBlueprintSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!blueprintName.trim()) return;

    const bp: Blueprint = {
      id: crypto.randomUUID(),
      name: blueprintName,
      fields: [],
    };

    addBlueprint(bp);
    setBlueprintName("");
    setShowBlueprintForm(false);
  };

  /* ---------------- ADD FIELD (NO OVERLAP) ---------------- */
  const handleAddField = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedBlueprintId) return;

    const bp = blueprints.find(b => b.id === selectedBlueprintId);
    if (!bp) return;

    const y = bp.fields.length * 60 + 20;

    const field: Field = {
      id: crypto.randomUUID(),
      label: fieldLabel,
      type: fieldType,
      position: { x: 20, y },
      width: 140,
      height: 45,
      required: false,
      color:
        templateColors[
          Math.floor(Math.random() * templateColors.length)
        ].field,
    };

    const updated = {
      ...bp,
      fields: [...bp.fields, field],
    };

    addBlueprint(
      blueprints.map(b => (b.id === bp.id ? updated : b)),
      true
    );

    setFieldLabel("");
    setFieldType("text");
    setSelectedBlueprintId(null);
  };

  const deleteField = (bpId: string, fieldId: string) => {
    const bp = blueprints.find(b => b.id === bpId);
    if (!bp) return;

    addBlueprint(
      blueprints.map(b =>
        b.id === bpId
          ? { ...b, fields: b.fields.filter(f => f.id !== fieldId) }
          : b
      ),
      true
    );
  };

  /* ---------------- CONTRACT GENERATION ---------------- */
  const generateContract = (bp: Blueprint) => {
    const contract: Contract = {
      id: crypto.randomUUID(),
      blueprintName: bp.id,
      name: `${bp.name} Contract`,
      fields: bp.fields.map(f => ({
        ...f,
        value: f.type === "checkbox" ? false : "",
      })),
      status: "Created",
    };

    addContract(contract);
  };

  const toggleSelect = (id: string) => {
    setSelectedFieldIds(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  const exportJSON = (bp: Blueprint) => {
    const blob = new Blob([JSON.stringify(bp, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${bp.name}.json`;
    a.click();
  };

/* ---------------- RENDER ---------------- */ return ( <div className="container-fluid p-4" style={{ minHeight: "100vh", backgroundImage: "url('/tempback.jpg')", backgroundSize: "cover", backgroundPosition: "center", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", }}> <h1 className="text-center text-black mb-4" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>Contract Management Platform</h1>

      {/* COMPANY TEMPLATES */}
      <h5 className="text-white mb-3">Company Templates</h5>
      <div className="d-flex flex-wrap gap-3 mb-4">
        {templateColors.map((c, i) => (
          <div
            key={i}
            className="card p-3 shadow-sm"
            style={{
              width: 260,
              cursor: "pointer",
              background: c.background,
              borderRadius: 12,
            }}
            onClick={() => {
              addBlueprint({
                id: crypto.randomUUID(),
                name: `Company Template ${i + 1}`,
                fields: [
                  {
                    id: crypto.randomUUID(),
                    label: "Name",
                    type: "text",
                    width: 120,
                    height: 40,
                    position: { x: 20, y: 20 },
                    required: true,
                    color: c.field,
                  },
                  {
                    id: crypto.randomUUID(),
                    label: "Date",
                    type: "date",
                    width: 120,
                    height: 40,
                    position: { x: 20, y: 80 },
                    required: true,
                    color: c.field,
                  },
                ],
              });
            }}
          >
            <strong>Template {i + 1}</strong>
            <p style={{ fontSize: 13 }}>
              Click to create blueprint
            </p>
          </div>
        ))}
      </div>

      {/* CREATE BLUEPRINT */}
      <div className="d-flex justify-content-center gap-2 mb-4">
        <button
          className="btn btn-success"
          onClick={() => setShowBlueprintForm(!showBlueprintForm)}
        >
          + Create Blueprint
        </button>

        {showBlueprintForm && (
          <form
            onSubmit={handleBlueprintSubmit}
            className="d-flex gap-2"
          >
            <input
              className="form-control"
              value={blueprintName}
              onChange={e => setBlueprintName(e.target.value)}
              placeholder="Blueprint name"
              required
            />
            <button className="btn btn-primary">Save</button>
          </form>
        )}
      </div>

      {/* BLUEPRINT CARDS */}
      <div className="d-flex flex-wrap justify-content-center gap-3">
        {blueprints.map(bp => (
          <div
            key={bp.id}
            className="card p-3 shadow"
            style={{
              width: 360,
              minHeight: 420,
              position: "relative",
            }}
          >
            <h5>{bp.name}</h5>

            <div className="d-flex gap-2 mb-2">
              <button
                className="btn btn-info btn-sm"
                onClick={() => setSelectedBlueprintId(bp.id)}
              >
                + Field
              </button>
              <button
                className="btn btn-warning btn-sm"
                onClick={() => generateContract(bp)}
              >
                Generate
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => exportJSON(bp)}
              >
                Export
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteBlueprint(bp.id)}
              >
                Delete
              </button>
            </div>

            {selectedBlueprintId === bp.id && (
              <form
                onSubmit={handleAddField}
                className="d-flex gap-2 mb-2"
              >
                <input
                  className="form-control form-control-sm"
                  value={fieldLabel}
                  onChange={e => setFieldLabel(e.target.value)}
                  placeholder="Field label"
                  required
                />
                <select
                  className="form-select form-select-sm"
                  value={fieldType}
                  onChange={e =>
                    setFieldType(e.target.value as FieldType)
                  }
                >
                  <option value="text">Text</option>
                  <option value="date">Date</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="signature">Signature</option>
                </select>
                <button className="btn btn-success btn-sm">
                  Add
                </button>
              </form>
            )}

            {/* FIELDS */}
            {bp.fields.map(f => (
              <div
                key={f.id}
                onClick={() => toggleSelect(f.id)}
                style={{
                  position: "absolute",
                  left: f.position.x,
                  top: f.position.y,
                  width: f.width,
                  height: f.height,
                  background: f.color,
                  color: "#fff",
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  border: selectedFieldIds.includes(f.id)
                    ? "2px dashed #000"
                    : "none",
                }}
              >
                {f.label}
                <button
                  onClick={e => {
                    e.stopPropagation();
                    deleteField(bp.id, f.id);
                  }}
                  style={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    borderRadius: "50%",
                    background: "red",
                    color: "#fff",
                    border: "none",
                    width: 20,
                    height: 20,
                  }}
                >
                  ×
                </button>
              </div>
            ))}

            {/* CONTRACTS */}
            <div className="mt-4">
              {contracts
                .filter(c => c.blueprintName === bp.id)
                .map(c => (
                  <div
                    key={c.id}
                    className="d-flex justify-content-between p-2 border rounded mb-2"
                  >
                    <div>
                      <strong>{c.name}</strong>
                      <div>Status: {c.status}</div>
                    </div>

                    <div className="d-flex gap-1">
                      <button
                        className="btn btn-sm btn-primary"
                        disabled={
                          c.status === "Locked" ||
                          c.status === "Revoked"
                        }
                        onClick={() => {
                          const next: Record<
                            ContractStatusType,
                            ContractStatusType | null
                          > = {
                            Created: "Approved",
                            Approved: "Sent",
                            Sent: "Signed",
                            Signed: "Locked",
                            Locked: null,
                            Revoked: null,
                          };

                          const nextStatus = next[c.status];
                          if (nextStatus) {
                            changeContractStatus(
                              c.id,
                              nextStatus
                            );
                          }
                        }}
                      >
                        Next
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        disabled={c.status === "Locked"}
                        onClick={() =>
                          changeContractStatus(c.id, "Revoked")
                        }
                      >
                        Revoke
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlueprintsPage;
