export class Politician {
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

export interface PoliticianCSV {
  NOMBRE: string;
  PARTIDO: string;
  PARTIDO_PARA_FILTRO: string;
  GENERO: string;
  CARGO_PARA_FILTRO: string;
  CARGO: string;
  INSTITUCION: string;
  CCAA: string;
  SUELDOBASE_SUELDO: string;
  COMPLEMENTOS_SUELDO: string;
  PAGASEXTRA_SUELDO: string;
  OTRASDIETASEINDEMNIZACIONES_SUELDO: string;
  TRIENIOS_SUELDO: string;
  RETRIBUCIONMENSUAL: string;
  RETRIBUCIONANUAL: string;
  OBSERVACIONES: string;
}
