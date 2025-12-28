import React, {useState, useEffect} from 'react'
import {Code, Menu, X} from 'lucide-react'
import {nav_links, personal_info} from '../../utils/constants'
import {useScrollSpy, scrollToSection} from '../../hooks/useScrollSpy'


const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const activeSection = useScrollSpy(nav_links.map(link => link.id));

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, []);

    const handleNavClick = (sectionid) => {
       scrollToSection(sectionid);
       setIsMenuOpen(false);
    };

  return (
    <nav className={`fixed top-0 left-0 w-full z-1000 py-4 transition-all duration-300 ${isScrolled
     ? 'bg-black/30 backdrop-blur-lg' : 'bg-transparent'}`}
     style={{transform: 'translate3d(0, 0, 0)'}}>
      <div className="max-w-[1320px] mx-auto px-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Code className="text-primary w-6 h-6" />

            <button
              onClick={() => window.scrollTo({top:0, behavior: 'smooth'})}
              className="text-2xl font-bold bg-gradient-to-r from-primary via-primary/50 to-primary/30 bg-clip-text text-transparent hover:opacity-80 transition-opacity"

              aria-label='home'
            >
              {personal_info.name.split(' ')[0]}

            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {nav_links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-base font-medium transition-all duration-300 ${
                  activeSection === link.id
                    ? ' text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => handleNavClick('contact')}
              className="px-7 py-3.5 bg-white text-[#212121] font-medium text-base rounded-[17px] border border-white hover:bg-white/90 transition-all"
            >
              Hire Me

            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-4 hover:text-white/80 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
     <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-black/95 backdrop-blur-lg flex flex-col gap-3 px-5 py-4">
          {nav_links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeSection === link.id
                  ? ' text-white bg-white/10'
                  : 'text-white/70 hover:text-white hover:bg-white/50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('contact')}
            className="w-full px-7 py-3.5 bg-white text-[#212121] font-medium text-base rounded-[17px] border border-white hover:bg-white/90 transition-all duration-300 mt-2"
          >
            Hire Me
          </button>
        </div>
      </div>
    </nav>
  )
}
export default Navbar