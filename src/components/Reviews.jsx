/**
 * REVIEWS — editorial proof composition.
 *
 * ---------------------------------------------------------------------------
 * IMPORTANT: this section renders VERIFIED CUSTOMER REVIEWS ONLY.
 *
 * The prototype shipped with invented testimonials — fabricated names and
 * quotes — purely to prove the composition. Those have been deleted from the
 * dictionaries and the section is no longer mounted. A "sample content" label
 * on top of fabricated quotes would not have made them honest, and presenting
 * invented testimonials as genuine is not acceptable in a customer-facing
 * experience.
 *
 * The composition itself is preserved here, unchanged, so real reviews drop
 * straight in with no design work. Expected shape:
 *
 *   <Reviews
 *     reviews={{
 *       lead: { quote, name, context, facet },
 *       support: [{ quote, name, context, facet }, ...],
 *       facetsTitle: 'What travelers actually talk about',
 *       facets: ['Hotel quality', ...],
 *     }}
 *   />
 *
 * With no `reviews` prop it renders nothing, and the page flows from the
 * presence statement straight into the final CTA. The `#reviews` anchor and
 * its navigation entries are removed for the same reason — see App.jsx,
 * Header.jsx, MobileMenu.jsx and Footer.jsx.
 * ---------------------------------------------------------------------------
 */
export default function Reviews({ reviews }) {
  if (!reviews?.lead) return null

  return (
    <section className="section tone-paper" id="reviews" aria-label="Reviews">
      <div className="container section__inner">
        <div className="grid reviews__lead">
          <blockquote className="review review--lead">
            <p className="review__quote" data-anim="up">
              “{reviews.lead.quote}”
            </p>
            <footer className="review__attr">
              <span className="review__name">{reviews.lead.name}</span>
              <span className="review__context">{reviews.lead.context}</span>
              {reviews.lead.facet ? (
                <span className="review__facet">{reviews.lead.facet}</span>
              ) : null}
            </footer>
          </blockquote>

          {reviews.facets?.length ? (
            <aside className="reviews__facets">
              <h3 className="t-meta">{reviews.facetsTitle}</h3>
              <ul className="facets">
                {reviews.facets.map((facet, i) => (
                  <li className="facet" key={i}>
                    <span className="facet__idx num">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {facet}
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>

        {reviews.support?.length ? (
          <ul className="reviews__support">
            {reviews.support.map((review, i) => (
              <li key={i}>
                <blockquote className="review" data-anim="up">
                  <p className="review__quote review__quote--sm">
                    “{review.quote}”
                  </p>
                  <footer className="review__attr">
                    <span className="review__name">{review.name}</span>
                    <span className="review__context">{review.context}</span>
                  </footer>
                  {review.facet ? (
                    <span className="review__facet">{review.facet}</span>
                  ) : null}
                </blockquote>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}
