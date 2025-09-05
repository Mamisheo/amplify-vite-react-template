const ChoreIcon = ({ className = "w-20 h-20" }) => {
  return (
    <svg 
      width="80" 
      height="80" 
      viewBox="0 0 100 100" 
      className={className}
    >
      {/* House shape */}
      <path 
        d="M20 80 L20 45 L50 20 L80 45 L80 80 Z" 
        fill="var(--primary-color)" 
        stroke="var(--text-primary)" 
        strokeWidth="2"
      />
      {/* Roof */}
      <path 
        d="M15 45 L50 15 L85 45" 
        fill="none" 
        stroke="var(--accent-color)" 
        strokeWidth="3" 
        strokeLinecap="round"
      />
      {/* Door */}
      <rect 
        x="42" 
        y="60" 
        width="16" 
        height="20" 
        fill="var(--accent-color)" 
        rx="2"
      />
      {/* Windows */}
      <rect 
        x="28" 
        y="50" 
        width="12" 
        height="12" 
        fill="var(--secondary-color)" 
        stroke="var(--text-primary)" 
        strokeWidth="1"
      />
      <rect 
        x="60" 
        y="50" 
        width="12" 
        height="12" 
        fill="var(--secondary-color)" 
        stroke="var(--text-primary)" 
        strokeWidth="1"
      />
      {/* Window crosses */}
      <line x1="34" y1="50" x2="34" y2="62" stroke="var(--text-primary)" strokeWidth="1"/>
      <line x1="28" y1="56" x2="40" y2="56" stroke="var(--text-primary)" strokeWidth="1"/>
      <line x1="66" y1="50" x2="66" y2="62" stroke="var(--text-primary)" strokeWidth="1"/>
      <line x1="60" y1="56" x2="72" y2="56" stroke="var(--text-primary)" strokeWidth="1"/>
      {/* Checkmark overlay */}
      <circle cx="75" cy="35" r="12" fill="var(--accent-color)"/>
      <path 
        d="M70 35 L73 38 L80 31" 
        fill="none" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ChoreIcon;