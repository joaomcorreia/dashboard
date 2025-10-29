"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";

type Plan = {
  id: string;            // local id
  name: string;
  monthly: string;       // human price e.g. "€19.99"
  annual?: string;       // optional human price
  stripe_price_month?: string; // map to Stripe price id
  stripe_price_year?: string;  // map to Stripe price id
  active: boolean;
  trial_days?: number;
  vat_rate?: number;     // e.g., 21 for NL
  features?: string[];
};

const STARTER_PLANS: Plan[] = [
  { id: "jcw-basic",  name: "Basic",  monthly: "€0.00",    annual: "", active: true,  trial_days: 0,  vat_rate: 0,  features: ["Meta tags", "Up to 10 pages"] },
  { id: "jcw-growth", name: "Growth", monthly: "€29.99",  annual: "€299.00", active: true, trial_days: 14, vat_rate: 21, features: ["SEO essentials","5 locations"] },
  { id: "jcw-prem",   name: "Premium",monthly: "€79.00",  annual: "€790.00", active: true, trial_days: 14, vat_rate: 21, features: ["Full JSON-LD","EU-wide terms","200+ pages"] },
];

export default function PlansTab(){
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(()=>{ setPlans(STARTER_PLANS); }, []);

  function addPlan(){
    setPlans(p => [...p, { id:`plan-${Date.now()}`, name:"New Plan", monthly:"€0.00", active:false } as Plan]);
  }
  function removePlan(id:string){
    setPlans(p => p.filter(x => x.id !== id));
  }
  function update(id:string, patch: Partial<Plan>){
    setPlans(p => p.map(x => x.id===id ? { ...x, ...patch } : x));
  }

  const saveAll = async () => {
    try {
      // TODO: connect to backend later
      // For now, just show mock success
      alert("Plans saved (mock). In production, persist to API and sync Stripe price IDs.");
    } catch (error) {
      console.error('Error saving plans:', error);
      alert("Failed to save plans");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-semibold">Pricing Plans</div>
        <div className="flex gap-3">
          <button 
            className="flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-300 rounded-md hover:bg-blue-100 focus:ring-2 focus:ring-blue-500"
            onClick={addPlan}
          >
            <Plus size={14} className="mr-2" /> Add Plan
          </button>
          <button 
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            onClick={saveAll}
          >
            <Save size={14} className="mr-2" /> Save
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {plans.map(plan => (
          <div className="border border-gray-200 rounded-lg p-4 h-full bg-white" key={plan.id}>
            <div className="flex justify-between items-center mb-4">
              <input 
                className="border border-gray-300 rounded-md px-3 py-2 text-sm font-semibold flex-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                value={plan.name}
                onChange={e=>update(plan.id,{name:e.target.value})}
              />
              <div className="flex items-center ml-3">
                <input 
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" 
                  type="checkbox" 
                  checked={plan.active}
                  onChange={e=>update(plan.id,{active:e.target.checked})}
                />
                <label className="ml-2 text-sm text-gray-700">Active</label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Monthly</label>
                <input 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  value={plan.monthly}
                  onChange={e=>update(plan.id,{monthly:e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Annual</label>
                <input 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  value={plan.annual || ""}
                  onChange={e=>update(plan.id,{annual:e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Stripe Price (Month)</label>
                <input 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="price_123"
                  value={plan.stripe_price_month || ""}
                  onChange={e=>update(plan.id,{stripe_price_month:e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Stripe Price (Year)</label>
                <input 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="price_ABC"
                  value={plan.stripe_price_year || ""}
                  onChange={e=>update(plan.id,{stripe_price_year:e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Trial Days</label>
                <input 
                  type="number" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={plan.trial_days ?? 0}
                  onChange={e=>update(plan.id,{trial_days: parseInt(e.target.value || "0",10)})}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">VAT %</label>
                <input 
                  type="number" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={plan.vat_rate ?? 21}
                  onChange={e=>update(plan.id,{vat_rate: parseFloat(e.target.value || "21")})}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Features (comma separated)</label>
                <input 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={(plan.features || []).join(", ")}
                  onChange={e=>update(plan.id,{features: e.target.value.split(",").map(x=>x.trim()).filter(Boolean)})}
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button 
                className="flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-300 rounded-md hover:bg-red-100 focus:ring-2 focus:ring-red-500"
                onClick={()=>removePlan(plan.id)}
              >
                <Trash2 size={14} className="mr-2" /> Delete
              </button>
            </div>
          </div>
        ))}
        {!plans.length && (
          <div className="col-span-full">
            <div className="text-gray-500 text-sm text-center py-8">No plans yet.</div>
          </div>
        )}
      </div>
    </div>
  );
}