import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import AchievementGalleryModal from './AchievementGalleryModal';

export const CarouselContext = createContext({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }) => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const handleCardClose = (index) => {
    if (carouselRef.current) {
      const cardEl = carouselRef.current.querySelector('[data-carousel-card]');
      const cardWidth = cardEl?.offsetWidth ?? (window.innerWidth < 768 ? 192 : 256);
      const gap = 16;
      carouselRef.current.scrollTo({
        left: (cardWidth + gap) * (index + 1),
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-6 [scrollbar-width:none] md:py-10 hide-scrollbar"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              'flex flex-row justify-start gap-4 sm:gap-5 pl-4',
              'mx-auto max-w-7xl',
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: 'easeOut',
                  },
                }}
                key={`card-${index}`}
                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mr-10 flex justify-end gap-2">
          <button
            type="button"
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20 disabled:opacity-50 hover:bg-white/20 transition-colors"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <ArrowLeft className="h-5 w-5 text-white/70" />
          </button>
          <button
            type="button"
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20 disabled:opacity-50 hover:bg-white/20 transition-colors"
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <ArrowRight className="h-5 w-5 text-white/70" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({ card, index, layout = false }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const { onCardClose } = useContext(CarouselContext);

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.body.style.overflow = open ? 'hidden' : 'auto';
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => {
    if (open) handleClose();
  });

  return (
    <>
      {card.gallery ? (
        <AchievementGalleryModal
          isOpen={open}
          onClose={handleClose}
          title={card.title}
          category={card.category}
          images={card.gallery}
        />
      ) : (
        <AnimatePresence>
          {open && (
            <div className="fixed inset-0 z-50 h-screen overflow-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                ref={containerRef}
                layoutId={layout ? `card-${card.title}` : undefined}
                className="relative z-60 mx-auto my-10 h-fit max-w-5xl rounded-3xl bg-neutral-900 border border-white/10 p-4 font-sans md:p-10"
              >
                <button
                  type="button"
                  className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/10 border border-white/20 hover:bg-white/20"
                  onClick={handleClose}
                  aria-label="Close"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
                <motion.p
                  layoutId={layout ? `category-${card.title}` : undefined}
                  className="text-base font-medium text-primary"
                >
                  {card.category}
                </motion.p>
                <motion.p
                  layoutId={layout ? `title-${card.title}` : undefined}
                  className="mt-4 text-2xl font-semibold text-white md:text-5xl"
                >
                  {card.title}
                </motion.p>
                <div className="py-10">{card.content}</div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      )}
      <motion.button
        type="button"
        data-carousel-card
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={() => setOpen(true)}
        whileHover={card.hover ?? { scale: 1.04, y: -8 }}
        whileTap={{ scale: 0.98 }}
        transition={card.hoverTransition ?? { type: 'spring', stiffness: 400, damping: 22 }}
        className={cn(
          'group relative z-10 flex flex-col items-start justify-start overflow-hidden rounded-3xl bg-neutral-900 border border-white/10 transition-colors duration-300',
          card.cardSize ?? 'h-48 w-40 md:h-64 md:w-56',
          card.hoverClassName,
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-linear-to-b from-black/60 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/40 group-hover:via-black/10" />
        <div
          className={cn(
            'relative z-40 transition-transform duration-300 group-hover:translate-y-[-2px]',
            card.cardSize ? 'p-4 sm:p-5 md:p-6' : 'p-4 md:p-6',
          )}
        >
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className={cn(
              'text-left font-medium text-white transition-colors duration-300 group-hover:text-primary',
              card.cardSize ? 'text-xs sm:text-sm' : 'text-xs md:text-sm',
            )}
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className={cn(
              'mt-1 max-w-xs text-left font-semibold text-white transition-colors duration-300 group-hover:text-[#A8FF8D]',
              card.cardSize ? 'text-sm sm:text-base md:text-lg lg:text-xl' : 'text-sm md:text-lg',
            )}
          >
            {card.title}
          </motion.p>
        </div>
        <BlurImage
          src={card.src}
          alt={card.title}
          className="absolute inset-0 z-10 object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </motion.button>
    </>
  );
};

const BlurImage = ({ src, alt, className, ...rest }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <img
      className={cn(
        'h-full w-full transition duration-300',
        isLoading ? 'blur-sm' : 'blur-0',
        className,
      )}
      onLoad={() => setLoading(false)}
      src={src}
      loading="lazy"
      decoding="async"
      alt={alt ?? 'Achievement image'}
      {...rest}
    />
  );
};
