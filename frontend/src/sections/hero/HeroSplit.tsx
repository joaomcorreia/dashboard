import 'bootstrap/dist/css/bootstrap.min.css';

export type HeroProps = {
  title: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  imageUrl?: string;
};

export default function HeroSplit({ title, subtitle, primaryCta, imageUrl }: HeroProps){
  return (
    <section className="section-pad bg-body">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-12 col-lg-6">
            <h1 className="display-5 fw-bold text-primary">{title}</h1>
            {subtitle && <p className="lead">{subtitle}</p>}
            {primaryCta && (
              <a className="btn btn-primary btn-lg mt-2" href={primaryCta.href}>
                {primaryCta.label}
              </a>
            )}
          </div>
          <div className="col-12 col-lg-6 text-center">
            {imageUrl && <img className="img-fluid rounded" src={imageUrl} alt="" />}
          </div>
        </div>
      </div>
    </section>
  );
}