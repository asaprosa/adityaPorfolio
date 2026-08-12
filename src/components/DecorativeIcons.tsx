type IconProps = { className?: string };

const SPARKLE_PATH = "M24 2c1.5 9 4 15 12 18-8 3-10.5 9-12 18-1.5-9-4-15-12-18 8-3 10.5-9 12-18Z";
const BOLT_PATH = "M20 2 4 28h9l-3 18 18-26h-9l3-18Z";

/** Glitch/chromatic-aberration edge effect: offset magenta + cyan copies behind the solid ink shape. */
export function SparkleIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path d={SPARKLE_PATH} fill="#c084fc" transform="translate(-1.5, -1.5)" opacity="0.7" />
      <path d={SPARKLE_PATH} fill="#67e8f9" transform="translate(1.5, 1.5)" opacity="0.7" />
      <path d={SPARKLE_PATH} fill="#111111" />
    </svg>
  );
}

export function BoltIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 48" fill="none" className={className} aria-hidden>
      <path d={BOLT_PATH} fill="#c084fc" transform="translate(-1.5, -1.5)" opacity="0.7" />
      <path d={BOLT_PATH} fill="#67e8f9" transform="translate(1.5, 1.5)" opacity="0.7" />
      <path d={BOLT_PATH} fill="#111111" />
    </svg>
  );
}
