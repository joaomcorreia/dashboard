import 'bootstrap/dist/css/bootstrap.min.css';

export type CtaBarProps = {
  text: string;
  cta?: { label: string; href: string };
};

export default function CtaBar({ text, cta }: CtaBarProps){
  return (
    <section className="py-4" style={{ background: 'var(--brand-accent)' }}>
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
        <div className="fw-semibold">{text}</div>
        {cta && <a className="btn btn-primary" href={cta.href}>{cta.label}</a>}
      </div>
    </section>
  );
}