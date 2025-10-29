'use client';

import { useState } from 'react';
import { Monitor, Tablet, Smartphone } from 'lucide-react';

interface DeviceViewSwitcherProps {
  children: React.ReactNode;
}

type DeviceType = 'desktop' | 'tablet' | 'mobile';

export function DeviceViewSwitcher({ children }: DeviceViewSwitcherProps) {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>('desktop');

  const devices = [
    { 
      type: 'desktop' as DeviceType, 
      icon: Monitor, 
      label: 'Desktop',
      width: '100%',
      maxWidth: 'none',
      height: '100%'
    },
    { 
      type: 'tablet' as DeviceType, 
      icon: Tablet, 
      label: 'Tablet',
      width: '768px',
      maxWidth: '768px',
      height: '100%'
    },
    { 
      type: 'mobile' as DeviceType, 
      icon: Smartphone, 
      label: 'Mobile',
      width: '375px',
      maxWidth: '375px',
      height: '100%'
    }
  ];

  const currentDevice = devices.find(d => d.type === selectedDevice) || devices[0];

  return (
    <div className="flex flex-col h-full">
      {/* Device Switcher Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Website Preview</h3>
          
          {/* Device Toggle Buttons */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            {devices.map((device) => {
              const IconComponent = device.icon;
              return (
                <button
                  key={device.type}
                  onClick={() => setSelectedDevice(device.type)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    selectedDevice === device.type
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  title={`${device.label} View`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{device.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Device Info */}
        <div className="mt-2 text-xs text-gray-500">
          {currentDevice.type === 'desktop' && 'Full desktop experience'}
          {currentDevice.type === 'tablet' && 'Tablet view (768px width)'}
          {currentDevice.type === 'mobile' && 'Mobile view (375px width)'}
        </div>
      </div>

      {/* Preview Container */}
      <div className="flex-1 bg-gray-100 p-4 overflow-auto">
        <div className="h-full flex items-start justify-center">
          <div
            className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
              selectedDevice === 'desktop' 
                ? 'w-full h-full' 
                : 'h-full border'
            }`}
            style={{
              width: currentDevice.width,
              maxWidth: currentDevice.maxWidth,
              minHeight: selectedDevice === 'mobile' ? '667px' : 'auto'
            }}
          >
            {/* Device Frame for Tablet/Mobile */}
            {selectedDevice !== 'desktop' && (
              <div className="bg-gray-800 h-8 flex items-center justify-center rounded-t-lg">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-white text-xs ml-4">
                  {currentDevice.label} Preview
                </div>
              </div>
            )}
            
            {/* Content Area */}
            <div 
              className="overflow-auto"
              style={{ 
                height: selectedDevice === 'desktop' 
                  ? '100%' 
                  : selectedDevice === 'mobile' 
                    ? '635px'  // Mobile height minus header
                    : 'calc(100% - 32px)'  // Tablet height minus header
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}