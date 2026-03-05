/**
 * Projects: Scroll-driven project showcase with timeline animation.
 * Cards animate in as you scroll with vertical timeline and electric borders.
 * Zig-zag layout on desktop, stacked layout on mobile.
 */
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ElectricBorder from "../components/ElectricBorder";


// 🔹 Custom Hook: Detects if screen size matches "mobile"
const useIsMobile = (query = "(max-width: 768px)") => {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener?.("change", handler) || mql.addListener(handler);

    setIsMobile(mql.matches);
    return () =>
      mql.removeEventListener?.("change", handler) ||
      mql.removeListener(handler);
  }, [query]);

  return isMobile;
};

// Project Item Component with scroll animations
function ProjectItem({ project, idx, start, end, scrollYProgress, isMobile }) {
  // Animate opacity as user scrolls
  const cardOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  // Animate card Y position (slide down from above, then into place)
  const cardY = useTransform(scrollYProgress, [start, end], [40, 0]);
  // Animate image X position (slide from right side)
  const imageX = useTransform(scrollYProgress, [start, end], [60, 0]);
  const imageOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  
  // Marker animations
  const markerScale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const markerOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  // Determine zig-zag direction for desktop
  const isEven = idx % 2 === 0;

  if (isMobile) {
    return (
      <div className="relative flex items-start flex-col" key={`${project.title}-m-${idx}`}>
        {/* Marker dot on timeline */}
        <motion.div
          className="absolute -top-28 left-1/2 -translate-x-1/2 z-10 w-6 h-6 rounded-full bg-[#1CD8D2] shadow-[0_0_10px_rgba(28,216,210,0.8)]"
          style={{ scale: markerScale, opacity: markerOpacity }}
        />

        {/* Project Info Card (Mobile) */}
        <ElectricBorder
          color="#1CD8D2"
          speed={1}
          chaos={0.12}
          borderRadius={16}
          style={{
            width: "100%",
            padding: "24px",
            background: "rgba(17, 24, 39, 0.8)",
            backdropFilter: "blur(10px)",
          }}
        >
          <motion.div
            style={{ opacity: cardOpacity, y: cardY }}
          >
            <h3 className="text-2xl font-bold text-white mb-2 capitalize">
              {project.title}
            </h3>
            {project.repo && (
              <p className="text-sm text-[#1CD8D2] mb-3 font-mono">
                Repo: {project.repo}
              </p>
            )}
            <p className="text-gray-300 mb-4 leading-relaxed text-sm">
              {project.description}
            </p>
            
            {project.techStack && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-400 mb-2">Tech Stack:</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="text-xs bg-[#1CD8D2]/20 text-[#1CD8D2] px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.highlights && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-400 mb-2">Highlights:</p>
                <ul className="space-y-1">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="text-xs text-gray-300 flex items-start">
                      <span className="text-[#1CD8D2] mr-2">✔</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2 rounded-lg bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] text-white font-semibold hover:shadow-lg transition-all text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Project
            </motion.a>
          </motion.div>
        </ElectricBorder>
      </div>
    );
  }

  // Desktop Layout - Zig Zag with Timeline
  const isLeft = idx % 2 === 0;
  
  return (
    <div key={`${project.title}-${idx}`} className="relative flex items-center min-h-[550px]">
      {/* Timeline Marker - Always Center */}
      <div className="absolute left-1/2 -translate-x-1/2 z-20 flex items-center">
        <motion.div
          className="w-8 h-8 rounded-full bg-[#1CD8D2] shadow-[0_0_20px_rgba(28,216,210,0.9)] border-2 border-white"
          style={{ scale: markerScale, opacity: markerOpacity }}
        />
      </div>
      
      {/* Vertical connector line from marker */}
      <div className="absolute left-1/2 -translate-x-1/2 top-8 bottom-0 w-[1px] bg-gradient-to-b from-[#1CD8D2]/30 to-transparent pointer-events-none" />

      {/* Left Side Card - Shows only when isLeft is true */}
      {isLeft && (
        <>
          <div className="absolute left-0 w-[calc(50%-24px)] flex justify-end mt-32">
            {/* Project Info Card (Desktop Left) */}
            <ElectricBorder
              color="#1CD8D2"
              speed={1}
              chaos={0.12}
              borderRadius={24}
              style={{
                width: "100%",
                padding: "32px",
                background: "rgba(17, 24, 39, 0.8)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
                marginRight: "24px",
              }}
            >
              <motion.div
                style={{ opacity: cardOpacity, y: cardY }}
              >
                <h3 className="text-3xl font-bold text-white mb-2 capitalize">
                  {project.title}
                </h3>
                {project.repo && (
                  <p className="text-sm text-[#1CD8D2] mb-3 font-mono">
                    Repo: {project.repo}
                  </p>
                )}
                <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                  {project.description}
                </p>
                
                {project.techStack && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-400 mb-2">Tech Stack:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="text-xs bg-[#1CD8D2]/20 text-[#1CD8D2] px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.highlights && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-400 mb-2">Highlights:</p>
                    <ul className="space-y-1">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="text-xs text-gray-300 flex items-start">
                          <span className="text-[#1CD8D2] mr-2">✔</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-3 rounded-lg bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] text-white font-semibold hover:shadow-lg transition-all text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Project
                </motion.a>
              </motion.div>
            </ElectricBorder>
          </div>
        </>
      )}

      {/* Right Side Card - Shows only when isLeft is false */}
      {!isLeft && (
        <>
          <div className="absolute right-0 w-[calc(50%-24px)] flex justify-start mt-32">
            {/* Project Info Card (Desktop Right) */}
            <ElectricBorder
              color="#1CD8D2"
              speed={1}
              chaos={0.12}
              borderRadius={24}
              style={{
                width: "100%",
                padding: "32px",
                background: "rgba(17, 24, 39, 0.8)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
                marginLeft: "24px",
              }}
            >
              <motion.div
                style={{ opacity: cardOpacity, y: cardY }}
              >
                <h3 className="text-3xl font-bold text-white mb-2 capitalize">
                  {project.title}
                </h3>
                {project.repo && (
                  <p className="text-sm text-[#1CD8D2] mb-3 font-mono">
                    Repo: {project.repo}
                  </p>
                )}
                <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                  {project.description}
                </p>
                
                {project.techStack && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-400 mb-2">Tech Stack:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="text-xs bg-[#1CD8D2]/20 text-[#1CD8D2] px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.highlights && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-400 mb-2">Highlights:</p>
                    <ul className="space-y-1">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="text-xs text-gray-300 flex items-start">
                          <span className="text-[#1CD8D2] mr-2">✔</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-3 rounded-lg bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] text-white font-semibold hover:shadow-lg transition-all text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Project
                </motion.a>
              </motion.div>
            </ElectricBorder>
          </div>
        </>
      )}
    </div>
  );
}

export default function Projects() {
  const isMobile = useIsMobile();

  // 🔹 List of project objects
  const projects = React.useMemo(
    () => [
      {
        title: "Online Food Ordering & Tracking Chatbot",
        description: "A full-stack food ordering system integrated with an AI chatbot that allows users to place and track orders using natural language.",
        techStack: ["Node.js", "React", "Dialogflow", "Python", "FastAPI"],
        highlights: [
          "AI-powered chatbot for order placement",
          "Real-time order tracking",
          "Integrated payment gateway",
          "Multi-restaurant support"
        ],
        link: "https://github.com/Janith-D/online-food-ordering-and-tracking-chatbot-dialogflow",
      },
      {
        title: "SecureVote – Online Voting System",
        description: "A secure online voting system designed to ensure transparency and integrity in digital elections with blockchain verification.",
        techStack: ["Python", "Django", "PostgreSQL", "React", "Blockchain","Java"],
        highlights: [
          "End-to-end encryption",
          "Duplicate vote prevention",
          "Audit trail logs",
          "Real-time result visualization"
        ],
        link: "https://github.com/Janith-D/securevote",
      },
      {
        title: "Online Grocery Store System",
        description: "A backend system for an online grocery delivery platform that manages products, orders, and user interactions seamlessly.",
        techStack: ["Java", "Spring Boot", "MySQL", "Redis", "Microservices"],
        highlights: [
          "Inventory management",
          "Order processing pipeline",
          "Delivery optimization",
          "Scalable architecture"
        ],
        link: "https://github.com/Janith-D/onlineGroseryStore",
      },
      {
        title: "E-Commerce Backend API",
        description: "A RESTful API for managing an e-commerce platform including product management, order handling, and customer interactions.",
        techStack: ["Node.js", "Express", "Spring Boot", "JWT", "AWS"],
        highlights: [
          "RESTful architecture",
          "Secure authentication",
          "Product catalog management",
          "Order fulfillment system"
        ],
        link: "https://github.com/Janith-D/ecommerce_backend",
      },
      {
        title: "Exam Anti-Cheating System",
        description: "A system designed to detect and prevent cheating during online examinations using monitoring and rule-based detection mechanisms.",
        techStack: ["Java", "Python", "Computer Vision", "Security", "WebRTC"],
        highlights: [
          "Real-time behavior monitoring",
          "Suspicious activity detection",
          "Screen capture validation",
          "Integrity verification"
        ],
        link: "https://github.com/Janith-D/exam_anti_cheating",
      },
    ],
    [isMobile]
  );

  const containerRef = useRef(null);

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Desktop timeline line width animation
  const lineWidth = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  // Mobile timeline line height animation
  const lineHeight = useTransform(scrollYProgress, [0, 1], [0, 80]);

  // Create animation thresholds for each project
  const createThresholds = (totalProjects) => {
    const thresholds = [];
    const step = 1 / (totalProjects + 1);
    for (let i = 0; i <= totalProjects; i++) {
      thresholds.push(step * i);
    }
    return thresholds;
  };

  const thresholds = createThresholds(projects.length);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative min-h-screen pt-24 pb-36 px-4 md:px-8 lg:px-16"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-black pointer-events-none" />

      {/* Vertical Timeline - Full Height */}
      <div className="absolute left-1/2 -translate-x-1/2 top-48 w-2 z-0" style={{ height: "calc(100% - 192px)" }}>
        <div className="relative w-1 h-full bg-gradient-to-b from-[#5227FF]/20 via-[#FF9FFC]/20 to-[#B19EEF]/20">
          <motion.div
            className="w-full bg-gradient-to-b from-[#5227FF] via-[#FF9FFC] to-[#B19EEF] shadow-[0_0_20px_rgba(82,39,255,0.6)]"
            style={{
              height: lineHeight,
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Title Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#5227FF] via-[#FF9FFC] to-[#B19EEF] bg-clip-text text-transparent">
            Projects
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl">
            A collection of projects showcasing my skills in web development, design, and problem-solving.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-20">
          {projects.map((project, idx) => (
            <ProjectItem
              key={`${project.title}-${idx}`}
              project={project}
              idx={idx}
              start={thresholds[idx]}
              end={thresholds[idx + 1]}
              scrollYProgress={scrollYProgress}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

