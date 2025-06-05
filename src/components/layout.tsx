import { Link } from 'react-router-dom';
import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="antialiased min-h-screen flex flex-col">
            <header className="bg-black p-4">
                <nav className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-white text-2xl font-bold">
                        <Link to="/">MovieApp</Link>
                    </h1>
                </nav>
            </header>

            <main className="flex-grow w-full px-4">{children}</main>

            <footer className="bg-black p-4 text-white text-center">
                <p>© 2025 MovieApp. Frontend training</p>
            </footer>
        </div>
    );
}