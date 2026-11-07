/** Éventail Art déco (68 × 34, Ocre 0,8 px, 55 %) : au-dessus du fronton et des titres de page. */
export default function Eventail({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 68 34"
      width="68"
      height="34"
      className={`eventail text-bordure-filet opacity-55 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
    >
      <path d="M34 34H0M34 34L2.6 21M34 34L10 10M34 34L21 2.6M34 34V0M34 34L47 2.6M34 34L58 10M34 34L65.4 21M34 34H68" />
    </svg>
  )
}
