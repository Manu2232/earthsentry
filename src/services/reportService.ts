
import { Report, CreateReportInput } from '../types/report';

// Mock data for reports
const mockReports: Report[] = [
  {
    id: '1',
    title: 'Illegal Mining Operation in Tarkwa',
    description: 'Observed heavy machinery and several workers mining in a protected area near the river.',
    location: {
      latitude: 5.3047,
      longitude: -1.9932,
      name: 'Tarkwa, Western Region'
    },
    images: ['/src/assets/mining-image.jpg'],
    status: 'investigating',
    createdAt: '2023-07-15T10:30:00Z',
    updatedAt: '2023-07-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'River Pollution in Obuasi',
    description: 'Water has turned muddy brown due to suspected illegal mining activities upstream.',
    location: {
      latitude: 6.2025,
      longitude: -1.6642,
      name: 'Obuasi, Ashanti Region'
    },
    images: ['/src/assets/mining-image.jpg'],
    status: 'pending',
    createdAt: '2023-07-22T14:15:00Z',
    updatedAt: '2023-07-22T14:15:00Z'
  },
  {
    id: '3',
    title: 'Deforestation for Mining in Kyebi',
    description: 'Large area of forest being cleared for suspected illegal gold mining.',
    location: {
      latitude: 6.1667,
      longitude: -0.5500,
      name: 'Kyebi, Eastern Region'
    },
    images: ['/src/assets/mining-image.jpg'],
    status: 'resolved',
    createdAt: '2023-06-05T09:20:00Z',
    updatedAt: '2023-07-01T11:45:00Z'
  }
];

// In-memory storage for our reports (would be replaced with a backend API)
let reports = [...mockReports];

// Get all reports
export const getAllReports = (): Promise<Report[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(reports);
    }, 500); // Simulate network delay
  });
};

// Get a single report by ID
export const getReportById = (id: string): Promise<Report | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const report = reports.find(r => r.id === id);
      resolve(report);
    }, 300);
  });
};

// Create a new report
export const createReport = (reportData: CreateReportInput): Promise<Report> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, images would be uploaded to storage and URLs would be returned
      const imageUrls = reportData.images.map(() => '/src/assets/mining-image.jpg');
      
      const newReport: Report = {
        id: `${Date.now()}`,
        title: reportData.title,
        description: reportData.description,
        location: reportData.location,
        images: imageUrls,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      reports = [newReport, ...reports];
      resolve(newReport);
    }, 800);
  });
};

// Update report status
export const updateReportStatus = (id: string, status: Report['status']): Promise<Report | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      reports = reports.map(report => {
        if (report.id === id) {
          return {
            ...report,
            status,
            updatedAt: new Date().toISOString()
          };
        }
        return report;
      });
      
      const updatedReport = reports.find(r => r.id === id);
      resolve(updatedReport);
    }, 500);
  });
};
