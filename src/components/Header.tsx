import { useEffect, useRef } from 'react';
import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import ProfileMenu from './ProfileMenu';

import {
    ChevronDown,
    ChevronRight,
    Home,
    Menu,
    SquareFunction,
    StickyNote,
    X,
    ClipboardCheck,
    Calendar,
    CircleUserRound,
} from 'lucide-react'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [groupedExpanded, setGroupedExpanded] = useState<
        Record<string, boolean>
    >({});

    const menuRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!menuRef.current) return;

            if (!menuRef.current.contains(event.target as Node)) {
                setShowProfileMenu(false);
            }
        }

        if (showProfileMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [showProfileMenu]);

    return (
        <>
            <header className="p-4 flex items-center bg-text-dark text-white shadow-lg w-full">
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 hover:bg-cyan-600 rounded-lg transition-colors cursor-pointer"
                    aria-label="Open menu"
                >
                    <Menu size={24} />
                </button>
                <Link to="/">
                    <h1 className="ml-4 text-xl font-semibold flex items-center">
                        <ClipboardCheck size={40} />
                        <div className="ml-2">Orgtanize</div>
                    </h1>
                </Link>
                <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex ml-auto p-2 hover:bg-cyan-600 rounded-lg transition-colors cursor-pointer"
                    aria-label="Open menu"
                >
                    <CircleUserRound size={40} />
                </button>
                {showProfileMenu ? <ProfileMenu ref={menuRef} /> : null}
            </header>

            <aside
                className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h2 className="text-xl font-bold">Navigation</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 p-4 overflow-y-auto">
                    <Link
                        to="/"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
                        activeProps={{
                            className:
                                'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
                        }}
                    >
                        <Home size={20} />
                        <span className="font-medium">Home</span>
                    </Link>


                    <Link
                        to="/calendar"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
                        activeProps={{
                            className:
                                'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
                        }}
                    >
                        <Calendar size={20} />
                        <span className="font-medium">Calendar</span>
                    </Link>

                    {/* Demo Links Start */}

                    <Link
                        to="/demo/start/server-funcs"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
                        activeProps={{
                            className:
                                'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
                        }}
                    >
                        <SquareFunction size={20} />
                        <span className="font-medium">Start - Server Functions</span>
                    </Link>

                    <Link
                        to="/todo"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
                        activeProps={{
                            className:
                                'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
                        }}
                    >
                        <ClipboardCheck size={20} />
                        <span className="font-medium">Todo List</span>
                    </Link>

                    <div className="flex flex-row justify-between">
                        <Link
                            to="/demo/start/ssr"
                            onClick={() => setIsOpen(false)}
                            className="flex-1 flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
                            activeProps={{
                                className:
                                    'flex-1 flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
                            }}
                        >
                            <StickyNote size={20} />
                            <span className="font-medium">Start - SSR Demos</span>
                        </Link>
                        <button
                            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                            onClick={() =>
                                setGroupedExpanded((prev) => ({
                                    ...prev,
                                    StartSSRDemo: !prev.StartSSRDemo,
                                }))
                            }
                        >
                            {groupedExpanded.StartSSRDemo ? (
                                <ChevronDown size={20} />
                            ) : (
                                <ChevronRight size={20} />
                            )}
                        </button>
                    </div>
                    {groupedExpanded.StartSSRDemo && (
                        <div className="flex flex-col ml-4">
                            <Link
                                to="/demo/start/ssr/spa-mode"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
                                activeProps={{
                                    className:
                                        'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
                                }}
                            >
                                <StickyNote size={20} />
                                <span className="font-medium">SPA Mode</span>
                            </Link>

                            <Link
                                to="/demo/start/ssr/full-ssr"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
                                activeProps={{
                                    className:
                                        'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
                                }}
                            >
                                <StickyNote size={20} />
                                <span className="font-medium">Full SSR</span>
                            </Link>

                            <Link
                                to="/demo/start/ssr/data-only"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
                                activeProps={{
                                    className:
                                        'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
                                }}
                            >
                                <StickyNote size={20} />
                                <span className="font-medium">Data Only</span>
                            </Link>
                        </div>
                    )}

                    {/* Demo Links End */}
                </nav>
            </aside>
        </>
    )
}
