import { navItems } from "../Constant";
import suitbg from "../assets/suitbg.png";
import { useState, useEffect, use } from "react";
const Header = () => {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        let lastScrollY = window.scrollY;
        const ControlNavbar = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setVisible(false);
            } else {
                setVisible(true);
            }
            lastScrollY = currentScrollY;
        }
        window.addEventListener("scroll", ControlNavbar)
        return () => {
            window.removeEventListener("scroll", ControlNavbar);
        };

    }, []);

    return (
        <nav className={`sticky top-0 z-50 py-3 bg-orange-600 border-b border-neutral-700/80 ${visible ? "translate-y-0" : "-translate-y-full"} transition-transform duration-300 ease-in-out`}>
            <div className="max-w-7xl px-4 mx-auto relative lg:text-sm">

                <div className="flex justify-between items-center ">
                    {/* LOGO */}
                    <a href="/" className="flex items-center flex-shrink-0 rounded-full cursor-pointer ">
                        <img className="h-15 w-30" src={suitbg} alt="Logo" />
                    </a>


                    {/* ITEMNAVBAR YANG DIAMBIL DARI CONSTANTS */}
                    <ul className="hidden lg:flex ml-120 space-x-12  text-xl text-white">
                        {navItems.map((item, index) => (
                            <li key={index} className="hover:-translate-y-1 ">
                                <a href={item.href} className="hover:transition border-b-4 border-transparent hover:border-white "> {item.label}</a>
                            </li>
                        ))}
                    </ul>
                    <ul className="mr-1"></ul>


                </div>

            </div>
        </nav>
    );
}

export default Header