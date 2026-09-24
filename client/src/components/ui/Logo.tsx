export const Logo = ({ className }: { className?: string }) => {
  return (
    <svg className={className} viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <clipPath id="eraser-clip">
        <rect x="2" y="2" width="36" height="20" rx="4" />
      </clipPath>
      <g clipPath="url(#eraser-clip)">
        <rect x="0" y="0" width="20" height="24" className="fill-zinc-700 dark:fill-[#666666]" />
        <rect x="20" y="0" width="20" height="24" className="fill-zinc-200 dark:fill-[#EDEDED]" />
      </g>
      <line x1="20" y1="2" x2="20" y2="22" stroke="currentColor" strokeWidth="2" />
      <rect
        x="2"
        y="2"
        width="36"
        height="20"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
};
