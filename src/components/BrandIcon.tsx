import type { SimpleIcon } from "simple-icons";

type BrandIconProps = {
  icon: SimpleIcon;
  className?: string;
};

export function BrandIcon({ icon, className = "" }: BrandIconProps) {
  return (
    <svg role="img" viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}
