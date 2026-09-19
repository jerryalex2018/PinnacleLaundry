export type UserRole = "customer" | "staff" | "admin";
export type CustomerType = "student" | "resident";

export interface UserProfile {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  role: UserRole;
  customerType: CustomerType;
  hostelName?: string;
  roomNumber?: string;
  buildingName?: string;
  houseNumber?: string;
  latitude?: number | null;
  longitude?: number | null;
}

export interface SignupPayload {
  email: string;
  password?: string;
  phone: string;
  fullName: string;
  customerType: CustomerType;
  hostelName?: string;
  roomNumber?: string;
  buildingName?: string;
  houseNumber?: string;
  latitude?: number | null;
  longitude?: number | null;
}

export interface LoginPayload {
  identifier: string; // phone or email
  password?: string;
}
