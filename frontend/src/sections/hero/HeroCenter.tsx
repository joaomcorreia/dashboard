import 'bootstrap/dist/css/bootstrap.min.css';

export type HeroCenterProps = {
  title: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
};

export default function HeroCenter({ title, subtitle, primaryCta }: HeroCenterProps){
  return (
    <section className="section-pad bg-body text-center">
      <div className="container">
        <h1 className="display-5 fw-bold text-primary">{title}</h1>
        {subtitle && <p className="lead mx-auto" style={{maxWidth: 720}}>{subtitle}</p>}
        {primaryCta && (
          <a className="btn btn-primary btn-lg mt-2" href={primaryCta.href}>
            {primaryCta.label}
          </a>
        )}
      </div>
    </section>
  );
}