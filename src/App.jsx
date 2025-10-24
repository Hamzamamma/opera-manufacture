import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Pricing from './pages/Pricing';
import Memberships from './pages/Memberships';
import Auth from './pages/Auth';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white flex flex-col">
      <Routes>
        {/* Auth Routes (without Header/Footer) */}
        <Route path="/start" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />

        {/* Main Routes (with Header/Footer) */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <main className="flex-grow">
                <Routes>
                  {/* Home Route */}
                  <Route path="/" element={<Home />} />

                  {/* Products Routes */}
                  <Route path="/products" element={<Products />} />
                  <Route path="/prodotti" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/prodotti/:id" element={<ProductDetail />} />

                  {/* Memberships & Pricing Routes */}
                  <Route path="/memberships" element={<Memberships />} />
                  <Route path="/pricing" element={<Pricing />} />

                  {/* Placeholder routes for navigation */}
                  <Route path="/websites" element={<div className="section-container section-padding"><h1 className="heading-lg">Website Builder - Coming Soon</h1></div>} />
                  <Route path="/shops" element={<div className="section-container section-padding"><h1 className="heading-lg">Shops - Coming Soon</h1></div>} />
                  <Route path="/examples" element={<div className="section-container section-padding"><h1 className="heading-lg">Examples - Coming Soon</h1></div>} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
    </LanguageProvider>
  );
}

export default App;
