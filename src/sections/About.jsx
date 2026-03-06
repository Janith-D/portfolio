/**
 * About: profile section with avatar, name, role, bio, quick stats grid, and CTAs.
 * whileInView + viewport (once, amount) trigger animations when the section scrolls into view.
 */
import { motion } from "framer-motion";
import p from "../assets/p.jpg";
import profile from "../assets/profile.jpeg";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden"
      aria-label="About me"
    >
      {/* Layered neon background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-[360px] h-[360px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1CD8D2] opacity-20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-10 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] opacity-15 blur-[140px] animate-pulse delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-20 w-[220px] h-[220px] rounded-full bg-gradient-to-r from-[#00bf8f] to-[#1CD8D2] opacity-10 blur-[100px]" />
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12">
        {/* Profile header */}
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* Avatar / Card */}
          <motion.div
            className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-full overflow-hidden shadow-2xl bg-gradient-to-br from-[#1CD8D2]/20 to-[#302b63]/20 border-2 border-[#1CD8D2]/30"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            aria-hidden="true"
          >
            <img 
              src={profile}
              alt="Janith Dharmasiri" 
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Name + Role + Bio + CTAs */}
          <div className="flex-1 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63]">
              Janith Dharmasiri
            </h2>
            <p className="mt-2 text-lg sm:text-xl text-white/90 font-semibold">
              Full Stack Developer | UI/UX Designer | Building Modern Web Applications | AI ML Enthusiast
            </p>

            <p className="mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl">
              A passionate Full-Stack Software Developer with a strong interest in building scalable and efficient applications. 
              I enjoy working across both frontend and backend development, 
              creating modern user interfaces and robust APIs that power real-world systems.
            </p>

            {/* Quick stats */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              {[
                { label: "Projects Built", value: "20+" },
                { label: "Specialty", value: "Backend Development" },
                { label: "Tech Stack", value: "15+ Tools" },
                {label: "Design", value: "UI/UX Design" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="text-sm text-gray-400">{item.label}</div>
                  <div className="text-base font-semibold text-white">
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-lg bg-white text-black font-semibold px-5 py-3 hover:bg-gray-200 transition"
                aria-label="View my projects"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white px-5 py-3 hover:bg-white/20 transition"
                aria-label="Get in touch"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </motion.div>

        {/* Body copy only — removed skills chip grid */}
        <div className="grid md:grid-cols-1">
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              About Me
            </h3>
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
              My experience includes working with technologies such as React,
             Java Spring Boot, and ASP.NET Core, along with designing and managing relational databases.
             I have developed several academic and personal projects including web applications, API-based systems, 
             and software solutions that solve practical problems.
            </p>
            <p className="mt-4 text-gray-400 text-base sm:text-lg">
              In addition to full-stack development, I am also exploring Machine Learning and AI-based systems,
              aiming to integrate intelligent features into modern applications. 
              I enjoy continuously learning new technologies and improving my problem-solving skills to build impactful software.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
