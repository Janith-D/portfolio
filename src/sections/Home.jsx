/**
 * Home: hero section with typing effect (roles cycle), avatar, CTAs, and social links.
 * forwardRef allows parent to pass a ref (e.g. for scroll or measurements). ParticleBackground + gradient blobs for atmosphere.
 */
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import avatar from "../assets/avator.png";
import { FaFacebook, FaLinkedinIn, FaGithub } from "react-icons/fa6";
import ParticleBackground from "../components/ParticlesBackground";
import LiquidEther from "../components/LiquidEther";


/* Social links and icons; replace hrefs with your profiles. */
const socials = [

  {
    Icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/janith-dharmasiri-40673028b/",
  },
  {
    Icon: FaFacebook,
    label: "Facebook",
    href: "https://www.facebook.com/janith.dmaxx/",
  },
  {
    Icon: FaGithub,
    label: "GitHub",
    href: "https://www.github.com/Janith-D",
  },
];

/* Framer Motion variants for social icon hover/tap: scale, lift, and glow. */
const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: {
    scale: 0.95,
    y: 0,
    transition: { duration: 0.08 },
  },
};

const Home = React.forwardRef((props, ref) => {
  const roles = useMemo(
    () => ["Full-Stack Developer", "Web Developer", "AI & ML Enthusiast","UI/UX Designer"],
    [],
  );
  const [index, setIndex] = useState(0);       /* which role string is active */
  const [subIndex, setSubIndex] = useState(0); /* current character index within that string */
  const [deleting, setDeleting] = useState(false); /* true when backspacing */

  /* Typing effect: type forward, pause at end, then delete and switch to next role in cycle. */
  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(
      () => {
        if (!deleting && subIndex < current.length) setSubIndex((v) => v + 1);
        else if (!deleting && subIndex === current.length)
          setTimeout(() => setDeleting(true), 1200);
        else if (deleting && subIndex > 0) setSubIndex((v) => v - 1);
        else if (deleting && subIndex === 0) {
          setDeleting(false);
          setIndex((p) => (p + 1) % roles.length);
        }
      },
      deleting ? 40 : 60,
    ); // original typing speed
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, roles]);

  return (
    <section
      ref={ref}
      id="home"
      className="h-screen w-full relative overflow-hidden bg-black"
    >
      <ParticleBackground />
      
      {/* LiquidEther Background Effect */}
      <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={25}
          cursorSize={120}
          isViscous={true}
          viscous={25}
          iterationsViscous={16}
          iterationsPoisson={16}
          resolution={0.8}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.6}
          autoIntensity={1.8}
          takeoverDuration={0.3}
          autoResumeDelay={4000}
          autoRampDuration={0.8}
          style={{
            width: '100%',
            height: '100%',
            willChange: 'transform',
            transform: 'translate3d(0, 0, 0)'
          }}
        />
      </div>

      {/* gradient blobs */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <div
          className="absolute -top-32 -left-32 
          w-[70vw] sm:w-[50vw] md:w-[40vw] 
          h-[70vw] sm:h-[50vw] md:h-[40vw]
          max-w-[500px] max-h-[500px]
          rounded-full
          bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1CD8D2]
          opacity-30 sm:opacity-20 md:opacity-10 
          blur-[100px] sm:blur-[130px] md:blur-[150px]
          animate-pulse"
        />
        <div
          className="absolute bottom-0 right-0 
          w-[70vw] sm:w-[50vw] md:w-[40vw] 
          h-[70vw] sm:h-[50vw] md:h-[40vw] 
          max-w-[500px] max-h-[500px] 
          rounded-full 
          bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] 
          opacity-40 sm:opacity-30 
          blur-[100px] sm:blur-[130px] md:blur-[150px] 
          animate-pulse delay-500"
        />
      </div>

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
        {/* left */}
        <motion.div
          className="flex flex-col justify-center h-full text-center lg:text-left relative"
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="w-full lg:pr-24 mx-auto max-w-[48rem]">
            {/* typing text */}
            <motion.div
              className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span>{roles[index].substring(0, subIndex)}</span>
              <span
                className="inline-block w-[2px] ml-1 bg-white animate-pulse align-middle"
                style={{ height: "1em" }}
              />
            </motion.div>

            {/* name */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text 
              bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] drop-shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Hello, I&apos;m
              <br />
              <span className="text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg:whitespace-nowrap">
                Janith Dharmasiri
              </span>
            </motion.h1>

            {/* description */}
            <motion.p
              className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              A passionate Software Developer who enjoys building modern web applications and backend systems.  
              I specialize in Java Spring Boot, ASP.NET Core, and React, creating scalable APIs and real-world solutions.  
              I love turning ideas into practical software that solves real problems.
            </motion.p>

            {/* buttons */}
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <a
                href="#projects"
                className="px-6 py-3 rounded-full text-lg font-medium text-white 
                bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63]
                shadow-lg hover:scale-105 transition-all"
              >
                View My Work
              </a>
              <a
                href="/JanithDharmasiri (1).pdf"
                download="JanithDharmasiri (1).pdf"
                className="px-6 py-3 rounded-full text-lg font-medium text-black bg-white 
                hover:bg-gray-200 shadow-lg hover:scale-105 transition-all"
              >
                My Resume
              </a>
            </motion.div>

            {/* socials */}
            <motion.div
              className="mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              {socials.map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={glowVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-gray-300"
                >
                  <Icon />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* right */}
        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          <div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              right: "10px",
              width: "min(22vw, 410px)",
              height: "min(40vw, 760px)",
              borderRadius: "50%",
              filter: "blur(38px)",
              opacity: 0.32,
              background:
                "conic-gradient(from 0deg, #1CD8D2, #00bf8f, #302b63, #1CD8D2)",
            }}
          />
          <motion.img
            src={avatar}
            alt="John Doe Avatar"
            className="absolute top-1/2 -translate-y-1/2 object-contain select-none pointer-events-none"
            style={{
              right: "-30px",
              width: "min(45vw, 780px)",
              maxHeight: "90vh",
            }}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
          />
        </motion.div>
      </div>
    </section>
  );
});

export default Home;
