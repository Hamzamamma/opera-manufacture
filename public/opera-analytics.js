/**
 * Opera Manufacture Analytics & Tracking System
 * Comprehensive tracking solution for e-commerce and creator platform
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        apiEndpoint: '/api/analytics',
        sessionTimeout: 30 * 60 * 1000, // 30 minutes
        batchSize: 10,
        flushInterval: 5000, // 5 seconds
        enabled: true
    };

    // Analytics Core
    const OperaAnalytics = {
        version: '1.0.0',
        sessionId: null,
        userId: null,
        eventQueue: [],
        sessionData: {},

        // Initialize
        init: function(options = {}) {
            Object.assign(CONFIG, options);

            this.sessionId = this.getOrCreateSession();
            this.userId = this.getUserId();
            this.setupListeners();
            this.startFlushTimer();

            // Track page view on init
            this.tracking.pageView();

            console.log('[Opera Analytics] Initialized', {
                sessionId: this.sessionId,
                userId: this.userId,
                version: this.version
            });
        },

        // Session Management
        getOrCreateSession: function() {
            let sessionId = this.getCookie('om_session_id');

            if (!sessionId) {
                sessionId = this.generateId();
                this.setCookie('om_session_id', sessionId, 30); // 30 days
            }

            return sessionId;
        },

        getUserId: function() {
            return this.getCookie('om_user_id') || null;
        },

        setUserId: function(userId) {
            this.userId = userId;
            this.setCookie('om_user_id', userId, 365); // 1 year
        },

        // Event Tracking
        tracking: {
            // Page view tracking
            pageView: function(data = {}) {
                OperaAnalytics.track('page_view', {
                    url: window.location.href,
                    path: window.location.pathname,
                    title: document.title,
                    referrer: document.referrer,
                    ...data
                });
            },

            // Product tracking
            viewProduct: function(product) {
                OperaAnalytics.track('view_product', {
                    product_id: product.id,
                    product_name: product.name,
                    product_category: product.category,
                    product_price: product.price,
                    currency: product.currency || 'EUR'
                });
            },

            addToCart: function(product, quantity = 1) {
                OperaAnalytics.track('add_to_cart', {
                    product_id: product.id,
                    product_name: product.name,
                    product_price: product.price,
                    quantity: quantity,
                    currency: product.currency || 'EUR'
                });
            },

            removeFromCart: function(product, quantity = 1) {
                OperaAnalytics.track('remove_from_cart', {
                    product_id: product.id,
                    product_name: product.name,
                    quantity: quantity
                });
            },

            beginCheckout: function(cart) {
                OperaAnalytics.track('begin_checkout', {
                    cart_value: cart.total,
                    item_count: cart.items.length,
                    currency: cart.currency || 'EUR',
                    items: cart.items
                });
            },

            purchase: function(order) {
                OperaAnalytics.track('purchase', {
                    transaction_id: order.id,
                    value: order.total,
                    currency: order.currency || 'EUR',
                    tax: order.tax,
                    shipping: order.shipping,
                    items: order.items
                });
            },

            // User actions
            signup: function(method = 'email') {
                OperaAnalytics.track('signup', {
                    method: method,
                    timestamp: new Date().toISOString()
                });
            },

            login: function(method = 'email') {
                OperaAnalytics.track('login', {
                    method: method,
                    timestamp: new Date().toISOString()
                });
            },

            logout: function() {
                OperaAnalytics.track('logout', {
                    timestamp: new Date().toISOString()
                });
            },

            // Custom events
            customEvent: function(eventName, data = {}) {
                OperaAnalytics.track(eventName, data);
            },

            // Search tracking
            search: function(query, results = 0) {
                OperaAnalytics.track('search', {
                    query: query,
                    results_count: results
                });
            },

            // Click tracking
            click: function(element, data = {}) {
                OperaAnalytics.track('click', {
                    element_id: element.id,
                    element_class: element.className,
                    element_text: element.textContent?.substring(0, 100),
                    ...data
                });
            }
        },

        // Core track function
        track: function(eventName, data = {}) {
            if (!CONFIG.enabled) return;

            const event = {
                event: eventName,
                timestamp: new Date().toISOString(),
                session_id: this.sessionId,
                user_id: this.userId,
                page_url: window.location.href,
                page_title: document.title,
                user_agent: navigator.userAgent,
                screen_resolution: `${window.screen.width}x${window.screen.height}`,
                viewport_size: `${window.innerWidth}x${window.innerHeight}`,
                ...data
            };

            this.eventQueue.push(event);

            // Auto-flush if queue is full
            if (this.eventQueue.length >= CONFIG.batchSize) {
                this.flush();
            }

            console.log('[Opera Analytics] Event tracked:', eventName, data);
        },

        // Flush events to server
        flush: function() {
            if (this.eventQueue.length === 0) return;

            const events = [...this.eventQueue];
            this.eventQueue = [];

            // Send to server
            if (navigator.sendBeacon) {
                navigator.sendBeacon(CONFIG.apiEndpoint, JSON.stringify(events));
            } else {
                fetch(CONFIG.apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(events),
                    keepalive: true
                }).catch(err => {
                    console.error('[Opera Analytics] Failed to send events:', err);
                });
            }
        },

        // Setup event listeners
        setupListeners: function() {
            // Track clicks on important elements
            document.addEventListener('click', (e) => {
                const target = e.target;

                // Track CTA buttons
                if (target.classList.contains('btn-primary') ||
                    target.classList.contains('cta-button')) {
                    this.tracking.click(target, {
                        type: 'cta_button'
                    });
                }

                // Track navigation clicks
                if (target.tagName === 'A') {
                    this.tracking.click(target, {
                        type: 'link',
                        href: target.href
                    });
                }
            });

            // Track page visibility changes
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    this.track('page_hidden');
                    this.flush(); // Flush on hide
                } else {
                    this.track('page_visible');
                }
            });

            // Track before unload
            window.addEventListener('beforeunload', () => {
                this.flush();
            });

            // Track scroll depth
            let maxScroll = 0;
            window.addEventListener('scroll', () => {
                const scrollPercent = Math.round(
                    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
                );

                if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
                    maxScroll = scrollPercent;
                    this.track('scroll_depth', {
                        percent: scrollPercent
                    });
                }
            });
        },

        // Start flush timer
        startFlushTimer: function() {
            setInterval(() => {
                this.flush();
            }, CONFIG.flushInterval);
        },

        // Utility functions
        generateId: function() {
            return 'om_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        },

        setCookie: function(name, value, days) {
            const expires = new Date(Date.now() + days * 864e5).toUTCString();
            document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; domain=.operamanufacture.com; SameSite=Lax`;
        },

        getCookie: function(name) {
            const cookies = document.cookie.split('; ');
            for (let i = 0; i < cookies.length; i++) {
                const [cookieName, cookieValue] = cookies[i].split('=');
                if (cookieName === name) {
                    return decodeURIComponent(cookieValue);
                }
            }
            return null;
        },

        // UTM Parameter tracking
        getUTMParams: function() {
            const params = new URLSearchParams(window.location.search);
            const utmParams = {};

            ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
                if (params.has(param)) {
                    utmParams[param] = params.get(param);
                }
            });

            return Object.keys(utmParams).length > 0 ? utmParams : null;
        }
    };

    // Expose to window
    window.OperaAnalytics = OperaAnalytics;

    // Auto-init if config exists
    if (window.OperaAnalyticsConfig) {
        OperaAnalytics.init(window.OperaAnalyticsConfig);
    }
})();
