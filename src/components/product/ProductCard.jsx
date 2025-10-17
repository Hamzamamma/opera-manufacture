import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart, onToggleWishlist }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    if (onToggleWishlist) {
      onToggleWishlist(product.id);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (onAddToCart) {
      onAddToCart({ ...product, selectedColor });
    }
  };

  const discount = product.salePrice
    ? Math.round(((product.basePrice - product.salePrice) / product.basePrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <Link to={`/prodotti/${product.id}`}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/40 backdrop-blur-xl border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300 shadow-lg hover:shadow-pink-500/20">
          {/* Badges */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            {product.isNew && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold shadow-lg"
              >
                NUOVO
              </motion.div>
            )}
            {product.salePrice && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold shadow-lg"
              >
                -{discount}%
              </motion.div>
            )}
            {product.trending && !product.isNew && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold shadow-lg"
              >
                TREND
              </motion.div>
            )}
          </div>

          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlistToggle}
            className={`absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
              isWishlisted
                ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/50'
                : 'bg-black/50 text-white hover:bg-pink-500/80'
            }`}
          >
            <FiHeart className={isWishlisted ? 'fill-current' : ''} size={18} />
          </motion.button>

          {/* Product Image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-gray-800/50">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin" />
              </div>
            )}
            <motion.img
              src={product.images[0]}
              alt={product.name}
              className={`w-full h-full object-cover transition-all duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />

            {/* Gradient Overlay on Hover */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-pink-500/30 via-purple-500/20 to-transparent"
              transition={{ duration: 0.3 }}
            />

            {/* Quick View Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute inset-x-0 bottom-0 p-4 flex gap-2"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:shadow-pink-500/50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FiShoppingCart size={18} />
                <span>Aggiungi</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="p-5">
            {/* Category */}
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
              {product.subcategory}
            </p>

            {/* Product Name */}
            <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-400 transition-all duration-300">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-400 mb-4 line-clamp-2">
              {product.description}
            </p>

            {/* Color Selector */}
            {product.colors.length > 1 && product.colors[0] !== 'Multicolor' && (
              <div className="flex gap-2 mb-4">
                {product.colors.slice(0, 5).map((color, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedColor(color);
                    }}
                    className={`w-7 h-7 rounded-full border-2 transition-all duration-300 ${
                      selectedColor === color
                        ? 'border-pink-500 ring-2 ring-pink-500/30'
                        : 'border-gray-600 hover:border-gray-400'
                    }`}
                    style={{
                      backgroundColor: color === 'Gradient' ? 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)' : color,
                      backgroundImage: color === 'Gradient' ? 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)' : 'none'
                    }}
                  />
                ))}
                {product.colors.length > 5 && (
                  <span className="text-xs text-gray-400 self-center">
                    +{product.colors.length - 5}
                  </span>
                )}
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-3">
              {product.salePrice ? (
                <>
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                    €{product.salePrice.toFixed(2)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    €{product.basePrice.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-white">
                  €{product.basePrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            {product.stock === 'low_stock' && (
              <p className="text-xs text-orange-400 mt-2 flex items-center gap-1">
                <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                Pochi disponibili
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
