
interface AIIconProps {
  className?: string;
  alt?: string;
  variant?: 'black' | 'white';
}

export function AIIcon({ className = "w-4 h-4", alt = "Assistant IA", variant = "black" }: AIIconProps) {
  const getFilterStyle = () => {
    if (variant === 'white') {
      return { filter: 'brightness(0) invert(1)' };
    }
    return { filter: 'invert(1) brightness(0) saturate(100%) contrast(100%)' };
  };

  return (
    <img 
      src="/lovable-uploads/AI.png" 
      alt={alt} 
      className={className}
      style={getFilterStyle()}
    />
  );
}
