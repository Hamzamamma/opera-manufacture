import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiGrid, FiFilter } from 'react-icons/fi';
import ProductCard from '../components/product/ProductCard';
import ProductFilters from '../components/product/ProductFilters';
import { products } from '../data/products';
import '../components/product/product-styles.css';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid-3');
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    categories: [],
    colors: [],
    sizes: [],
    priceRange: [0, 100]
  });

  const productsPerPage = 12;

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category)
      );
    }

    // Color filter
    if (filters.colors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors.some(color => filters.colors.includes(color))
      );
    }

    // Size filter
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes.some(size => filters.sizes.includes(size))
      );
    }

    // Price filter
    filtered = filtered.filter(product => {
      const price = product.salePrice || product.basePrice;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = a.salePrice || a.basePrice;
          const priceB = b.salePrice || b.basePrice;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = a.salePrice || a.basePrice;
          const priceB = b.salePrice || b.basePrice;
          return priceB - priceA;
        });
        break;
      case 'popular':
        filtered.sort((a, b) => {
          if (a.trending && !b.trending) return -1;
          if (!a.trending && b.trending) return 1;
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return b.id - a.id;
        });
        break;
    }

    return filtered;
  }, [products, searchQuery, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      colors: [],
      sizes: [],
      priceRange: [0, 100]
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const gridColsClass = {
    'grid-2': 'grid-cols-1 md:grid-cols-2',
    'grid-3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    'grid-4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10" />
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-4">
              Catalogo Prodotti
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Scopri la nostra collezione esclusiva di prodotti print-on-demand.
              Design unici e qualità premium.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Controls Bar */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Cerca prodotti..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-12 pr-4 py-4 bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-4 bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 cursor-pointer"
            >
              <option value="newest">Più Recenti</option>
              <option value="popular">Più Popolari</option>
              <option value="price-low">Prezzo: Basso-Alto</option>
              <option value="price-high">Prezzo: Alto-Basso</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              {['grid-2', 'grid-3', 'grid-4'].map((mode) => (
                <motion.button
                  key={mode}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode(mode)}
                  className={`p-4 rounded-xl transition-all duration-300 ${
                    viewMode === mode
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                      : 'bg-gray-900/80 text-gray-400 hover:text-white border border-gray-700/50'
                  }`}
                >
                  <FiGrid size={20} />
                </motion.button>
              ))}

              {/* Mobile Filter Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden p-4 rounded-xl bg-gray-900/80 text-gray-400 hover:text-white border border-gray-700/50 transition-all duration-300"
              >
                <FiFilter size={20} />
              </motion.button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-gray-400">
              Mostrando <span className="text-white font-bold">{currentProducts.length}</span> di{' '}
              <span className="text-white font-bold">{filteredProducts.length}</span> prodotti
            </p>
            {(filters.categories.length > 0 ||
              filters.colors.length > 0 ||
              filters.sizes.length > 0 ||
              searchQuery ||
              filters.priceRange[0] > 0 ||
              filters.priceRange[1] < 100) && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearFilters}
                className="text-sm text-pink-400 hover:text-pink-300 transition-colors duration-300"
              >
                Cancella tutti i filtri
              </motion.button>
            )}
          </div>
        </div>

        {/* Products Grid with Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="lg:w-80 flex-shrink-0"
            >
              <ProductFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </motion.aside>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {currentProducts.length > 0 ? (
              <>
                <motion.div
                  className={`grid ${gridColsClass[viewMode]} gap-6`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {currentProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-6 py-3 rounded-xl bg-gray-900/80 text-white border border-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed hover:border-pink-500/50 transition-all duration-300"
                    >
                      Precedente
                    </motion.button>

                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <motion.button
                          key={page}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setCurrentPage(page)}
                          className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 ${
                            currentPage === page
                              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/30'
                              : 'bg-gray-900/80 text-gray-400 border border-gray-700/50 hover:border-pink-500/50'
                          }`}
                        >
                          {page}
                        </motion.button>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-6 py-3 rounded-xl bg-gray-900/80 text-white border border-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed hover:border-pink-500/50 transition-all duration-300"
                    >
                      Successivo
                    </motion.button>
                  </div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 mb-6">
                  <FiSearch className="text-pink-500" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Nessun prodotto trovato
                </h3>
                <p className="text-gray-400 mb-6">
                  Prova a modificare i filtri o la ricerca
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClearFilters}
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
                >
                  Cancella Filtri
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
