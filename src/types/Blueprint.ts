export type FieldType = "text" | "date" | "checkbox" | "signature";

export type Field = {
  id: string;
  label: string;
  type: FieldType;
  position: { x: number; y: number };
  width: number;
  height: number;
  required: boolean;
  color?: string; // ✅ Add optional color property
};

export type Blueprint = {
  id: string;
  name: string;
  fields: Field[];
};
