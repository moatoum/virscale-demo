import { useState, useEffect, useRef } from 'react';
import { classNames } from '~/utils/classNames';
import type { ModelInfo, ProviderInfo } from '~/types/model';
import { chatStore } from '~/lib/stores/chat';

// Mode configuration mapping
const MODE_CONFIG = {
  Turbo: {
    provider: 'Google',
    model: 'gemini-1.5-flash',
    description: 'Light responses',
    icon: 'i-tabler:bolt',
    color: 'text-yellow-500',
    maxTokens: 1024,
  },
  Scale: {
    provider: 'OpenAI',
    model: 'gpt-4o',
    description: 'Medium responses',
    icon: 'i-tabler:scale',
    color: 'text-blue-500',
    maxTokens: 4096,
  },
  Max: {
    provider: 'Anthropic',
    model: 'claude-3-5-sonnet-20241022',
    description: 'Comprehensive responses',
    icon: 'i-tabler:brain',
    color: 'text-purple-500',
    maxTokens: 8192,
  },
} as const;

type ModeType = keyof typeof MODE_CONFIG;

interface ModeSelectorProps {
  model?: string;
  setModel?: (model: string) => void;
  provider?: ProviderInfo;
  setProvider?: (provider: ProviderInfo) => void;
  modelList: ModelInfo[];
  providerList: ProviderInfo[];
  isModelSettingsCollapsed: boolean;
  setIsModelSettingsCollapsed?: (collapsed: boolean) => void;
}

export function ModeSelector({
  model,
  setModel,
  provider,
  setProvider,
  modelList: _modelList,
  providerList,
  isModelSettingsCollapsed,
  setIsModelSettingsCollapsed,
}: ModeSelectorProps) {
  const [selectedMode, setSelectedMode] = useState<ModeType>('Max');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userHasSelectedMode, setUserHasSelectedMode] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize with Max mode (Anthropic) on mount
  useEffect(() => {
    if (setModel && setProvider && providerList.length > 0) {
      const config = MODE_CONFIG.Max;
      const targetProvider = providerList.find((p) => p.name === config.provider);

      if (targetProvider) {
        setProvider(targetProvider);
        setModel(config.model);

        // Set the initial maxTokens in the chat store
        chatStore.setKey('maxTokens', config.maxTokens);
      }
    }
  }, [providerList, setModel, setProvider]);

  // Set initial mode based on current model (only if user hasn't manually selected a mode)
  useEffect(() => {
    if (model && provider && !userHasSelectedMode) {
      const currentMode = Object.entries(MODE_CONFIG).find(
        ([_, config]) => config.provider === provider.name && config.model === model,
      );

      if (currentMode) {
        setSelectedMode(currentMode[0] as ModeType);

        // Also set the maxTokens in the chat store when we detect the mode
        chatStore.setKey('maxTokens', MODE_CONFIG[currentMode[0] as ModeType].maxTokens);
      }
    }
  }, [model, provider, userHasSelectedMode]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleModeChange = (mode: ModeType) => {
    const config = MODE_CONFIG[mode];

    // Mark that user has manually selected a mode
    setUserHasSelectedMode(true);

    // Find the provider
    const targetProvider = providerList.find((p) => p.name === config.provider);

    if (targetProvider && setProvider) {
      setProvider(targetProvider);
    }

    // Set the model name directly
    if (setModel) {
      setModel(config.model);
    }

    // Set the maxTokens in the chat store
    chatStore.setKey('maxTokens', config.maxTokens);

    setSelectedMode(mode);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);

    // If opening the dropdown, also expand the model settings
    if (!isDropdownOpen && setIsModelSettingsCollapsed) {
      setIsModelSettingsCollapsed(false);
    }
  };

  const currentConfig = MODE_CONFIG[selectedMode];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Integrated Mode Button */}
      <button
        className={classNames(
          'flex items-center text-bolt-elements-item-contentDefault bg-transparent enabled:hover:text-bolt-elements-item-contentActive rounded-md p-1 enabled:hover:bg-bolt-elements-item-backgroundActive disabled:cursor-not-allowed focus:outline-none transition-all flex items-center gap-1',
          isDropdownOpen || !isModelSettingsCollapsed
            ? 'bg-bolt-elements-item-backgroundAccent text-bolt-elements-item-contentAccent'
            : '',
        )}
        title="Model Settings"
        onClick={toggleDropdown}
        disabled={!providerList || providerList.length === 0}
      >
        <div className={`i-ph:caret-${isDropdownOpen ? 'down' : 'right'} text-lg transition-transform duration-200`} />
        <span className="text-xs">{selectedMode}</span>
        <span className={`${currentConfig.icon} text-sm`}></span>
      </button>

      {/* Modern Dropdown */}
      {isDropdownOpen && (
        <div className="absolute z-50 mt-2 w-72 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 shadow-xl backdrop-blur-sm top-full left-0">
          <div className="p-3">
            <div className="text-xs font-semibold text-bolt-elements-textPrimary mb-3 flex items-center gap-2">
              <span className="i-tabler:adjustments text-bolt-elements-textSecondary" />
              Select AI Mode
            </div>

            <div className="space-y-2">
              {Object.entries(MODE_CONFIG).map(([mode, config]) => (
                <button
                  key={mode}
                  className={classNames(
                    'w-full px-3 py-3 text-left cursor-pointer transition-all duration-300 rounded-lg group',
                    'hover:bg-bolt-elements-item-backgroundActive hover:scale-[1.01] hover:shadow-sm',
                    'border border-transparent hover:border-bolt-elements-borderColorActive',
                    'focus:outline-none focus:ring-2 focus:ring-bolt-elements-focus',
                    selectedMode === mode
                      ? 'bg-bolt-elements-item-backgroundAccent text-bolt-elements-item-contentAccent border-bolt-elements-borderColorAccent shadow-sm'
                      : 'bg-bolt-elements-background-depth-2 text-bolt-elements-textPrimary',
                  )}
                  onClick={() => handleModeChange(mode as ModeType)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={classNames(
                        'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200',
                        selectedMode === mode
                          ? 'bg-bolt-elements-background-depth-3 text-bolt-elements-item-contentAccent'
                          : 'bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary group-hover:text-bolt-elements-textPrimary',
                      )}
                    >
                      <span className={`${config.icon} text-lg`}></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{mode}</span>
                        {selectedMode === mode && <div className="i-ph:check-circle-fill text-green-500 w-4 h-4" />}
                      </div>
                      <div
                        className={classNames(
                          'text-xs mb-1',
                          selectedMode === mode
                            ? 'text-bolt-elements-item-contentAccent/90'
                            : 'text-bolt-elements-textSecondary group-hover:text-bolt-elements-textPrimary',
                        )}
                      >
                        {config.description}
                      </div>
                      <div
                        className={classNames(
                          'text-xs font-mono',
                          selectedMode === mode
                            ? 'text-bolt-elements-item-contentAccent/70'
                            : 'text-bolt-elements-textTertiary group-hover:text-bolt-elements-textSecondary',
                        )}
                      >
                        {config.provider} • {config.maxTokens} tokens
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-bolt-elements-borderColor">
              <div className="text-xs text-bolt-elements-textTertiary">
                Modes automatically configure provider, model, and token limits for optimal performance.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
