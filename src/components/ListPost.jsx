import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock data for demonstration
const generateMockData = () => {
    const titles = [
        "Kenali Tingkatan Influencers berdasarkan Jumlah Followers",
        "Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer Marketing yang Tepat",
        "Tips Memilih Influencer yang Tepat untuk Brand Anda",
        "Strategi Content Marketing di Era Digital",
        "Cara Mengukur ROI dari Influencer Marketing",
        "Panduan Lengkap Social Media Marketing untuk Pemula",
        "Tren Terbaru dalam Dunia Digital Marketing",
        "Mengoptimalkan Engagement Rate di Social Media"
    ];

    const data = [];
    for (let i = 1; i <= 100; i++) {
        data.push({
            id: i,
            title: titles[Math.floor(Math.random() * titles.length)],
            date: new Date(2022, 8, Math.floor(Math.random() * 30) + 1),
            image: `https://picsum.photos/300/200?random=${i}`,
            category: "Digital Marketing"
        });
    }
    return data;
};

const LazyImage = ({ src, alt, className }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={imgRef} className={className}>
            {isInView && (
                <img
                    src={src}
                    alt={alt}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    onLoad={() => setIsLoaded(true)}
                />
            )}
            {!isLoaded && isInView && (
                <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                    <div className="text-gray-400">Loading...</div>
                </div>
            )}
        </div>
    );
};

const ListPost = () => {
    const [posts] = useState(generateMockData());
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortBy, setSortBy] = useState('newest');
    const [isPerPageOpen, setIsPerPageOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);

    // Sort posts based on selected option
    const sortedPosts = [...posts].sort((a, b) => {
        if (sortBy === 'newest') {
            return new Date(b.date) - new Date(a.date);
        } else if (sortBy === 'oldest') {
            return new Date(a.date) - new Date(b.date);
        }
        return 0;
    });

    // Calculate pagination
    const totalItems = sortedPosts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPosts = sortedPosts.slice(startIndex, endIndex);

    // Reset to first page when items per page or sort changes
    useEffect(() => {
        setCurrentPage(1);
    }, [itemsPerPage, sortBy]);

    // Format date
    const formatDate = (date) => {
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="w-full">
            {/* Header with controls */}
            <div className="flex justify-between items-center mb-8">
                <div className="text-sm text-gray-600">
                    Showing {startIndex + 1} - {Math.min(endIndex, totalItems)} of {totalItems}
                </div>

                <div className="flex items-center space-x-6">
                    {/* Items per page dropdown */}
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Show per page:</span>
                        <div className="relative">
                            <button
                                onClick={() => setIsPerPageOpen(!isPerPageOpen)}
                                className="flex items-center space-x-2 px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50"
                            >
                                <span>{itemsPerPage}</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            {isPerPageOpen && (
                                <div className="absolute right-0 mt-1 w-16 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                    {[10, 20, 50].map((num) => (
                                        <button
                                            key={num}
                                            onClick={() => {
                                                setItemsPerPage(num);
                                                setIsPerPageOpen(false);
                                            }}
                                            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sort dropdown */}
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Sort by:</span>
                        <div className="relative">
                            <button
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="flex items-center space-x-2 px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50"
                            >
                                <span>{sortBy === 'newest' ? 'Newest' : 'Oldest'}</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            {isSortOpen && (
                                <div className="absolute right-0 mt-1 w-20 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                    <button
                                        onClick={() => {
                                            setSortBy('newest');
                                            setIsSortOpen(false);
                                        }}
                                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                                    >
                                        Newest
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSortBy('oldest');
                                            setIsSortOpen(false);
                                        }}
                                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                                    >
                                        Oldest
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {currentPosts.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        {/* Image with consistent aspect ratio */}
                        <div className="aspect-[4/3] relative">
                            <LazyImage
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full"
                            />
                        </div>

                        {/* Card content */}
                        <div className="p-4">
                            <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
                                {formatDate(post.date)}
                            </div>
                            <h3 className="text-sm font-medium text-gray-900 leading-tight line-clamp-3">
                                {post.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-1">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                        {page === '...' ? (
                            <span className="px-3 py-2 text-gray-500">...</span>
                        ) : (
                            <button
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-2 rounded-md text-sm ${currentPage === page
                                        ? 'bg-orange-500 text-white'
                                        : 'hover:bg-gray-100 text-gray-700'
                                    }`}
                            >
                                {page}
                            </button>
                        )}
                    </React.Fragment>
                ))}

                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Custom CSS for line clamping */}
            <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
        </div>
    );
};

export default ListPost;