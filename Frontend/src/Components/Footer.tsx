import React from 'react'
import { ExternalLink } from "lucide-react"

const Footer = () => {
    return (
        <footer id="google_translate_element" className="bg-gray-800 text-white py-1 rounded-tl-xl">
            <div className="container mx-auto px-4">
                <p className="text-center text-sm md:text-base mb-4">A big shout out to our data sources and tools:</p>
                <div className="flex flex-wrap justify-center gap-4 mb-4">
                    <a
                        href="https://prsindia.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center hover:text-blue-400 transition duration-300"
                    >
                        prsindia.org
                        <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                    <a
                        href="https://www.maptiler.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center hover:text-blue-400 transition duration-300"
                    >
                        maptiler.com
                        <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                    <a
                        href="https://www.leafletjs.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center hover:text-blue-400 transition duration-300"
                    >
                        leafletjs.com
                        <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                </div>
                <p className="text-center text-xs text-gray-400">
                    © {new Date().getFullYear()} MLA Finder. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer