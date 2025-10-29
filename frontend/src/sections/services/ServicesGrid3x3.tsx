import 'bootstrap/dist/css/bootstrap.min.css';

export type ServiceItem = { icon?: string; label: string; description?: string; };
export type ServicesProps = {
  title?: string;
  items: ServiceItem[]; // up to 9
};

export default function ServicesGrid3x3({ title, items }: ServicesProps){
  const nine = items.slice(0, 9);
  return (
    <section className="section-pad bg-body">
      <div className="container">
        {title && <h2 className="h3 fw-semibold text-primary mb-4">{title}</h2>}
        <div className="row g-3">
          {nine.map((it, i) => (
            <div className="col-12 col-sm-6 col-lg-4" key={i}>
              <div className="border rounded-3 p-3 h-100">
                {it.icon && <div className="mb-2"><i className={it.icon} /></div>}
                <div className="fw-semibold">{it.label}</div>
                {it.description && <div className="text-muted small">{it.description}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}