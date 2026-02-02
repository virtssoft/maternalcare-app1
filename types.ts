
export enum Role {
  COMFORT_ASBL = 'COMFORT_ASBL',
  DPS = 'DPS',
  ZONE_DE_SANTE = 'ZONE_DE_SANTE',
  AIRE_DE_SANTE = 'AIRE_DE_SANTE',
  COMMUNAUTE = 'COMMUNAUTE'
}

export enum JobRole {
  ADMIN = 'ADMIN',
  MEDECIN = 'MEDECIN',
  INFIRMIER = 'INFIRMIER',
  SAGE_FEMME = 'SAGE_FEMME'
}

export interface DbMetadata {
  createdAt?: string;
  updatedAt?: string;
  syncedAt?: string;
  dhis2Uid?: string;
}

// --- GESTION ADMINISTRATIVE ---

export interface UserAccount extends DbMetadata {
  id: string;
  phone: string;
  name: string;
  role: Role;
  jobRole?: JobRole;
  structureId?: string;
}

export interface HealthStructure {
  id: string;
  name: string;
  type: 'HGR' | 'CS';
  zoneId: string;
  provinceId: string;
}

export interface ZoneDeSante {
  id: string;
  name: string;
  provinceId: string;
  hgrId: string;
  hgrName?: string;
}

export interface Province {
  id: string;
  name: string;
}

// --- DOSSIER PATIENT ---

export interface EvolutionRecord {
  date: string;
  monthsWeeks: string;
  weight: number;
  bp: string;
  fetalMovements: boolean;
  fetalHeartRate: number;
  presentation: string;
  edema: boolean;
  albuminuria: string;
  glucosuria: string;
}

export interface PreventiveMeasures {
  vatDates: string[];
  spDates: string[];
  ironFolic: boolean;
  mebendazole: boolean;
  itn: boolean;
}

export interface Antecedents extends DbMetadata {
  patientId: string;
  medical: string[]; 
  surgical: string;
  obstetrical: {
    parity: number;
    gravidity: number;
    livingChildren: number;
    abortions: number;
    cSection: boolean;
    dystocia: boolean;
    cerclage?: boolean;
    vacuum?: boolean;
    fracturedPelvis?: boolean;
    eutocia?: boolean;
  };
}

export interface CpnVisit extends DbMetadata {
  id: string;
  patientId: string;
  userId: string; 
  date: string;
  weeks: number;
  weight: number;
  bp: string;
  fetalHeartRate: number;
  presentation: string;
  dangerSigns: string[];
}

// --- URGENCE & TRAVAIL (PARTOGRAMME) ---

export interface PartographObservation extends DbMetadata {
  id: string;
  partographId: string;
  time: string;
  cervicalDilatation: number; // 0-10
  fetalHeartRate: number;
  contractions: number; 
  bloodPressure: string;
  maternalPulse: number;
  temperature: number;
  liquor: 'C' | 'M' | 'B' | 'I'; 
  moulding: number;
}

export interface Partograph extends DbMetadata {
  id: string;
  patientId: string;
  userId: string;
  startTime: string;
  status: 'ACTIVE' | 'CLOSED' | 'REFERRED';
  initialExam: {
    presentation: string;
    position: string;
    station: number;
  };
  observations: PartographObservation[];
  outcome?: {
    deliveryTime: string;
    mode: 'EUTOCIC' | 'C_SECTION' | 'INSTRUMENTAL';
    apgar1: number;
    apgar5: number;
    babyWeight: number;
    gender: 'M' | 'F';
  };
}

export interface Referral extends DbMetadata {
  id: string;
  patientId: string;
  fromStructureId: string;
  toStructureId: string;
  priority: 'ROUTINE' | 'EMERGENCY' | 'VITAL';
  reason: string;
  status: 'PENDING' | 'IN_TRANSIT' | 'RECEIVED' | 'COMPLETED';
}

export interface Patient extends DbMetadata {
  id: string;
  nationalId?: string;
  name: string;
  postname?: string;
  age: number;
  phone: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  structureId?: string;
  dob?: string;
  address?: string;
  civilStatus?: string;
  gestationalAge?: number;
  lastVisit?: string;
  evolution?: EvolutionRecord[];
  preventiveMeasures?: PreventiveMeasures;
  antecedents?: Antecedents;
}
