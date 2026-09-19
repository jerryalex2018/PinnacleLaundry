export type LaundryServiceType =
  | "wash"
  | "iron"
  | "fold"
  | "blankets"
  | "pickup";

export interface BookingPayload {
  serviceType: LaundryServiceType;
  estimatedWeightKg?: number;
  specialInstructions?: string;
  pickupRequired: boolean;
  latitude?: number | null;
  longitude?: number | null;
}
