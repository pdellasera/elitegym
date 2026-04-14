import { ApiService } from '../../service';
import { GET_MEMBERSHIPS_ENDPOINT } from '../../enpoint/memberShips';

export interface GetMemberShipsRequest {
  gymId: string;
}

export interface Membership {
  id: string;
  type: string;
  status: string;
  name: string;
  price: number;
  durationMonths: number;
  isActive: boolean;
  benefits: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface GetMemberShipsResponse {
  success: boolean;
  message: string;
  timestamp: string;
  data: {
    memberships: Membership[];
  };
}

const api = new ApiService();

export async function GetMemberShipsPlan(request: GetMemberShipsRequest): Promise<GetMemberShipsResponse> {
  const result = await api.post<GetMemberShipsResponse>(GET_MEMBERSHIPS_ENDPOINT, request);
  return result;
}