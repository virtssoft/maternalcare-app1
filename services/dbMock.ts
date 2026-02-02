
import { Patient, CpnVisit, Referral, Partograph, PartographObservation } from '../types';

const STORAGE_KEYS = {
  PATIENTS: 'maternalcare_patients_v1',
  PARTOGRAMS: 'maternalcare_partograms_v1',
  REFERRALS: 'maternalcare_referrals_v1',
};

export const db = {
  patients: {
    getAll: async (): Promise<Patient[]> => {
      await new Promise(r => setTimeout(r, 200));
      const data = localStorage.getItem(STORAGE_KEYS.PATIENTS);
      return data ? JSON.parse(data) : [];
    },
    
    getById: async (id: string): Promise<Patient | null> => {
      const all = await db.patients.getAll();
      return all.find(p => p.id === id) || null;
    },

    save: async (patient: Patient): Promise<void> => {
      const all = await db.patients.getAll();
      const index = all.findIndex(p => p.id === patient.id);
      const now = new Date().toISOString();
      
      if (index > -1) {
        all[index] = { ...patient, updatedAt: now };
      } else {
        all.push({ ...patient, createdAt: now, updatedAt: now });
      }
      localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(all));
    }
  },

  partograms: {
    getActive: async (): Promise<Partograph[]> => {
      const data = localStorage.getItem(STORAGE_KEYS.PARTOGRAMS);
      const all: Partograph[] = data ? JSON.parse(data) : [];
      return all.filter(p => p.status === 'ACTIVE');
    },
    save: async (partograph: Partograph): Promise<void> => {
      const data = localStorage.getItem(STORAGE_KEYS.PARTOGRAMS);
      const all: Partograph[] = data ? JSON.parse(data) : [];
      const index = all.findIndex(p => p.id === partograph.id);
      if (index > -1) all[index] = partograph;
      else all.push(partograph);
      localStorage.setItem(STORAGE_KEYS.PARTOGRAMS, JSON.stringify(all));
    }
  },

  referrals: {
    getAll: async (): Promise<Referral[]> => {
      const data = localStorage.getItem(STORAGE_KEYS.REFERRALS);
      return data ? JSON.parse(data) : [];
    },
    create: async (referral: Omit<Referral, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
      const all = await db.referrals.getAll();
      const id = `REF-${Math.floor(Math.random() * 10000)}`;
      const newRef: Referral = { ...referral, id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      all.push(newRef);
      localStorage.setItem(STORAGE_KEYS.REFERRALS, JSON.stringify(all));
      return id;
    }
  }
};
