import React from 'react';

interface LogoProps {
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
}

interface LogoSimboloProps extends LogoProps {
  size?: number | string;
}

interface LogoHorizontalProps extends LogoProps {
  height?: number | string;
}

interface LogoCompletoProps extends LogoProps {
  size?: number | string;
  withTagline?: boolean;
}

/**
 * 1. Símbolo / Ícono aislado (Isotipo)
 * Renderizado directamente mediante <img> con la imagen original PNG.
 */
export const LogoSimbolo: React.FC<LogoSimboloProps> = ({
  className = 'w-8 h-8',
  size,
  style,
  alt = 'AfterFood Isotipo',
}) => {
  const customStyle = size ? { width: size, height: size, ...style } : style;
  return (
    <img
      src="/logo-simbolo.png"
      alt={alt}
      className={`object-contain flex-shrink-0 select-none cursor-default pointer-events-none ${className}`}
      style={customStyle}
    />
  );
};

/**
 * 2. Logo Horizontal / Deitado (Nombre + Símbolo compacto)
 * Renderizado directamente mediante <img> con la imagen original PNG.
 */
export const LogoHorizontal: React.FC<LogoHorizontalProps> = ({
  className = 'h-7 sm:h-8',
  height,
  style,
  alt = 'AfterFood Logo',
}) => {
  const customStyle = height ? { height, ...style } : style;
  return (
    <img
      src="/logo-horizontal.png"
      alt={alt}
      className={`w-auto object-contain flex-shrink-0 select-none cursor-default pointer-events-none ${className}`}
      style={customStyle}
    />
  );
};

/**
 * 3. Logo Completo / Principal (Isologotipo)
 * Renderizado directamente mediante <img> con la imagen original PNG.
 */
export const LogoCompleto: React.FC<LogoCompletoProps> = ({
  className = 'w-48 sm:w-56',
  size,
  style,
  alt = 'AfterFood Logo',
  withTagline = true,
}) => {
  const customStyle = size ? { width: size, ...style } : style;
  return (
    <div className="flex flex-col items-center justify-center text-center cursor-default select-none pointer-events-none">
      <img
        src="/logo-completo.png"
        alt={alt}
        className={`h-auto object-contain select-none cursor-default pointer-events-none ${className}`}
        style={customStyle}
      />
      {withTagline && (
        <div className="mt-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e1f27] border border-[#34343c]/80 text-[#c8c4d7] text-[10px] font-extrabold tracking-widest uppercase shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Delivery Trujillo • 24 Horas</span>
        </div>
      )}
    </div>
  );
};

/**
 * 4. Logo Spinner para estados de carga utilizando el Isotipo original
 */
export const LogoSpinner: React.FC<{ size?: number; text?: string }> = ({
  size = 44,
  text,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-4 select-none">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <div className="absolute inset-0 rounded-full border-2 border-[#34343c] border-t-[#FF7A00] border-r-[#7C67FE] animate-spin" />
        <div className="w-3/5 h-3/5 flex items-center justify-center">
          <img src="/logo-simbolo.png" alt="Cargando" className="w-full h-full object-contain" />
        </div>
      </div>
      {text && (
        <span className="text-[11px] font-bold text-[#c8c4d7] tracking-wide animate-pulse">
          {text}
        </span>
      )}
    </div>
  );
};
