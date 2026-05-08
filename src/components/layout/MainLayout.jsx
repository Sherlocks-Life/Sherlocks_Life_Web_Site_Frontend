import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ThemeToggle from "../ui/ThemeToggle";

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 w-full overflow-x-hidden font-sans">
            <Navbar />
            <ThemeToggle />
            <main className="flex-grow flex flex-col w-full">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
