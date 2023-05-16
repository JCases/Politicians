export interface ResponseAPI<T> {
  ok: true;
  data?: T;
  message: string;
}

export interface StatisticsAverage {
  value: number;
}

export interface Statistics {
  medianSalary: StatisticsAverage;
  topSalary: Politicians[];
}

export interface Politicians {
  id?: string;
  name: string;
  group: string;
  groupFilter: string;
  gender: string;
  positionFilter: string;
  position: string;
  institution: string;
  ccaa: string;
  baseSalary: number;
  complementarySalary: number;
  extraSalary: number;
  subsistenceSalary: number;
  threeYearSalary: number;
  monthlySalary: number;
  annualSalary: number;
  notes: string;
}
