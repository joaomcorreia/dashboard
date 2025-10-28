'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { AdminRoute } from '@/components/auth/ProtectedRoute';
import { Navigation } from '@/components/ui/Navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface PricingPlan {
  id: string;
  title: string;
  description: string;
  price: string;
  period: 'monthly' | 'yearly' | 'one-time';
  features: string[];
  highlighted: boolean;
  buttonText: string;
  buttonLink: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function PricingManager() {
  const t = useTranslations('admin');
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Partial<PricingPlan>>({});

  // Initialize with default Hostinger KVM2-based plans
  useEffect(() => {
    const defaultPlans: PricingPlan[] = [
      {
        id: 'basic-plan',
        title: 'Basic KVM',
        description: 'Perfect for small websites and personal projects',
        price: '$9.99',
        period: 'monthly',
        features: [
          '1 vCPU Core',
          '2GB RAM',
          '40GB NVMe SSD',
          '1TB Bandwidth',
          '1 Domain',
          'Free SSL Certificate',
          'Weekly Backups',
          'Basic Support',
          '99.9% Uptime Guarantee'
        ],
        highlighted: false,
        buttonText: 'Get Started',
        buttonLink: '#contact',
        order: 1,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'pro-plan',
        title: 'Pro KVM',
        description: 'Most popular - ideal for growing businesses',
        price: '$19.99',
        period: 'monthly',
        features: [
          '2 vCPU Cores',
          '4GB RAM',
          '80GB NVMe SSD',
          '2TB Bandwidth',
          '5 Domains',
          'Free SSL Certificate',
          'Daily Backups',
          'Priority Support',
          '99.9% Uptime Guarantee',
          'Free Domain for 1 Year',
          'Email Hosting Included'
        ],
        highlighted: true,
        buttonText: 'Start Free Trial',
        buttonLink: '#contact',
        order: 2,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'enterprise-plan',
        title: 'Enterprise KVM',
        description: 'Maximum performance for high-traffic sites',
        price: '$49.99',
        period: 'monthly',
        features: [
          '4 vCPU Cores',
          '8GB RAM',
          '160GB NVMe SSD',
          '4TB Bandwidth',
          'Unlimited Domains',
          'Free SSL Certificate',
          'Real-time Backups',
          'Premium Support',
          '99.9% Uptime Guarantee',
          'Free Domain for 1 Year',
          'Email Hosting Included',
          'Advanced Security',
          'CDN Integration',
          'Staging Environment'
        ],
        highlighted: false,
        buttonText: 'Contact Sales',
        buttonLink: '#contact',
        order: 3,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    setPlans(defaultPlans);
  }, []);

  const createNewPlan = () => {
    const newPlan: Partial<PricingPlan> = {
      title: 'New Plan',
      description: 'Plan description',
      price: '$0.00',
      period: 'monthly',
      features: ['Feature 1', 'Feature 2'],
      highlighted: false,
      buttonText: 'Get Started',
      buttonLink: '#contact',
      isActive: true
    };
    setEditingPlan(newPlan);
    setIsEditing(true);
    setSelectedPlan(null);
  };

  const editPlan = (plan: PricingPlan) => {
    setEditingPlan({ ...plan });
    setSelectedPlan(plan);
    setIsEditing(true);
  };

  const savePlan = () => {
    if (!editingPlan.title || !editingPlan.price) return;

    const now = new Date().toISOString();
    
    if (selectedPlan) {
      // Update existing plan
      setPlans(plans.map(plan =>
        plan.id === selectedPlan.id
          ? { ...plan, ...editingPlan, updatedAt: now }
          : plan
      ));
    } else {
      // Create new plan
      const newPlan: PricingPlan = {
        ...editingPlan as PricingPlan,
        id: `plan-${Date.now()}`,
        order: plans.length + 1,
        createdAt: now,
        updatedAt: now
      };
      setPlans([...plans, newPlan]);
    }

    setIsEditing(false);
    setEditingPlan({});
    setSelectedPlan(null);
  };

  const deletePlan = (planId: string) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      setPlans(plans.filter(plan => plan.id !== planId));
    }
  };

  const togglePlanHighlight = (planId: string) => {
    setPlans(plans.map(plan => ({
      ...plan,
      highlighted: plan.id === planId ? !plan.highlighted : false // Only one can be highlighted
    })));
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...(editingPlan.features || [])];
    newFeatures[index] = value;
    setEditingPlan({ ...editingPlan, features: newFeatures });
  };

  const addFeature = () => {
    const newFeatures = [...(editingPlan.features || []), 'New Feature'];
    setEditingPlan({ ...editingPlan, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    const newFeatures = (editingPlan.features || []).filter((_, i) => i !== index);
    setEditingPlan({ ...editingPlan, features: newFeatures });
  };

  return (
    <AdminRoute>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Pricing Plans Manager
              </h1>
              <p className="text-gray-600">
                Manage your hosting plans and pricing options
              </p>
            </div>
            <Button variant="primary" onClick={createNewPlan}>
              Add New Plan
            </Button>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {plans
              .sort((a, b) => a.order - b.order)
              .map((plan) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  onEdit={() => editPlan(plan)}
                  onDelete={() => deletePlan(plan.id)}
                  onToggleHighlight={() => togglePlanHighlight(plan.id)}
                />
              ))}
          </div>

          {/* Edit Modal */}
          {isEditing && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                      {selectedPlan ? 'Edit Plan' : 'Create New Plan'}
                    </h2>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setEditingPlan({});
                        setSelectedPlan(null);
                      }}
                    >
                      ×
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Plan Title
                        </label>
                        <Input
                          value={editingPlan.title || ''}
                          onChange={(e) => setEditingPlan({
                            ...editingPlan,
                            title: e.target.value
                          })}
                          placeholder="e.g., Pro KVM"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price
                        </label>
                        <Input
                          value={editingPlan.price || ''}
                          onChange={(e) => setEditingPlan({
                            ...editingPlan,
                            price: e.target.value
                          })}
                          placeholder="e.g., $19.99"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <Input
                        value={editingPlan.description || ''}
                        onChange={(e) => setEditingPlan({
                          ...editingPlan,
                          description: e.target.value
                        })}
                        placeholder="Plan description"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Billing Period
                        </label>
                        <select
                          value={editingPlan.period || 'monthly'}
                          onChange={(e) => setEditingPlan({
                            ...editingPlan,
                            period: e.target.value as 'monthly' | 'yearly' | 'one-time'
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="monthly">Monthly</option>
                          <option value="yearly">Yearly</option>
                          <option value="one-time">One-time</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Button Text
                        </label>
                        <Input
                          value={editingPlan.buttonText || ''}
                          onChange={(e) => setEditingPlan({
                            ...editingPlan,
                            buttonText: e.target.value
                          })}
                          placeholder="e.g., Get Started"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={editingPlan.highlighted || false}
                          onChange={(e) => setEditingPlan({
                            ...editingPlan,
                            highlighted: e.target.checked
                          })}
                          className="mr-2"
                        />
                        Popular Plan (Highlighted)
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={editingPlan.isActive !== false}
                          onChange={(e) => setEditingPlan({
                            ...editingPlan,
                            isActive: e.target.checked
                          })}
                          className="mr-2"
                        />
                        Active
                      </label>
                    </div>

                    {/* Features */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Features
                        </label>
                        <Button variant="outline" size="sm" onClick={addFeature}>
                          Add Feature
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {(editingPlan.features || []).map((feature, index) => (
                          <div key={index} className="flex space-x-2">
                            <Input
                              value={feature}
                              onChange={(e) => updateFeature(index, e.target.value)}
                              placeholder="Feature description"
                              className="flex-1"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeFeature(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-3 pt-6 border-t">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          setEditingPlan({});
                          setSelectedPlan(null);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button variant="primary" onClick={savePlan}>
                        {selectedPlan ? 'Update Plan' : 'Create Plan'}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </AdminRoute>
  );
}

// Pricing Card Component
interface PricingCardProps {
  plan: PricingPlan;
  onEdit: () => void;
  onDelete: () => void;
  onToggleHighlight: () => void;
}

function PricingCard({ plan, onEdit, onDelete, onToggleHighlight }: PricingCardProps) {
  return (
    <Card className={`relative p-6 ${plan.highlighted ? 'ring-2 ring-blue-500 shadow-lg' : ''}`}>
      {plan.highlighted && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      {/* Admin Controls */}
      <div className="absolute top-4 right-4 flex space-x-1">
        <button
          onClick={onToggleHighlight}
          className={`p-1 rounded ${
            plan.highlighted ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
          } hover:bg-blue-200`}
          title="Toggle highlight"
        >
          ⭐
        </button>
        <button
          onClick={onEdit}
          className="p-1 rounded bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600"
          title="Edit plan"
        >
          ✏️
        </button>
        <button
          onClick={onDelete}
          className="p-1 rounded bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600"
          title="Delete plan"
        >
          🗑️
        </button>
      </div>

      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {plan.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {plan.description}
        </p>
        <div className="mb-4">
          <span className="text-3xl font-bold text-gray-900">
            {plan.price}
          </span>
          <span className="text-gray-600 ml-1">
            /{plan.period}
          </span>
        </div>
      </div>

      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm">
            <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <Button
        variant={plan.highlighted ? 'primary' : 'outline'}
        className="w-full"
      >
        {plan.buttonText}
      </Button>

      {!plan.isActive && (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center rounded-lg">
          <span className="bg-gray-800 text-white px-3 py-1 rounded text-sm font-medium">
            Inactive
          </span>
        </div>
      )}
    </Card>
  );
}