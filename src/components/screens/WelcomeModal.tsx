import React from 'react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartShopping: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  onClose,
  onStartShopping,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl bg-black/60  overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-2xl bg-card border border-border shadow-2xl overflow-hidden my-auto flex flex-col items-center transition-colors">
        {/* Glow Orbs */}
        <div className="absolute -top-16 -left-16 w-44 h-44 rounded-full bg-primary-container/30 blur-3xl pointer-events-none" />
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-secondary-container/25 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-tertiary-container/10 blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Illustration Area */}
        <div className="relative w-full pt-8 pb-3 px-4 flex flex-col items-center justify-center overflow-hidden">
          <div className="mb-4 z-10 flex items-center justify-center cursor-default select-none pointer-events-none">
            <img
              src="/logo-horizontal.png"
              alt="AfterFood Logo"
              className="h-8 w-auto object-contain mx-auto cursor-default select-none pointer-events-none"
            />
          </div>

          {/* SVG Animated Scooter Scene */}
          <div className="relative w-44 h-32 flex items-center justify-center">
            <svg
              className="w-full h-full drop-shadow-lg"
              fill="none"
              viewBox="0 0 180 140"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="text-[#5a49e3]/25 animate-pulse"
                cx="90"
                cy="75"
                fill="currentColor"
                r="52"
              />
              <circle
                className="text-[#ff7f1c]/15"
                cx="100"
                cy="70"
                fill="currentColor"
                r="38"
              />
              {/* Confetti & stars */}
              <path
                className="text-secondary-container"
                d="M24 35 Q 26 25 32 28 Q 29 38 24 35 Z"
                fill="currentColor"
              />
              <path
                className="text-tertiary"
                d="M155 30 Q 160 20 165 25 Q 160 35 155 30 Z"
                fill="currentColor"
              />
              <path
                className="text-primary"
                d="M18 75 Q 24 77 21 85 Q 14 83 18 75 Z"
                fill="currentColor"
              />
              <path
                className="text-secondary"
                d="M165 82 Q 170 76 175 80 Q 169 89 165 82 Z"
                fill="currentColor"
              />
              <circle className="text-secondary-container" cx="124" cy="22" fill="currentColor" r="2.5" />
              <ellipse className="text-[#0d0e15]/70" cx="94" cy="118" fill="currentColor" rx="54" ry="7" />
              {/* Scooter Wheels */}
              <circle className="text-[#34343c]" cx="58" cy="102" fill="currentColor" r="16" />
              <circle className="text-primary-container" cx="58" cy="102" fill="currentColor" r="11" />
              <circle className="text-primary-fixed" cx="58" cy="102" fill="currentColor" r="4.5" />
              <circle className="text-[#34343c]" cx="132" cy="102" fill="currentColor" r="16" />
              <circle className="text-primary-container" cx="132" cy="102" fill="currentColor" r="11" />
              <circle className="text-primary-fixed" cx="132" cy="102" fill="currentColor" r="4.5" />
              {/* Scooter Chassis & Deck */}
              <path
                className="text-primary-container"
                d="M58 100 L84 100 L96 82 L124 82 L132 100"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="6"
              />
              <rect className="text-[#292931]" fill="currentColor" height="6" rx="3" width="32" x="74" y="96" />
              {/* Scooter Fairing */}
              <path
                className="text-[#5d4cd7]"
                d="M92 94 L82 72 Q 78 62 90 62 L106 62 Q 112 62 116 70 L128 92 Q 130 96 124 96 L96 96 Z"
                fill="currentColor"
              />
              {/* Handlebar & Headlight */}
              <line
                className="text-[#34343c]"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="4.5"
                x1="114"
                x2="124"
                y1="54"
                y2="78"
              />
              <ellipse className="text-[#ff7f1c]" cx="126" cy="62" fill="currentColor" rx="5" ry="6" />
              {/* Delivery Backpack Box */}
              <rect className="text-secondary-container" fill="currentColor" height="32" rx="6" width="28" x="48" y="50" />
              <rect className="text-[#ffdbc8]" fill="currentColor" height="8" rx="3" width="28" x="48" y="50" />
              <path
                className="text-[#0d0e15]"
                d="M59 66 L65 66 M62 63 L62 73"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.8"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pb-6 w-full flex flex-col items-center text-center">
          <h2 className="font-headline-lg text-xl sm:text-2xl text-foreground tracking-tight mb-4 font-bold leading-tight">
            Tus 3 primeros envíos son{' '}
            <span className="text-secondary-container bg-muted px-2 py-0.5 rounded-lg inline-block font-extrabold">
              GRATIS
            </span>
          </h2>

          {/* Ticket Card */}
          <div className="w-full rounded-xl bg-card p-3.5 mb-5 relative flex flex-col items-center text-left overflow-hidden shadow-lg border border-border">
            {/* Notch */}
            <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-background" />
            <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-background" />

            <div className="w-full flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-primary-container/30 flex items-center justify-center text-primary">
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    local_shipping
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-title-md text-foreground font-extrabold">
                    3 ENVÍOS GRATIS
                  </span>
                </div>
              </div>
              <div className="bg-secondary-container/20 rounded-full px-2.5 py-1 flex items-center gap-1">
                <span className="font-label-sm text-secondary font-bold">100% OFF</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => {
              onStartShopping();
              onClose();
            }}
            className="w-full h-13 py-3.5 px-6 rounded-full bg-secondary-container text-on-secondary-container font-label-lg shadow-lg hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-[0_8px_24px_-4px_rgba(255,127,28,0.45)] font-bold text-white"
          >
            <span>¡Empieza a pedir ahora!</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
