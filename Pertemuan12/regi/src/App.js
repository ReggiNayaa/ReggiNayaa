import React, { useState, useMemo } from 'react';

// Data buku bisa diletakkan di luar komponen agar tidak dibuat ulang pada setiap render
const allBooks = [
    {
        id: 1,
        title: 'Menguasai Pemrograman Berorientasi Objek',
        author: 'Ade Rahmat Iskandar',
        publisher: 'Informatika',
        year: 2020,
        image: 'https://placehold.co/400x600/3498db/ffffff?text=OOP'
    },
    {
        id: 2,
        title: 'Dasar-Dasar Pemrograman dengan .NET',
        author: 'Ade Rahmat Iskandar',
        publisher: 'Informatika',
        year: 2019,
        image: 'https://placehold.co/400x600/2ecc71/ffffff?text=.NET'
    },
    {
        id: 3,
        title: 'Metodologi Pengembangan Sistem Informasi',
        author: 'Samiaji Sarosa',
        publisher: 'Indeks',
        year: 2017,
        image: 'https://placehold.co/400x600/9b59b6/ffffff?text=Sistem+Info'
    },
    {
        id: 4,
        title: 'Struktur Data',
        author: 'Rosa A.S',
        publisher: 'Modula',
        year: 2018,
        image: 'https://placehold.co/400x600/f1c40f/ffffff?text=Struktur+Data'
    },
    {
        id: 5,
        title: 'Dasar Pemrograman Python 3',
        author: 'Abdul Kadir',
        publisher: 'Andi Publisher',
        year: 2018,
        image: 'https://placehold.co/400x600/e74c3c/ffffff?text=Python+3'
    },
    {
        id: 6,
        title: 'Teori Dan Praktek Sistem Operasi',
        author: 'Zaid Romegar Mair',
        publisher: 'Deeppublish',
        year: 2018,
        image: 'https://placehold.co/400x600/1abc9c/ffffff?text=Sistem+Operasi'
    },
    {
        id: 7,
        title: 'Sistem Basis Data Dan Sql',
        author: 'Didik Setyadi',
        publisher: 'Mitra Wacana Media',
        year: 2022,
        image: 'https://placehold.co/400x600/34495e/ffffff?text=SQL'
    }
];

// Tentukan buku populer berdasarkan ID atau judul
const popularBooks = [
    allBooks.find(b => b.title === 'Menguasai Pemrograman Berorientasi Objek'),
    allBooks.find(b => b.title === 'Dasar Pemrograman Python 3'),
    allBooks.find(b => b.title === 'Sistem Basis Data Dan Sql')
];

// Komponen untuk menampilkan satu kartu buku
function BookCard({ book }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
            <img src={book.image} alt={`Sampul buku ${book.title}`} className="w-full h-64 object-cover" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x600/cccccc/ffffff?text=Image+Not+Found'; }} />
            <div className="p-4">
                <h3 className="font-bold text-lg truncate" title={book.title}>{book.title}</h3>
                <p className="text-gray-700 text-sm mt-1">Penulis: {book.author}</p>
                <p className="text-gray-500 text-sm mt-1">Penerbit: {book.publisher}</p>
                <p className="text-gray-500 text-sm mt-1">Tahun: {book.year}</p>
            </div>
        </div>
    );
}

// Komponen utama aplikasi
export default function App() {
    // State untuk menyimpan input pencarian
    const [searchTerm, setSearchTerm] = useState('');
    const [yearTerm, setYearTerm] = useState('');
    const [searchType, setSearchType] = useState('title');

    // Memoize hasil filter untuk meningkatkan performa
    const filteredBooks = useMemo(() => {
        // Jika tidak ada filter, kembalikan semua buku
        if (!searchTerm && (searchType !== 'titleYear' || !yearTerm)) {
            return allBooks;
        }

        return allBooks.filter(book => {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            
            const titleMatch = book.title.toLowerCase().includes(lowerCaseSearchTerm);
            const authorMatch = book.author.toLowerCase().includes(lowerCaseSearchTerm);
            const publisherMatch = book.publisher.toLowerCase().includes(lowerCaseSearchTerm);
            const yearMatch = yearTerm ? book.year.toString() === yearTerm : true;

            switch (searchType) {
                case 'title':
                    return titleMatch;
                case 'author':
                    return authorMatch;
                case 'publisher':
                    return publisherMatch;
                case 'titleYear':
                    // Pencarian 'Judul & Tahun' aktif jika ada input di salah satu atau kedua bidang
                    if(searchTerm && yearTerm) return titleMatch && yearMatch;
                    if(searchTerm) return titleMatch;
                    if(yearTerm) return yearMatch;
                    return true; // Tampilkan semua jika kedua field kosong saat opsi ini dipilih
                default:
                    return true;
            }
        });
    }, [searchTerm, yearTerm, searchType]);
    
    const isYearInputDisabled = searchType !== 'titleYear';

    return (
        <div className="bg-gray-100 text-gray-800 font-sans">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                
                {/* Header Pencarian */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">Pencarian Buku</h1>
                    <p className="text-gray-600 mb-6">Cari koleksi buku berdasarkan kriteria yang Anda inginkan.</p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Masukkan kata kunci..."
                            className="flex-grow w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Tahun"
                            className="w-full sm:w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
                            value={yearTerm}
                            onChange={(e) => setYearTerm(e.target.value)}
                            disabled={isYearInputDisabled}
                        />
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        <span className="font-semibold">Cari berdasarkan:</span>
                        {['title', 'author', 'publisher', 'titleYear'].map(type => (
                            <div key={type} className="flex items-center">
                                <input
                                    type="radio"
                                    id={type}
                                    name="searchType"
                                    value={type}
                                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    checked={searchType === type}
                                    onChange={(e) => setSearchType(e.target.value)}
                                />
                                <label htmlFor={type} className="ml-2 block text-sm text-gray-900 capitalize">
                                    {type === 'titleYear' ? 'Judul & Tahun' : type}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bagian Populer */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 border-b pb-2">Populer</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {popularBooks.map(book => <BookCard key={`popular-${book.id}`} book={book} />)}
                    </div>
                </div>

                {/* Bagian Buku Kami */}
                <div>
                    <h2 className="text-2xl font-bold mb-4 border-b pb-2">Buku Kami</h2>
                    {filteredBooks.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                           {filteredBooks.map(book => <BookCard key={book.id} book={book} />)}
                        </div>
                    ) : (
                         <div className="text-center py-10">
                            <h2 className="text-xl font-semibold text-gray-700">Tidak ada hasil</h2>
                            <p className="text-gray-500 mt-2">Coba gunakan kata kunci atau filter yang berbeda.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
