import { useState, useEffect, useMemo, useRef } from "react";
import projects from "../data/projects.json";

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 bg-brand-100/40">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-brand-900 mb-4">Projects</h2>
        <p className="text-brand-700 mb-12">
          A selection of software and web development work I've done.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={i} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ title, description, tech = [], github, image, images }) {
  // Normalize to an array so we support both "image" and "images"
  const imageList = useMemo(() => images || (image ? [image] : []), [images, image]);

  const [current, setCurrent] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const intervalRef = useRef(null);

  // Preload images to avoid flicker during fade
  useEffect(() => {
    imageList.forEach((img) => {
      const i = new Image();
      i.src = new URL(`../assets/projects/${img}`, import.meta.url).href;
    });
  }, [imageList]);

  // Auto-cycle every 3s (pause when hovering)
  useEffect(() => {
    if (imageList.length <= 1 || isHover) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % imageList.length);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [imageList.length, isHover]);

  const goPrev = () => {
    if (imageList.length <= 1) return;
    setCurrent((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  const goNext = () => {
    if (imageList.length <= 1) return;
    setCurrent((prev) => (prev + 1) % imageList.length);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 text-left border border-brand-300/50">
      {/* Cross-fade carousel */}
      {imageList.length > 0 && (
        <div
          className="relative w-full h-48 bg-brand-100 overflow-hidden"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {/* Stack all images and fade opacity based on 'current' */}
          {imageList.map((img, idx) => {
            const src = new URL(`../assets/projects/${img}`, import.meta.url).href;
            const isActive = idx === current;
            return (
              <img
                key={img}
                src={src}
                alt={`${title} preview ${idx + 1}`}
                className={[
                  "absolute inset-0 w-full h-full object-cover",
                  // Smooth fade (tweak duration/easing if you want even softer)
                  "transition-opacity duration-700 ease-in-out",
                  isActive ? "opacity-100" : "opacity-0",
                ].join(" ")}
                // Prevent layout shift on load
                loading="eager"
                draggable={false}
              />
            );
          })}

          {/* Arrows (only if multiple images) */}
          {imageList.length > 1 && (
            <>
              <button
                onClick={goPrev}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white shadow px-2 py-1 rounded-md text-brand-900"
              >
                &lt;
              </button>
              <button
                onClick={goNext}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white shadow px-2 py-1 rounded-md text-brand-900"
              >
                &gt;
              </button>

              {/* Dots */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
                {imageList.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to image ${i + 1}`}
                    onClick={() => setCurrent(i)}
                    className={`h-2.5 w-2.5 rounded-full border border-white/70 ${
                      i === current ? "bg-brand-500" : "bg-brand-300"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-brand-900 mb-2">{title}</h3>
        <p className="text-brand-700 mb-4">{description}</p>

        {tech.length > 0 && (
          <div className="flex flex-wrap gap-2 text-sm mb-4">
            {tech.map((t, i) => (
              <span key={i} className="bg-brand-100 text-brand-700 px-2 py-1 rounded-md border border-brand-300/60">
                {t}
              </span>
            ))}
          </div>
        )}

        {github && (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-900 transition-colors"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}
