import React, { useMemo } from 'react';

const ALL_EXAMPLE_PROMPTS = [
  // Web Applications
  { text: 'Build a social media dashboard with dark mode toggle', category: 'web' },
  { text: 'Create a cryptocurrency portfolio tracker with live prices', category: 'web' },
  { text: 'Build a collaborative whiteboard app with real-time updates', category: 'web' },
  { text: 'Make a recipe finder with ingredient-based search', category: 'web' },
  { text: 'Build a todo app in React using Tailwind', category: 'web' },
  { text: 'Create a weather app with animated backgrounds', category: 'web' },
  { text: 'Build a simple blog using Astro', category: 'web' },
  { text: 'Make a job board with filtering and search', category: 'web' },
  { text: 'Create a event calendar with drag-and-drop', category: 'web' },
  { text: 'Build a photo gallery with lightbox effects', category: 'web' },

  // Creative & Design
  { text: 'Create a pixel art editor with color palette tools', category: 'creative' },
  { text: 'Build a music visualizer that responds to audio', category: 'creative' },
  { text: 'Make a random quote generator with beautiful typography', category: 'creative' },
  { text: 'Create a CSS art gallery with hover animations', category: 'creative' },
  { text: 'Build a digital business card with social links', category: 'creative' },
  { text: 'Make a portfolio website with smooth scrolling', category: 'creative' },
  { text: 'Create a logo maker with customizable icons', category: 'creative' },
  { text: 'Build a gradient generator with export options', category: 'creative' },

  // Productivity & Tools
  { text: 'Build a pomodoro timer with task tracking', category: 'tools' },
  { text: 'Create a markdown editor with live preview', category: 'tools' },
  { text: 'Make a color palette generator for designers', category: 'tools' },
  { text: 'Build a QR code generator with custom styling', category: 'tools' },
  { text: 'Create a password generator with strength indicator', category: 'tools' },
  { text: 'Make a unit converter with multiple categories', category: 'tools' },
  { text: 'Build a text summarizer with copy functionality', category: 'tools' },
  { text: 'Create a invoice generator with PDF export', category: 'tools' },
  { text: 'Make a habit tracker with streak counters', category: 'tools' },
  { text: 'Build a time zone converter with world map', category: 'tools' },

  // Games & Interactive
  { text: 'Create a memory card matching game', category: 'games' },
  { text: 'Build a simple 2D platformer game', category: 'games' },
  { text: 'Make a typing speed test with themes', category: 'games' },
  { text: 'Create a quiz app with multiple choice questions', category: 'games' },
  { text: 'Make a space invaders game', category: 'games' },
  { text: 'Build a Tic Tac Toe game with AI opponent', category: 'games' },
  { text: 'Create a word guessing game with hints', category: 'games' },
  { text: 'Make a snake game with high scores', category: 'games' },
  { text: 'Build a puzzle slider game with images', category: 'games' },
  { text: 'Create a rock paper scissors tournament', category: 'games' },

  // Data & Charts
  { text: 'Build an expense tracker with chart visualizations', category: 'data' },
  { text: 'Create a habit tracker with progress analytics', category: 'data' },
  { text: 'Make a data visualization dashboard', category: 'data' },
  { text: 'Build a simple inventory management system', category: 'data' },
  { text: 'Create a fitness tracker with workout logs', category: 'data' },
  { text: 'Make a budget planner with spending insights', category: 'data' },
  { text: 'Build a reading list with progress tracking', category: 'data' },
  { text: 'Create a meal planner with nutritional info', category: 'data' },

  // E-commerce & Business
  { text: 'Build a product showcase with shopping cart', category: 'ecommerce' },
  { text: 'Create a restaurant menu with online ordering', category: 'ecommerce' },
  { text: 'Make a booking system for appointments', category: 'ecommerce' },
  { text: 'Build a customer feedback form with ratings', category: 'ecommerce' },
  { text: 'Create a loyalty points tracker for customers', category: 'ecommerce' },
  { text: 'Make a subscription management dashboard', category: 'ecommerce' },

  // Communication & Social
  { text: 'Build a chat application with emoji support', category: 'social' },
  { text: 'Create a comment system with threaded replies', category: 'social' },
  { text: 'Make a contact form with validation', category: 'social' },
  { text: 'Build a survey builder with result analytics', category: 'social' },
  { text: 'Create a testimonial showcase with carousel', category: 'social' },
  { text: 'Make a newsletter signup with confirmation', category: 'social' },

  // Educational
  { text: 'Build a flashcard study app with spaced repetition', category: 'education' },
  { text: 'Create a language learning game with vocabulary', category: 'education' },
  { text: 'Make a code playground with syntax highlighting', category: 'education' },
  { text: 'Build a math quiz generator with difficulty levels', category: 'education' },
  { text: 'Create a periodic table with element details', category: 'education' },
  { text: 'Make a typing tutor with lesson progression', category: 'education' },
];

// Function to get random selection of prompts
function getRandomPrompts(prompts: typeof ALL_EXAMPLE_PROMPTS, count: number = 6): typeof ALL_EXAMPLE_PROMPTS {
  const shuffled = [...prompts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function ExamplePrompts(sendMessage?: { (event: React.UIEvent, messageInput?: string): void | undefined }) {
  // Get random selection of prompts on each render/refresh
  const randomPrompts = useMemo(() => getRandomPrompts(ALL_EXAMPLE_PROMPTS, 6), []);

  return (
    <div id="examples" className="relative flex flex-col gap-9 w-full max-w-3xl mx-auto flex justify-center mt-6">
      <div
        className="flex flex-wrap justify-center gap-2"
        style={{
          animation: '.25s ease-out 0s 1 _fade-and-move-in_g2ptj_1 forwards',
        }}
      >
        {randomPrompts.map((examplePrompt, index: number) => {
          return (
            <button
              key={index}
              onClick={(event) => {
                sendMessage?.(event, examplePrompt.text);
              }}
              className="border border-bolt-elements-borderColor rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-900 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary px-3 py-1 text-xs transition-theme"
              title={`Category: ${examplePrompt.category}`}
            >
              {examplePrompt.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
