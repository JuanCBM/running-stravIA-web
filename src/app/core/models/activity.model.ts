export interface Activity {
  name: string;
  description: string | null;
  distance: number;
  duration: number;
  startDate: string;
  endDate: string;
  elevationGain: number;
  type: 'RUN' | 'WALK' | string;
  id: string;
}
