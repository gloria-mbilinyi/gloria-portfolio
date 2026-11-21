export function SectionHeading({ title, kicker }: { title: string; kicker?: string }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{kicker ?? "Portfolio"}</p>
        <h2>{title}</h2>
      </div>
      <span className="section-rule" aria-hidden="true" />
    </div>
  );
}
