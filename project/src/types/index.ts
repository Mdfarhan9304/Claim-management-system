export type ClaimStatus = 'pending' | 'approved' | 'rejected';

export interface Claim {
  id: string;
  patientName: string;
  email: string;
  amount: number;
  description: string;
  documentUrl?: string;
  status: ClaimStatus;
  submissionDate: string;
  approvedAmount?: number;
  insurerComments?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'insurer';
}