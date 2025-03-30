
export type ReportStatus = 'pending' | 'investigating' | 'resolved' | 'dismissed';

export type ReportLocation = {
  latitude: number;
  longitude: number;
  name: string;
};

export interface Report {
  id: string;
  title: string;
  description: string;
  location: ReportLocation | null;
  images: string[] | null;
  status: ReportStatus;
  createdAt: string;
  userId?: string | null;
}
