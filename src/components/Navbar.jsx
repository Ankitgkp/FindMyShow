import { useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import { FiSearch } from 'react-icons/fi'

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className="bg-[#0a0d12] text-white px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-10">
                <div className="flex items-center gap-2 text-cyan-500 font-semibold text-xl">
                    <div className="w-3 h-3 bg-cyan-500 rotate-45"></div>
                    <span>FindMyShow</span>
                </div>
                <ul className="hidden md:flex gap-6 text-sm text-gray-300">
                    <li className="text-white font-medium cursor-pointer">Home</li>
                    <li className="cursor-pointer">New</li>
                    <li className="cursor-pointer">Popular</li>
                    <li className="cursor-pointer">Lists</li>
                    <li className="cursor-pointer">Sports</li>
                    <li className="cursor-pointer">Guide</li>
                </ul>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                    <input
                        type="text"
                        placeholder="Search for movies or TV shows"
                        className="bg-[#13171f] text-sm text-white pl-10 pr-4 py-2 rounded-md outline-none w-72"
                    />
                    <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
                </div>

                <button className="bg-[#1d232f] text-white text-sm px-4 py-1.5 rounded-md hover:bg-[#2a303c]">
                    Sign In
                </button>

                <FiMenu
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-xl cursor-pointer md:hidden"
                />
            </div>
        </nav>
    )
}

export default Navbar
