import { create } from 'zustand'

interface GeneratorProps {
    ideas: string;
    industry: string;
    project_type: string;
    level_type: string;
    add_details: string;

    setIdeas: (ideas: string) => void;
    setIndustry: (industry: string) => void;
    setProjectType: (project_type: string) => void;
    setLevelType: (level_type: string) => void;
    setAddDetails: (add_details: string) => void;
}
  
export const useGenerator = create<GeneratorProps>((set) => ({
    ideas: "",
    industry: "",
    project_type: "",
    level_type: "Easy",
    add_details: "",

    setIdeas: (ideas) => set({ ideas }),
    setIndustry: (industry) => set({ industry }),
    setProjectType: (project_type) => set({ project_type }),
    setLevelType: (level_type) => set({ level_type }),
    setAddDetails: (add_details) => set({ add_details }),
}));