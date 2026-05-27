import LogoLoop from '../LogoLoop'
import {
    SiBootstrap,
    SiDotnet,
    SiLaravel,
    SiMysql,
    SiNextdotjs,
    SiNodedotjs,
    SiPhp,
    SiPython,
    SiReact,
    SiTailwindcss,
    SiTypescript,
} from 'react-icons/si'

const techLogos = [
    { node: <SiReact className="text-white" />, title: 'React', href: 'https://react.dev' },
    { node: <SiNextdotjs className="text-white" />, title: 'Next.js', href: 'https://nextjs.org' },
    { node: <SiTypescript className="text-white" />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
    { node: <SiTailwindcss className="text-white" />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
    { node: <SiNodedotjs className="text-white" />, title: 'Node.js', href: 'https://nodejs.org' },
    { node: <SiLaravel className="text-white" />, title: 'Laravel', href: 'https://laravel.com' },
    { node: <SiDotnet className="text-white" />, title: '.NET', href: 'https://dotnet.microsoft.com' },
    { node: <SiPython className="text-white" />, title: 'Python', href: 'https://www.python.org' },
    { node: <SiPhp className="text-white" />, title: 'PHP', href: 'https://www.php.net' },
    { node: <SiMysql className="text-white" />, title: 'MySQL', href: 'https://www.mysql.com' },
    { node: <SiBootstrap className="text-white" />, title: 'Bootstrap', href: 'https://getbootstrap.com' },
]

const TechLogoLoop = ({ className = '', ...props }) => {
    return (
        <LogoLoop
            logos={techLogos}
            speed={100}
            direction="left"
            logoHeight={48}
            gap={48}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#000000"
            ariaLabel="Technology stack"
            className={className}
            {...props}
        />
    )
}

export default TechLogoLoop
