import React, { useEffect, useRef } from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';

const sections = [
  {
    id: 'healthcare',
    icon: 'HeartPulse',
    title: 'Healthcare',
    description: 'Medical misinformation erodes trust in vaccines and treatments, leading to preventable harm and straining healthcare systems.',
    points: [
      'Vaccine myths reduce immunization rates',
      'Unproven cures divert patients from effective care',
      'Panic during outbreaks amplifies system overload',
    ],
    color: 'from-rose-500/10 to-rose-500/0 border-rose-200/50',
    image: '/assets/images/health.jpg',
  },
  {
    id: 'elections',
    icon: 'Vote',
    title: 'Elections',
    description: 'Election-related disinformation undermines democratic participation and confidence in institutions.',
    points: [
      'False claims suppress or misdirect voters',
      'Conspiracy narratives delegitimize outcomes',
      'Coordinated actors manipulate public discourse',
    ],
    color: 'from-sky-500/10 to-sky-500/0 border-sky-200/50',
    image: '/assets/images/election.jpg',
  },
  {
    id: 'economy',
    icon: 'LineChart',
    title: 'Economy',
    description: 'Market rumors and fabricated reports can trigger volatility, affecting households and businesses alike.',
    points: [
      'False scarcity stories drive panic buying',
      'Phishing and scams exploit uncertainty',
      'Brand reputations suffer from fake narratives',
    ],
    color: 'from-emerald-500/10 to-emerald-500/0 border-emerald-200/50',
    image: '/assets/images/economy.jpg',
  },
  {
    id: 'society',
    icon: 'Users',
    title: 'Society & Community',
    description: 'Viral hoaxes intensify polarization and harm vulnerable groups, fracturing social cohesion.',
    points: [
      'Targeted harassment fueled by falsehoods',
      'Amplification of hate and stereotypes',
      'Erosion of shared facts and trust',
    ],
    color: 'from-amber-500/10 to-amber-500/0 border-amber-200/50',
    image: '/assets/images/society.jpg',
  },
];

const useRevealOnScroll = () => {
  const containerRef = useRef(null);
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const elements = Array.from(root.querySelectorAll('.nm-reveal'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return containerRef;
};

const ImpactPage = () => {
  const revealRef = useRevealOnScroll();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-0">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-success/5">
          <div className="absolute inset-0 -z-10">
            <div className="nm-blob nm-blob-animate-slow w-96 h-96 rounded-full bg-primary/20 -top-24 -left-16" />
            <div className="nm-blob nm-blob-animate w-96 h-96 rounded-full bg-accent/20 bottom-0 -right-10" />
          </div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-foreground mb-4 nm-reveal">
              The Real-World Impact of Fake News
            </h1>
            <p
              className="font-body text-lg text-muted-foreground max-w-2xl mx-auto nm-reveal"
              style={{ transitionDelay: '120ms' }}
            >
              Across every sector, misinformation carries consequences. Explore how false narratives disrupt health, democracy, the economy, and community.
            </p>
          </div>
        </section>

        {/* Full-width background CTA (half-page height) */}
        <section className="relative w-full min-h-[50vh] bg-cover bg-center" style={{ backgroundImage: "url(/assets/images/aifakenews.jpg)" }}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center text-center h-full justify-center">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">Verify the Truth</h2>
            <p className="font-body text-white/80 mb-6 max-w-2xl">Cut through misinformation. Check any claim or article and see transparent evidence and credibility signals.</p>
            <a href="/search-query" className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">Start Verifying</a>
          </div>
        </section>

        {/* Impact Sections */}
        <section
          ref={revealRef}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {sections.map((sec, idx) => (
            <div
              key={sec.id}
              className="nm-reveal bg-card border border-border rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ transitionDelay: `${80 + idx * 60}ms` }}
            >
              <div className="w-full h-40 md:h-48 bg-muted overflow-hidden">
                <img
                  src={sec.image}
                  alt={`${sec.title} impact`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/no_image.png';
                  }}
                />
              </div>
              <div className={`bg-gradient-to-b ${sec.color} border-b px-6 py-4`}>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Icon name={sec.icon} size={18} />
                  </div>
                  <h2 className="font-heading text-xl font-semibold text-foreground">
                    {sec.title}
                  </h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <p className="font-body text-muted-foreground">{sec.description}</p>
                <ul className="space-y-2">
                  {sec.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Icon name="CircleCheck" size={16} className="text-success mt-0.5" />
                      <span className="font-body text-foreground">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* CTA Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div
            className="bg-muted/40 border border-border rounded-xl p-6 text-center nm-reveal"
            style={{ transitionDelay: '120ms' }}
          >
            <h3 className="font-heading font-semibold text-foreground mb-2">How Neutral Mirror Helps</h3>
            <p className="font-body text-muted-foreground mb-4">
              We surface consensus, trace sources, and flag manipulations—helping you navigate the noise.
            </p>
            <div className="flex justify-center gap-3">
              <a
                href="/search-query"
                className="px-4 py-2 rounded-md border border-border hover:border-primary/50 transition-colors text-sm"
              >
                Verify a Claim
              </a>
              <a
                href="/media-access"
                className="px-4 py-2 rounded-md bg-primary text-white text-sm"
              >
                Scan & Verify
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ImpactPage;
