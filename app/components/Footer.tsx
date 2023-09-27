import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <footer className="p-4 bg-gray-800 text-white flex items-center justify-center space-x-4">
            <Link
                title="Join our Discord Server"
                href="https://discord.com/invite/6N63uDVC2G"
                className="hover:underline cursor-pointer hover:text-blue-400"
            >
                <FontAwesomeIcon icon={faDiscord} />
            </Link>
            <Link
                title="NoRage Website"
                href="https://aymvn.tech/norage"
                className="hover:underline cursor-pointer hover:text-blue-400"
            >
                <FontAwesomeIcon icon={faGlobe} />
            </Link>
        </footer>
    );
};

export default Footer;
