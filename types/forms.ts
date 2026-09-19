export type FieldType =
  | "text"
  | "email"
  | "password"
  | "tel"
  | "number"
  | "select"
  | "textarea";

export interface FormOption {
  label: string;
  value: string;
}

export interface FormFieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: FormOption[];
  gridSpan?: "full" | "half";
  helpText?: string;
}
