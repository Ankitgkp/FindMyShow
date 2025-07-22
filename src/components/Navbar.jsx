import { useState, useEffect, useRef } from 'react'
import { FiMenu } from 'react-icons/fi'
import { FiSearch } from 'react-icons/fi'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react'
import { clerkConfig } from '../config/clerk'
import { useBookmarks } from '../contexts/BookmarksContext'

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [typingTimeout, setTypingTimeout] = useState(null)
    const navigate = useNavigate()
    const { isSignedIn, user } = useUser()
    const { bookmarkCount } = useBookmarks()

    const handleInputChange = (e) => {
        const value = e.target.value
        setSearchQuery(value)

        if (typingTimeout) {
            clearTimeout(typingTimeout)
        }

        if (value.trim().length > 2) {

            const timeout = setTimeout(() => {
                navigate(`/search?query=${encodeURIComponent(value.trim())}`)
            }, 500)
            setTypingTimeout(timeout)
        }
    }


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
                    <li className="cursor-pointer">
                        <Link to="/new">New</Link>
                    </li>
                    <li className="cursor-pointer">
                        <Link to="/popular">Popular</Link>
                    </li>
                    <li className="cursor-pointer">
                        <Link to="/lists">Lists</Link>
                    </li>
                    {isSignedIn && (
                        <li className="cursor-pointer relative">
                            <Link to="/bookmarks" className="flex items-center gap-1">
                                My Bookmarks
                                {bookmarkCount > 0 && (
                                    <span className="bg-cyan-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                                        {bookmarkCount}
                                    </span>
                                )}
                            </Link>
                        </li>
                    )}
                    <li className="cursor-pointer">
                        <Link to="/sports">Sports</Link>
                    </li>
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

                {!isSignedIn ? (
                    <div className="flex gap-2">
                        <SignInButton mode="modal" {...clerkConfig.signIn}>
                            <button className="bg-[#1d232f] text-white text-sm px-4 py-1.5 rounded-md hover:bg-[#2a303c]">
                                Sign In
                            </button>
                        </SignInButton>
                        <SignUpButton mode="modal" {...clerkConfig.signUp}>
                            <button className="bg-cyan-500 text-white text-sm px-4 py-1.5 rounded-md hover:bg-cyan-600">
                                Sign Up
                            </button>
                        </SignUpButton>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-300 hidden md:block">
                            Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress?.split('@')[0]}
                        </span>
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={clerkConfig.appearance}
                        />
                    </div>
                )}

                <FiSearch
                    onClick={() => navigate('/search')}
                    className="text-xl cursor-pointer md:hidden mr-2"
                />
                <FiMenu
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-xl cursor-pointer md:hidden"
                />
            </div>

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
                            <Link to="/new" className="block py-1">New</Link>
                        </li>
                        <li onClick={() => setMenuOpen(false)}>
                            <Link to="/popular" className="block py-1">Popular</Link>
                        </li>
                        <li onClick={() => setMenuOpen(false)}>
                            <Link to="/lists" className="block py-1">Lists</Link>
                        </li>
                        {isSignedIn && (
                            <li onClick={() => setMenuOpen(false)}>
                                <Link to="/bookmarks" className="flex items-center justify-between py-1">
                                    My Bookmarks
                                    {bookmarkCount > 0 && (
                                        <span className="bg-cyan-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                                            {bookmarkCount}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        )}
                        <li onClick={() => setMenuOpen(false)}>
                            <Link to="/sports" className="block py-1">Sports</Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    )
}

export default Navbar
