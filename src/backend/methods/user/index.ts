import { ApiService } from '../../service';
import { ADD_USER_ENDPOINT } from '../../enpoint/user';

export interface AddUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gymId: string;
  phone: string;
  cedula: string;
  membershipId: string;
  paymentMethod: string;
  establishmentsID: string;
  receipt: string;
  receiptFilename: string;
  birthDate: string;
  reference: string;
  paymentNotes: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  cedula: string;
  birthDate: string;
  age: number;
  membershipType: string;
  status: string;
  joinDate: string;
  trainer: string;
  notes: string;
  totalVisits: number;
  weight: number;
  height: number;
  neck: number;
  chest: number;
  shoulders: number;
  arm: number;
  innerThigh: number;
  calf: number;
  hip: number;
  stomach: number;
  bodyNotes: string;
  isCurrent: boolean;
  previousMeasurements: {
    weight: number;
    height: number;
    neck: number;
    chest: number;
    shoulders: number;
    arm: number;
    innerThigh: number;
    calf: number;
    hip: number;
    stomach: number;
  };
}

export interface AddUserResponse {
  success: boolean;
  message: string;
  timestamp: string;
  data: {
    users?: UserData[];
  };
}

const api = new ApiService();

export async function addUser(user: AddUserRequest): Promise<AddUserResponse> {
  const result = await api.post<AddUserResponse>(ADD_USER_ENDPOINT, user);
  return result;
}