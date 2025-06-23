import { useState, useEffect, useRef } from 'react'
import { FiMenu } from 'react-icons/fi'
import { FiSearch } from 'react-icons/fi'
import { Link, useNavigate, useLocation } from 'react-router-dom'

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [typingTimeout, setTypingTimeout] = useState(null)
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const value = e.target.value
        setSearchQuery(value)

        if (typingTimeout) {
            clearTimeout(typingTimeout)
        }

        if (value.trim().length > 2) {
            // Navigate to search after 500ms of no typing
            const timeout = setTimeout(() => {
                navigate(`/search?query=${encodeURIComponent(value.trim())}`)
            }, 500)
            setTypingTimeout(timeout)
        }
    }

    // Clean up on unmount
    useEffect(() => {
        return () => {
            if (typingTimeout) {
                clearTimeout(typingTimeout)
            }
        }
    }, [typingTimeout])

    return (
        <nav className="bg-[#0a0d12] text-white px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-10">
                <Link to="/" className="flex items-center gap-2 text-cyan-500 font-semibold text-xl">
                    <div className="w-3 h-3 bg-cyan-500 rotate-45"></div>
                    <span>FindMyShow</span>
                </Link>
                <ul className="hidden md:flex gap-6 text-sm text-gray-300">
                    <li className="text-white font-medium cursor-pointer">
                        <Link to="/">Home</Link>
                    </li>
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
                        value={searchQuery}
                        onChange={handleInputChange}
                    />
                    <div className="absolute left-3 top-2.5 text-gray-400">
                        <FiSearch />
                    </div>
                </div>

                <button className="bg-[#1d232f] text-white text-sm px-4 py-1.5 rounded-md hover:bg-[#2a303c]">
                    Sign In
                </button>

                <FiSearch
                    onClick={() => navigate('/search')}
                    className="text-xl cursor-pointer md:hidden mr-2"
                />
                <FiMenu
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-xl cursor-pointer md:hidden"
                />
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="absolute top-full left-0 right-0 bg-[#0a0d12] z-50 py-4 md:hidden">
                    <div className="px-6 mb-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for movies or TV shows"
                                className="bg-[#13171f] text-sm text-white w-full pl-10 pr-4 py-2 rounded-md outline-none"
                                value={searchQuery}
                                onChange={handleInputChange}
                            />
                            <div className="absolute left-3 top-2.5 text-gray-400">
                                <FiSearch />
                            </div>
                        </div>
                    </div>
                    <ul className="flex flex-col gap-3 px-6">
                        <li onClick={() => setMenuOpen(false)}>
                            <Link to="/" className="block py-1 text-white font-medium">Home</Link>
                        </li>
                        <li onClick={() => setMenuOpen(false)}>
                            <Link to="/" className="block py-1">New</Link>
                        </li>
                        <li onClick={() => setMenuOpen(false)}>
                            <Link to="/" className="block py-1">Popular</Link>
                        </li>
                        <li onClick={() => setMenuOpen(false)}>
                            <Link to="/" className="block py-1">Lists</Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    )
}

export default Navbar
