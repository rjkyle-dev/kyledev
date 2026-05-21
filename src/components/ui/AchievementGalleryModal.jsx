import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Expand, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useOutsideClick } from '../../hooks/useOutsideClick';

const FullImageViewer = ({ src, alt, onClose }) => (
  <motion.div
    key={src}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-70 flex items-center justify-center p-4 sm:p-8"
  >
    <button
      type="button"
      aria-label="Close full image view"
      onClick={onClose}
      className="absolute inset-0 bg-black/90 backdrop-blur-md"
    />
    <button
      type="button"
      onClick={onClose}
      aria-label="Close"
      className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
    >
      <X className="h-5 w-5 text-white" />
    </button>
    <motion.img
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      src={src}
      alt={alt}
      className="relative z-10 max-h-[90vh] max-w-full w-auto object-contain rounded-lg"
    />
  </motion.div>
);

const GallerySlide = ({ src, alt, description, onViewImage }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <article className="w-full min-w-full max-w-full shrink-0 snap-start snap-always">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div className="relative w-full h-52 sm:h-64 md:h-72 overflow-hidden">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoading(false)}
            className={`block h-full w-full object-cover object-center transition-all duration-500 ${
              isLoading ? 'blur-sm scale-105' : 'blur-0 scale-100'
            }`}
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
          <button
            type="button"
            onClick={() => onViewImage(src, alt)}
            className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white/80 text-xs sm:text-sm font-medium hover:bg-primary/30 hover:border-primary/50 hover:text-white transition-all duration-300 hover:scale-105"
            aria-label="View full image"
          >
            <Expand className="w-4 h-4" />
            View Image
          </button>
        </div>
        <div className="p-4 md:p-5 min-h-[4.5rem]">
          <p className="text-sm md:text-base text-white/70 leading-relaxed line-clamp-4 md:line-clamp-3">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
};

const AchievementGalleryModal = ({
  isOpen,
  onClose,
  title,
  category,
  images = [],
}) => {
  const containerRef = useRef(null);
  const scrollContentRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewingImage, setViewingImage] = useState(null);

  const scrollToIndex = useCallback((index) => {
    setCurrentIndex(index);
    if (scrollContentRef.current) {
      const container = scrollContentRef.current;
      const slideWidth = container.offsetWidth;
      container.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth',
      });
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollContentRef.current) return;
    const { scrollLeft, offsetWidth } = scrollContentRef.current;
    if (offsetWidth === 0) return;
    const index = Math.round(scrollLeft / offsetWidth);
    setCurrentIndex(Math.min(index, images.length - 1));
  }, [images.length]);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setViewingImage(null);
      if (scrollContentRef.current) {
        scrollContentRef.current.scrollLeft = 0;
      }
    }
  }, [isOpen, title]);

  const handleViewImage = useCallback((src, alt) => {
    setViewingImage({ src, alt });
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (viewingImage) {
          setViewingImage(null);
        } else {
          onClose();
        }
      }
    };

    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose, viewingImage]);

  useOutsideClick(containerRef, () => {
    if (isOpen) onClose();
  });

  return (
    <>
    <AnimatePresence>
      {viewingImage && (
        <FullImageViewer
          src={viewingImage.src}
          alt={viewingImage.alt}
          onClose={() => setViewingImage(null)}
        />
      )}
    </AnimatePresence>
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-6 md:p-10">
          <motion.button
            type="button"
            aria-label="Close gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg cursor-default"
          />

          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="achievement-gallery-title"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative z-10 my-4 w-full max-w-2xl sm:max-w-3xl md:max-w-4xl rounded-3xl border border-white/10 bg-neutral-900 p-4 md:p-8"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-sm font-medium text-primary">{category}</p>
                <h2
                  id="achievement-gallery-title"
                  className="mt-1 text-2xl md:text-4xl font-semibold text-white"
                >
                  {title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            <div className="relative w-full">
              <div
                ref={scrollContentRef}
                onScroll={handleScroll}
                className="w-full overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
              >
                <div className="flex w-full">
                  {images.map((image, index) => (
                    <GallerySlide
                      key={`${image.src}-${index}`}
                      src={image.src}
                      alt={image.alt ?? `${title} photo ${index + 1}`}
                      description={image.description}
                      onViewImage={handleViewImage}
                    />
                  ))}
                </div>
              </div>

              {images.length > 1 && (
                <div className="flex items-center gap-2 justify-center mt-6">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => scrollToIndex(index)}
                      aria-label={`Go to image ${index + 1}`}
                      aria-current={index === currentIndex ? 'true' : undefined}
                      className={`rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-primary w-6 h-2'
                          : 'bg-white/30 w-2 h-2 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
};

export default AchievementGalleryModal;
