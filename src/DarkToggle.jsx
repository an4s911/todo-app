import { useState, useEffect } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

export default function DarkToggle({ size }) {
    const [isDark, setIsDark] = useState(false);

    const handleClick = () => {
        setIsDark(!isDark);
    };

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);

    return (
        <>
            <div
                onClick={handleClick}
                className="h-16 w-16 relative rounded-full"
            >
                <div className="absolute text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                    {isDark ? <IoMoon size={size} /> : <IoSunny size={size} />}
                </div>
            </div>
        </>
    );
}
