
export type ReportStatus = 'pending' | 'investigating' | 'resolved';

export interface Report {
  id: string;
  title: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    name: string;
  };
  images: string[];
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReportInput {
  title: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    name: string;
  };
  images: File[];
}
