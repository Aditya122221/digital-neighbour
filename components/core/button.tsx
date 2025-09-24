import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CustomButtonProps {
  text: string;
  href?: string;
  className?: string;
  onClick?: () => void;
  textColor?: 'white' | 'black';
  borderColor?: 'white' | 'black';
}

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={cn("size-6", className)}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
    />
  </svg>
);

export const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  href,
  className,
  onClick,
  textColor = 'black',
  borderColor = 'white',
}) => {
  const buttonContent = (
    <div className={cn(
      "group relative overflow-hidden rounded-full border bg-transparent px-6 py-3 transition-all duration-300 ease-out hover:bg-yellow",
      borderColor === 'white' ? 'border-white' : 'border-black'
    )}>
      {/* Background transition effect */}
      <div className="absolute inset-0 bg-yellow transition-transform duration-300 ease-out group-hover:translate-y-0 translate-y-full" />
      
      {/* Content */}
      <div className={cn("relative flex items-center gap-3", textColor === 'white' ? 'text-white' : 'text-black')}>
        <span className="font-light text-lg group-hover:text-black">{text}</span>
        
        {/* Arrow circle */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow transition-colors duration-300 group-hover:bg-black">
          <ArrowIcon className="text-black transition-colors duration-300 group-hover:text-yellow" />
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className={cn('inline-block', className)}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn('inline-block', className)}
      type="button"
    >
      {buttonContent}
    </button>
  );
};

export default CustomButton;
