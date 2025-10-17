import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiX } from 'react-icons/fi';

const ProductFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    colors: true,
    sizes: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const categories = [
    'Abbigliamento',
    'Accessori',
    'Casa & Arredamento',
    'Tech'
  ];

  const colors = [
    { name: 'Nero', hex: '#000000' },
    { name: 'Bianco', hex: '#FFFFFF' },
    { name: 'Rosa', hex: '#EC4899' },
    { name: 'Viola', hex: '#8B5CF6' },
    { name: 'Blu', hex: '#3B82F6' },
    { name: 'Grigio', hex: '#6B7280' }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const FilterSection = ({ title, isExpanded, onToggle, children }) => (
    <div className="border-b border-gray-700/50">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left hover:text-pink-400 transition-colors duration-300"
      >
        <span className="text-sm font-bold text-white uppercase tracking-wider">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FiChevronDown className="text-gray-400" size={18} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="sticky top-24">
      <div className="rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            Filtri
          </h2>
          {(filters.categories.length > 0 ||
            filters.colors.length > 0 ||
            filters.sizes.length > 0 ||
            filters.priceRange[0] > 0 ||
            filters.priceRange[1] < 100) && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClearFilters}
              className="text-xs text-gray-400 hover:text-pink-400 transition-colors duration-300 flex items-center gap-1"
            >
              <FiX size={14} />
              <span>Cancella</span>
            </motion.button>
          )}
        </div>

        {/* Category Filter */}
        <FilterSection
          title="Categoria"
          isExpanded={expandedSections.category}
          onToggle={() => toggleSection('category')}
        >
          <div className="space-y-2">
            {categories.map((category) => (
              <motion.label
                key={category}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={(e) => {
                    const newCategories = e.target.checked
                      ? [...filters.categories, category]
                      : filters.categories.filter(c => c !== category);
                    onFilterChange({ ...filters, categories: newCategories });
                  }}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-pink-500 focus:ring-2 focus:ring-pink-500/50 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                  {category}
                </span>
              </motion.label>
            ))}
          </div>
        </FilterSection>

        {/* Price Range Filter */}
        <FilterSection
          title="Prezzo"
          isExpanded={expandedSections.price}
          onToggle={() => toggleSection('price')}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Min</span>
              <span className="text-white font-bold">
                €{filters.priceRange[0]}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.priceRange[0]}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value < filters.priceRange[1]) {
                  onFilterChange({
                    ...filters,
                    priceRange: [value, filters.priceRange[1]]
                  });
                }
              }}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
              style={{
                background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${filters.priceRange[0]}%, #374151 ${filters.priceRange[0]}%, #374151 100%)`
              }}
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Max</span>
              <span className="text-white font-bold">
                €{filters.priceRange[1]}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.priceRange[1]}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value > filters.priceRange[0]) {
                  onFilterChange({
                    ...filters,
                    priceRange: [filters.priceRange[0], value]
                  });
                }
              }}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
              style={{
                background: `linear-gradient(to right, #374151 0%, #374151 ${filters.priceRange[1]}%, #8b5cf6 ${filters.priceRange[1]}%, #8b5cf6 100%)`
              }}
            />
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-gray-500">€0</span>
              <span className="text-xs text-gray-500">€100+</span>
            </div>
          </div>
        </FilterSection>

        {/* Color Filter */}
        <FilterSection
          title="Colori"
          isExpanded={expandedSections.colors}
          onToggle={() => toggleSection('colors')}
        >
          <div className="grid grid-cols-6 gap-3">
            {colors.map((color) => (
              <motion.button
                key={color.hex}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  const newColors = filters.colors.includes(color.hex)
                    ? filters.colors.filter(c => c !== color.hex)
                    : [...filters.colors, color.hex];
                  onFilterChange({ ...filters, colors: newColors });
                }}
                className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  filters.colors.includes(color.hex)
                    ? 'border-pink-500 ring-2 ring-pink-500/30 scale-110'
                    : 'border-gray-600 hover:border-gray-400'
                } ${color.hex === '#FFFFFF' ? 'bg-white' : ''}`}
                style={{
                  backgroundColor: color.hex === '#FFFFFF' ? '#FFFFFF' : color.hex
                }}
                title={color.name}
              />
            ))}
          </div>
        </FilterSection>

        {/* Size Filter */}
        <FilterSection
          title="Taglie"
          isExpanded={expandedSections.sizes}
          onToggle={() => toggleSection('sizes')}
        >
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <motion.button
                key={size}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const newSizes = filters.sizes.includes(size)
                    ? filters.sizes.filter(s => s !== size)
                    : [...filters.sizes, size];
                  onFilterChange({ ...filters, sizes: newSizes });
                }}
                className={`py-2 px-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                  filters.sizes.includes(size)
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/30'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                }`}
              >
                {size}
              </motion.button>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  );
};

export default ProductFilters;
