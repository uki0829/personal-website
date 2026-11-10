"use client";

import { useState } from "react";
import Image from "next/image";
import { ChartNoAxesCombined } from "lucide-react";
import lectureLabImage from "@/public/portfolio/lec to quiz.png";
import hackathonImage from "@/public/portfolio/screen.jpg";
import planterImage from "@/public/portfolio/smart planter project.jpeg";

const projects = [
  {
    title: "Lecture Lab: Smart Study Classroom",
    image: lectureLabImage,
    link: "https://github.com/uki0829/Lec_to_quiz",
    category: "AI Product Design",
    year: "2026",
    summary:
      "Designed a web app that turns student-uploaded PDF lecture materials into interactive quizzes. Used retrieval-augmented generation (RAG) to ground study content in course materials and support personalized study paths for each student.",
  },
  {
    title: "Parsons Creative Hackathons",
    image: hackathonImage,
    category: "UI/UX Design",
    year: "2026",
    summary:
      "Developed an interactive data visualization web interface processing structured JSON data from 1.5K data centers, enabling exploration of global data infrastructure patterns and associated energy usage. (prototype under portfolio section)",
    link: "https://ai-infrastructure-story.vercel.app/"
  },
  {
    title: "H-1B Visa Approval Predictive Model",
    category: "Machine Learning",
    year: "2024",
    summary:
      "Developed a machine learning model using 1M+ historical visa records to predict approval probability and identify key decision factors, leveraging Pandas, PyTorch, and Scikit-learn.",
    link: "https://github.com/uki0829/H1B-Application-Predictions"
  },
  {
    title: "Smart Self-Watering Planter",
    image: planterImage,
    category: "Product Design",
    year: "2025",
    summary:
      "Developed an IoT smart planter using Random Forest and XGBoost algorithms to predict optimal watering schedules from real-time humidity and temperature sensor data for different plant types, achieving 90%+ prediction accuracy.",
  },
];

const colors = ["#171e2b", "#151019", "#dddfe9", "#b49b7d"];

export default function Projects() {
  const [selected, setSelected] = useState<number | null>(null);
  const front = selected ?? 0;
  const project = selected === null ? null : projects[selected];

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display font-bold text-ink" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em", lineHeight: 1 }}>
          Projects
        </h2>
        <p className="font-body text-sm text-stone mt-4">Pick a card to explore a project.</p>

        <div className={`project-stage ${project ? "is-open" : ""}`}>
          <div className="project-description" aria-hidden={!project}>
            {project && (
              <article key={project.title} className="project-copy" aria-live="polite">
                <p className="font-mono text-xs text-stone mb-4">{project.category} · {project.year}</p>
                <h3 id="project-detail-title" className="font-display text-3xl md:text-4xl font-bold leading-tight mb-6">{project.title}</h3>
                <p className="font-body text-base leading-relaxed text-ink">{project.summary}</p>
                {"link" in project && project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 font-body text-sm underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">View project ↗</a>
                )}
                <button type="button" onClick={() => setSelected(null)} className="block mt-8 font-body text-sm text-stone underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Back to deck</button>
              </article>
            )}
          </div>

          <div className="project-deck" role="group" aria-label="Choose a project">
            {projects.map((item, index) => {
              const position = (index - front + projects.length) % projects.length;
              return (
                <button
                  key={item.title}
                  type="button"
                  className="project-playing-card"
                  aria-label={`Read about ${item.title}`}
                  aria-pressed={selected === index}
                  onClick={() => setSelected(index)}
                  style={{
                    zIndex: projects.length - position,
                    transform: `translate(${position * 30}px, ${position * 13}px) rotate(${position * 5 - 7}deg)`,
                  }}
                >
                  <div className="project-cover" style={{ backgroundColor: colors[index] }}>
                    {"image" in item && item.image ? (
                      <>
                        <Image src={item.image} alt="" fill sizes="250px" className="project-cover-backdrop" aria-hidden="true" />
                        <Image src={item.image} alt={`${item.title} preview`} sizes="250px" className="project-cover-image" />
                      </>
                    ) : (
                      <ChartNoAxesCombined size={86} strokeWidth={1.5} aria-hidden="true" />
                    )}
                  </div>
                  <div className="px-1 pt-5 flex flex-col flex-1">
                    <h3 className="font-display text-2xl font-bold leading-tight">{item.title}</h3>
                    <div className="flex justify-between items-center mt-auto pt-5 font-mono text-xs text-stone">
                      <span>{item.year}</span><span aria-hidden="true">Explore ↗</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
