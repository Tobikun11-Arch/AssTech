import { create } from 'zustand';

interface HowToStartProps {
    careerStack: string;
    field: string;
    specialization: string;
    time: string;
    challengeDays: string;
    setCareerStack: (careerStack: string) => void;
    setField: (field: string) => void;
    setSpecialization: (specialization: string) => void;
    setTime: (time: string) => void;
    setChallengeDays: (challengeDays: string) => void;
}

export const useHowToStart = create<HowToStartProps>((set) => ({
    careerStack: 'Developer Track',
    field: '',
    specialization: '',
    time: '',
    challengeDays: '',
    setCareerStack: (careerStack) => set({ careerStack }),
    setField: (field) => set({ field }),
    setSpecialization: (specialization) => set({ specialization }),
    setTime: (time) => set({ time }),
    setChallengeDays: (challengeDays) => set({ challengeDays }),
}));
