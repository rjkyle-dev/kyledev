"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";



export const HeroParallax = ({
  products = [],
}) => {
  const safeProducts = Array.isArray(products) ? products : [];
  const firstRow = safeProducts.slice(0, 5);
  const secondRow = safeProducts.slice(5, 10);
  const thirdRow = safeProducts.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-1300, 50]), springConfig);
  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]">
      <Header projects={safeProducts} />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="">
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = ({ projects = [] }) => {
  const safeProjects = Array.isArray(projects) ? projects : [];
  const preview = safeProjects.slice(0, 6);
  const certificates = [
    {
      title: 'G-Cash Tree Planting Initiative',
      issuer: 'G-Cash Inc',
      date: 'May 2025',
      src: '/images/Certifications/TreePlanting.png',
      alt: 'G-Cash Tree Planting Initiative certificate',
    },
    {
      title: 'SQL Database',
      issuer: 'CodeSignal Inc',
      date: 'June 2025',
      src: '/images/Certifications/zero-prod.jpg',
      alt: 'SQL Database certificate',
    },
    {
      title: 'Azure Fundamentals',
      issuer: 'Simplilearn Inc',
      date: 'June 2025',
      src: '/images/Certifications/dev-dep.jpg',
      alt: 'Azure Fundamentals certificate',
    },
  ];

  return (
    <div
      className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold text-white dark:text-white">
        Featured  <br /> Projects
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-white/70 dark:text-neutral-200">
       I build Web Based Management Systems and Web Based Applications.
       Software Development is my passion and I love to build software that helps people and businesses. 
       </p>

      {preview.length > 0 && (
        <div className="mt-10">
          <p className="text-xs md:text-sm font-medium tracking-[0.25em] text-white/60 uppercase">
            Browse projects
          </p>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {preview.map((project) => (
              <a
                key={project.title}
                href={project.link}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-90" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-2">
                  <p className="line-clamp-2 text-[11px] font-semibold text-white">
                    {project.title}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="mt-14">
        <div className="h-px w-full bg-white/10" />
        <div className="mt-8 flex items-start justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-6xl font-bold text-white uppercase tracking-tight leading-[0.9]">
              CERTIFICATIONS
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/70">
              I&apos;m certified in skills that strengthen real-world development.
            </p>
          </div>
          <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80">
            <span className="text-xl leading-none">≡</span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {certificates.map((cert) => (
            <article key={`${cert.title}-${cert.issuer}`} className="group">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/20">
                  <img
                    src={cert.src}
                    alt={cert.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-white">{cert.title}</h3>
              <p className="mt-1 text-xs text-white/60">{cert.issuer}</p>
              <p className="mt-1 text-xs text-white/50">{cert.date}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative shrink-0">
      <a href={product.link} className="block group-hover/product:shadow-2xl ">
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title} />
      </a>
      <div
        className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2
        className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
