import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiChevronLeft,
  FiChevronRight,
  FiShoppingCart,
  FiHeart,
  FiMinus,
  FiPlus,
  FiCheck,
  FiTruck,
  FiRefreshCw,
  FiShield
} from 'react-icons/fi';
import { getProductById } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import { products } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState('details');

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      if (product.sizes.length > 0 && product.sizes[0] !== 'Unica') {
        setSelectedSize(product.sizes[2] || product.sizes[0]);
      }
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Prodotto non trovato</h2>
          <button
            onClick={() => navigate('/prodotti')}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl"
          >
            Torna al catalogo
          </button>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, Math.min(10, quantity + delta)));
  };

  const AccordionSection = ({ id, title, children, icon: Icon }) => {
    const isActive = activeAccordion === id;
    return (
      <div className="border-b border-gray-700/50">
        <button
          onClick={() => setActiveAccordion(isActive ? null : id)}
          className="w-full flex items-center justify-between py-5 text-left hover:text-pink-400 transition-colors duration-300"
        >
          <div className="flex items-center gap-3">
            <Icon className="text-pink-500" size={20} />
            <span className="text-lg font-bold text-white">{title}</span>
          </div>
          <motion.div
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FiChevronRight className="text-gray-400" size={20} />
          </motion.div>
        </button>
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pb-5 text-gray-400">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Breadcrumb */}
      <div className="bg-gray-900/50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-400 hover:text-pink-400 transition-colors duration-300">
              Home
            </Link>
            <FiChevronRight className="text-gray-600" size={14} />
            <Link to="/prodotti" className="text-gray-400 hover:text-pink-400 transition-colors duration-300">
              Prodotti
            </Link>
            <FiChevronRight className="text-gray-600" size={14} />
            <span className="text-white font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              className="relative aspect-square rounded-2xl overflow-hidden bg-gray-900/50 border border-gray-700/50"
              layoutId={`product-image-${product.id}`}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedImage((selectedImage - 1 + product.images.length) % product.images.length)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-pink-500/80 transition-all duration-300"
                  >
                    <FiChevronLeft size={24} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedImage((selectedImage + 1) % product.images.length)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-pink-500/80 transition-all duration-300"
                  >
                    <FiChevronRight size={24} />
                  </motion.button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <div className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold">
                    NUOVO
                  </div>
                )}
                {product.salePrice && (
                  <div className="px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold">
                    SCONTO
                  </div>
                )}
              </div>
            </motion.div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index
                        ? 'border-pink-500 ring-2 ring-pink-500/30'
                        : 'border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category */}
            <p className="text-sm text-gray-400 uppercase tracking-wider">
              {product.subcategory}
            </p>

            {/* Product Name */}
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4">
              {product.salePrice ? (
                <>
                  <span className="text-4xl font-bold text-white">
                    €{product.salePrice.toFixed(2)}
                  </span>
                  <span className="text-2xl text-gray-500 line-through">
                    €{product.basePrice.toFixed(2)}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-bold">
                    -{Math.round(((product.basePrice - product.salePrice) / product.basePrice) * 100)}%
                  </span>
                </>
              ) : (
                <span className="text-4xl font-bold text-white">
                  €{product.basePrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-lg text-gray-300 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            {product.colors.length > 0 && product.colors[0] !== 'Multicolor' && (
              <div>
                <label className="block text-sm font-bold text-white mb-3">
                  Colore: <span className="text-pink-400">{selectedColor}</span>
                </label>
                <div className="flex gap-3">
                  {product.colors.map((color, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                        selectedColor === color
                          ? 'border-pink-500 ring-4 ring-pink-500/30 scale-110'
                          : 'border-gray-600 hover:border-gray-400'
                      }`}
                      style={{
                        backgroundColor: color === 'Gradient' ? '#ec4899' : color,
                        backgroundImage: color === 'Gradient' ? 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)' : 'none'
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 0 && product.sizes[0] !== 'Unica' && (
              <div>
                <label className="block text-sm font-bold text-white mb-3">
                  Taglia
                </label>
                <div className="grid grid-cols-6 gap-3">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                        selectedSize === size
                          ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/30'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-bold text-white mb-3">
                Quantità
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-xl bg-gray-900/80 border border-gray-700/50">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleQuantityChange(-1)}
                    className="p-4 text-white hover:text-pink-400 transition-colors duration-300"
                  >
                    <FiMinus size={20} />
                  </motion.button>
                  <span className="px-8 text-xl font-bold text-white">
                    {quantity}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleQuantityChange(1)}
                    className="p-4 text-white hover:text-pink-400 transition-colors duration-300"
                  >
                    <FiPlus size={20} />
                  </motion.button>
                </div>
                <span className="text-gray-400">
                  (Max: 10)
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 py-5 px-8 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:shadow-pink-500/50 transition-all duration-300 flex items-center justify-center gap-3"
              >
                {addedToCart ? (
                  <>
                    <FiCheck size={24} />
                    <span>Aggiunto!</span>
                  </>
                ) : (
                  <>
                    <FiShoppingCart size={24} />
                    <span>Aggiungi al Carrello</span>
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-5 rounded-xl transition-all duration-300 ${
                  isWishlisted
                    ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/50'
                    : 'bg-gray-900/80 text-white hover:bg-pink-500/80 border border-gray-700/50'
                }`}
              >
                <FiHeart size={24} className={isWishlisted ? 'fill-current' : ''} />
              </motion.button>
            </div>

            {/* Product Info Accordion */}
            <div className="mt-8 rounded-2xl bg-gray-900/50 border border-gray-700/50 p-6">
              <AccordionSection id="details" title="Dettagli Prodotto" icon={FiShield}>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Materiali di alta qualità</li>
                  <li>Stampa duratura e resistente</li>
                  <li>Design esclusivo Opera Manufacture</li>
                  <li>Prodotto su richiesta</li>
                </ul>
              </AccordionSection>

              <AccordionSection id="shipping" title="Spedizione" icon={FiTruck}>
                <ul className="space-y-2">
                  <li>Spedizione gratuita sopra €50</li>
                  <li>Tempi di produzione: 3-5 giorni lavorativi</li>
                  <li>Tempi di spedizione: 5-7 giorni lavorativi</li>
                  <li>Tracking disponibile</li>
                </ul>
              </AccordionSection>

              <AccordionSection id="returns" title="Resi e Rimborsi" icon={FiRefreshCw}>
                <ul className="space-y-2">
                  <li>Resi entro 30 giorni dall'acquisto</li>
                  <li>Prodotto in condizioni originali</li>
                  <li>Rimborso completo garantito</li>
                  <li>Spese di spedizione per resi a carico del cliente</li>
                </ul>
              </AccordionSection>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-8">
              Prodotti Correlati
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
