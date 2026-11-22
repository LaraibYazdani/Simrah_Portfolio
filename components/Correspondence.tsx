import { site } from "@/content/site";
import { CopyEmail } from "./CopyEmail";

export function Correspondence() {
  return (
    <section className="correspond" id="contact" aria-labelledby="contact-title">
      <div>
        <span className="kicker">Correspondence</span>
        <h2 className="display correspond__title" id="contact-title">
          Let’s work <em>together.</em>
        </h2>
        <p>{site.availability}</p>
      </div>
      <div className="correspond__actions">
        <a className="btn btn--accent" href={`mailto:${site.email}`}>
          <span className="btn__label">{site.email}</span>
          <span className="btn__note" aria-hidden="true">
            Write →
          </span>
        </a>
        <CopyEmail email={site.email} />
        <a className="btn" href={site.linkedin} target="_blank" rel="noopener noreferrer">
          <span className="btn__label">LinkedIn</span>
          <span className="btn__note" aria-hidden="true">
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}
