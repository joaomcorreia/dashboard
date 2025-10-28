'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AVAILABLE_EFFECTS, getEffectsByCategory, getAllCategories } from '@/lib/effects';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageEffect } from '@/types/pageBuilder';

export default function EffectsShowcase() {
  const t = useTranslations('admin');
  const [selectedCategory, setSelectedCategory] = useState<string>('entrance');
  const [selectedEffect, setSelectedEffect] = useState<PageEffect | null>(null);
  const [isPreviewActive, setIsPreviewActive] = useState(false);

  const categories = getAllCategories();
  const effectsInCategory = getEffectsByCategory(selectedCategory as PageEffect['category']);

  const triggerEffect = (effectId: string) => {
    setIsPreviewActive(false);
    setTimeout(() => {
      setIsPreviewActive(true);
      setTimeout(() => setIsPreviewActive(false), 2000);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Effects Showcase
          </h1>
          <p className="text-gray-600">
            Preview and test all available effects for your website sections
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                    selectedCategory === category
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {category} Effects
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Effects List */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {effectsInCategory.map((effect) => (
                <Card key={effect.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {effect.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {effect.description}
                      </p>
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {effect.category}
                      </span>
                    </div>
                  </div>

                  {/* Effect Preview Area */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-4 flex items-center justify-center min-h-[120px]">
                    <div
                      className={`w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold transition-all duration-500 ${
                        isPreviewActive && selectedEffect?.id === effect.id
                          ? getEffectClasses(effect.id)
                          : ''
                      }`}
                    >
                      FX
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex space-x-3">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setSelectedEffect(effect);
                        triggerEffect(effect.id);
                      }}
                      className="flex-1"
                    >
                      Preview
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedEffect(effect)}
                      className="flex-1"
                    >
                      Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Effect Details Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="p-6">
                {selectedEffect ? (
                  <>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {selectedEffect.name}
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <p className="text-sm text-gray-600">
                          {selectedEffect.description}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full capitalize">
                          {selectedEffect.category}
                        </span>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Component
                        </label>
                        <code className="block text-sm bg-gray-100 p-2 rounded">
                          {selectedEffect.component}
                        </code>
                      </div>

                      {selectedEffect.props && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Properties
                          </label>
                          <div className="space-y-2">
                            {Object.entries(selectedEffect.props).map(([key, value]) => (
                              <div key={key} className="flex justify-between py-1">
                                <span className="text-sm text-gray-600">{key}:</span>
                                <span className="text-sm font-mono text-gray-900">
                                  {typeof value === 'string' ? `"${value}"` : String(value)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-4 border-t border-gray-200">
                        <Button 
                          variant="primary" 
                          className="w-full"
                          onClick={() => triggerEffect(selectedEffect.id)}
                        >
                          Test Effect
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Select an Effect
                    </h3>
                    <p className="text-gray-600">
                      Choose an effect from the list to see its details and properties
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get CSS classes for effects
function getEffectClasses(effectId: string): string {
  const effectMap: Record<string, string> = {
    fadeIn: 'animate-pulse opacity-100',
    fadeInUp: 'transform -translate-y-2 opacity-100',
    fadeInDown: 'transform translate-y-2 opacity-100',
    slideInLeft: 'transform -translate-x-4 opacity-100',
    slideInRight: 'transform translate-x-4 opacity-100',
    zoomIn: 'transform scale-110 opacity-100',
    zoomOut: 'transform scale-90 opacity-100',
    bounceIn: 'animate-bounce opacity-100',
    rotateIn: 'transform rotate-12 opacity-100',
    flipInX: 'transform rotateX-12 opacity-100',
    hoverScale: 'transform scale-110',
    hoverGlow: 'shadow-lg shadow-blue-500/50',
    hoverTilt: 'transform rotate-3',
    float: 'animate-bounce',
    pulse: 'animate-pulse',
    rotate: 'animate-spin',
    swing: 'transform rotate-3'
  };

  return effectMap[effectId] || 'transform scale-105';
}