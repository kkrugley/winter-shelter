interface StepCardProps {
  n: number;
  title: string;
  desc: string;
}

export function StepCard({ n, title, desc }: StepCardProps) {
  return (
    <div className="border border-border-soft rounded-xl p-5">
      <div className="flex items-center gap-3 mb-2">
        <span className="shrink-0 w-8 h-8 rounded-full border-2 border-accent text-accent font-mono text-sm flex items-center justify-center font-medium">
          {n}
        </span>
        <h4 className="text-base font-bold text-ink font-sans truncate">{title}</h4>
      </div>
      <p className="text-xs text-ink-muted">{desc}</p>
    </div>
  );
}
