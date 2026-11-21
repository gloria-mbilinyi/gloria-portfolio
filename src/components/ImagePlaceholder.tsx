import { Code2 } from "lucide-react";

type ImagePlaceholderProps = {
  label: string;
  title: string;
  className?: string;
};

export function ImagePlaceholder({ label, title, className = "" }: ImagePlaceholderProps) {
  return (
    <div className={`image-placeholder ${className}`} role="img" aria-label={label}>
      <div className="placeholder-mark" aria-hidden="true">
        <Code2 size={22} strokeWidth={1.6} />
      </div>
      <div>
        <strong>{title}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}
