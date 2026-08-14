import { create } from "zustand";
import { apiCall } from "@/lib/apiClient";

export interface PlanData {
  id?: string;
  _id?: string;
  name: string;
  percent: number;
  duration: number;
  min: number;
  max: number;
  referralPercent: number;
  picture?: string;
  benefits: string[];
  description: string;
  createdAt?: string;
}

interface PlanState {
  plans: PlanData[];
  isLoading: boolean;
  error: string | null;

  createPlan: (plan: PlanData) => Promise<{ success: boolean; error?: string }>;
  updatePlan: (id: string, plan: PlanData) => Promise<{ success: boolean; error?: string }>;
  deletePlan: (id: string) => Promise<{ success: boolean; error?: string }>;
  fetchPlans: (force?: boolean) => Promise<void>;
  clearError: () => void;
}

export const usePlanStore = create<PlanState>((set, get) => ({
  plans: [],
  isLoading: false,
  error: null,

  createPlan: async (plan) => {
    set({ isLoading: true, error: null });
    try {
      const res = await apiCall<{ success: boolean; plan: PlanData }>("/api/plans", {
        method: "POST",
        body: plan,
      });

      // Update local state directly or force refetch
      if (res.plan) {
        set((state) => ({
          plans: [...state.plans, res.plan],
          isLoading: false,
          error: null,
        }));
      } else {
        await get().fetchPlans(true);
      }

      set({ isLoading: false, error: null });
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.message || "Failed to create investment plan.";
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  updatePlan: async (id, plan) => {
    set({ isLoading: true, error: null });
    try {
      const res = await apiCall<{ success: boolean; plan: PlanData }>(`/api/plans/${id}`, {
        method: "PATCH",
        body: plan,
      });

      if (res.plan) {
        set((state) => ({
          plans: state.plans.map((p) => ((p.id || p._id) === id ? res.plan : p)),
          isLoading: false,
          error: null,
        }));
      } else {
        await get().fetchPlans(true);
      }

      set({ isLoading: false, error: null });
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.message || "Failed to update investment plan.";
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  deletePlan: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await apiCall(`/api/plans/${id}`, {
        method: "DELETE",
      });

      // Immediately filter out deleted plan from state so UI updates instantly without refresh
      set((state) => ({
        plans: state.plans.filter((p) => (p.id || p._id) !== id),
        isLoading: false,
        error: null,
      }));

      return { success: true };
    } catch (err: any) {
      const errorMessage = err.message || "Failed to delete investment plan.";
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  fetchPlans: async (force = false) => {
    const currentPlans = get().plans;
    if (!force && currentPlans && currentPlans.length > 0) {
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const response = await apiCall<{ success: boolean; plans: PlanData[] }>("/api/plans");
      set({
        plans: response.plans || [],
        isLoading: false,
        error: null,
      });
    } catch (err: any) {
      set({
        isLoading: false,
        error: err.message || "Failed to retrieve plans list.",
      });
    }
  },


  clearError: () => set({ error: null }),
}));
