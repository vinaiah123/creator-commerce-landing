
import React from 'react';
import { Switch } from '@/components/ui/switch';

interface PlanTabsProps {
  activeTab: 'carte' | 'competitors';
  setActiveTab: (tab: 'carte' | 'competitors') => void;
  isAnnual: boolean;
  setIsAnnual: (isAnnual: boolean) => void;
}

const PlanTabs = ({ activeTab, setActiveTab, isAnnual, setIsAnnual }: PlanTabsProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex border-b border-gray-200">
        <button
          className={`px-6 py-3 font-medium border-b-2 transition-colors ${activeTab === 'carte' ? 'border-carteYellow text-carteYellow' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('carte')}
        >
          Carte Plans
        </button>
        <button
          className={`px-6 py-3 font-medium border-b-2 transition-colors ${activeTab === 'competitors' ? 'border-carteYellow text-carteYellow' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('competitors')}
        >
          Competitor Comparison
        </button>
      </div>
      
      <div className="flex items-center gap-2">
        <span className={`text-sm ${!isAnnual ? 'font-bold' : 'text-gray-500'}`}>Monthly</span>
        <Switch
          checked={isAnnual}
          onCheckedChange={setIsAnnual}
        />
        <span className={`text-sm ${isAnnual ? 'font-bold' : 'text-gray-500'}`}>
          Annual <span className="text-green-600">(Save 30%)</span>
        </span>
      </div>
    </div>
  );
};

export default PlanTabs;
