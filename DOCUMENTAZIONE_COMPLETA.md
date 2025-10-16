# 📋 OPERA MANUFACTURE - DOCUMENTAZIONE COMPLETA

## 🏗️ STRUTTURA PROGETTO

### 📁 Cartelle Principali

```
opera-manufacture/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── api/               # API Routes
│   │   ├── auth/              # Pagine autenticazione
│   │   ├── creator/           # Dashboard creator
│   │   └── page.tsx           # Homepage
│   ├── components/            # UI Components
│   ├── config/                # Configurazioni
│   ├── hooks/                 # React Hooks
│   ├── lib/                   # Librerie utility
│   ├── providers/             # Context Providers
│   ├── styles/                # Stili globali
│   ├── types/                 # TypeScript Types
│   └── utils/                 # Utility functions
```

---

## 🔥 FIREBASE INTEGRATION

### 📝 File: `src/config/firebase.ts`

**Servizi Attivi:**
- ✅ **Authentication** (Email/Password + Google OAuth)
- ✅ **Firestore Database** (NoSQL database)
- ✅ **Storage** (File upload)
- ✅ **Analytics** (Optional)

**Credenziali:**
```javascript
Project ID: opera-manufacture
API Key: AIzaSyAVL3XMsbiB_axDkvgMJLnFRXm-yhPl4rk
Auth Domain: opera-manufacture.firebaseapp.com
Storage Bucket: opera-manufacture.firebasestorage.app
```

**Export:**
```typescript
export const auth      // Firebase Authentication
export const db        // Firestore Database
export const storage   // Firebase Storage
export const app       // Firebase App instance
```

---

## 🎨 PRINTFUL API INTEGRATION

### 📝 File: `src/config/printful.ts`

**API Configuration:**
```typescript
API URL: https://api.printful.com
API Key: dujIUYCfnI2Dk3JcqoZpoQwcZTCdziOqfbM4JozM
```

**Axios Client con:**
- ✅ Authorization header automatica
- ✅ Response/Error interceptors
- ✅ Timeout 30 secondi

---

## 🛠️ LIBRERIE PRINCIPALI

### 1️⃣ **src/lib/printful.ts** - Printful API Wrapper

**Funzioni Implementate:**

#### 📦 Catalog API
```typescript
getCatalogProducts()           // Lista tutti i prodotti Printful
getCatalogProduct(productId)   // Dettagli singolo prodotto
getCatalogVariants(productId)  // Varianti di un prodotto
```

#### 📦 Products API
```typescript
getProducts()                  // Lista prodotti sync store
getProduct(productId)          // Dettaglio prodotto sync
createProduct(data)            // Crea nuovo prodotto sync
updateProduct(productId, data) // Aggiorna prodotto sync
deleteProduct(productId)       // Elimina prodotto sync
```

#### 📦 Orders API
```typescript
getOrders(params)              // Lista ordini
getOrder(orderId)              // Dettaglio ordine
createOrder(orderData)         // Crea nuovo ordine
updateOrder(orderId, data)     // Aggiorna ordine
confirmOrder(orderId)          // Conferma ordine
cancelOrder(orderId)           // Cancella ordine
estimateOrderCosts(orderData)  // Stima costi ordine
```

#### 📦 Shipping API
```typescript
getShippingRates(data)         // Calcola tariffe spedizione
```

#### 📦 Webhooks API
```typescript
getWebhooks()                  // Lista webhooks
setupWebhook(url, types)       // Configura webhook
deleteWebhook(webhookId)       // Elimina webhook
```

#### 📦 Mockup Generator API
```typescript
createMockupTask(data)         // Crea task generazione mockup
getMockupTask(taskKey)         // Ottieni status task mockup
```

---

### 2️⃣ **src/lib/printful-mockup.ts** - Mockup Generation System

**Funzioni Principali:**

```typescript
generateProductMockup(options: MockupOptions)
// Genera mockup prodotto con design applicato
// Input:
// - productId: ID prodotto Printful
// - variantIds: Array di variant IDs
// - designUrl: URL design caricato
// - placement: Posizione design (front/back/etc)
// - position: (opzionale) Posizione custom design
// Output:
// - taskKey: Chiave task generazione
// - mockups: Array URL mockup generati
// - error: Eventuale errore

pollMockupTask(taskKey: string, maxAttempts: number = 30)
// Polling status generazione mockup
// Timeout: 30 tentativi x 2 secondi = 60 secondi max
// Ritorna mockup URLs quando ready

getOptimalPlacement(productId: number): PrintfulPlacement
// Suggerisce placement ottimale per prodotto
// Mapping intelligente per categorie prodotto
```

**Placement Types Supportati:**
```typescript
type PrintfulPlacement = string; // Flessibile per API Printful

// Esempi comuni:
"front"              // Fronte
"back"               // Retro
"left"               // Sinistra
"right"              // Destra
"sleeve_left"        // Manica sinistra
"sleeve_right"       // Manica destra
"embroidered_front"  // Ricamo fronte
"embroidered_back"   // Ricamo retro
"all_over"           // All-over print
```

---

### 3️⃣ **src/lib/design-upload.ts** - Design Upload System

**Funzioni Upload Design:**

```typescript
validateDesignFile(file: File)
// Valida file design prima upload
// Controlli:
// - Dimensione max: 50MB
// - Formati: PNG, JPG, SVG, PDF
// - Risoluzione min: 2000x2000px (per raster)
// Output: { valid, error, dimensions }

uploadDesign(file: File, creatorId: string, onProgress)
// Upload design su Firebase Storage
// Path: designs/{creatorId}/{timestamp}_{filename}
// Progress callback per UI
// Output: { url, error }

generateThumbnail(file: File)
// Genera thumbnail 400px max per preview
// Solo per immagini (non PDF/SVG)
// Output: { url, error }

saveDesignMetadata(designData: DesignMetadata)
// Salva metadata design in Firestore
// Collection: designs
// Output: { id, error }

updateDesignMetadata(designId: string, updates)
// Aggiorna metadata design esistente
// Output: { error }

uploadDesignComplete(file: File, creatorId: string, onProgress)
// Workflow completo upload:
// 1. Valida file
// 2. Upload su Storage
// 3. Genera thumbnail
// 4. Salva metadata Firestore
// Output: { designId, fileUrl, error }
```

**Design Metadata Schema:**
```typescript
interface DesignMetadata {
  designId?: string;
  creatorId: string;           // UID creator
  fileName: string;            // Nome file originale
  fileUrl: string;             // URL Firebase Storage
  thumbnailUrl?: string;       // URL thumbnail
  fileSize: number;            // Dimensione bytes
  mimeType: string;            // Tipo MIME
  dimensions: {
    width: number;
    height: number;
  };
  uploadedAt: Date;
  printfulProductId?: number;  // Prodotto associato
  placement?: string;          // Placement design
  mockupUrls?: string[];       // URLs mockup generati
  status: 'uploaded' | 'processing' | 'ready' | 'error';
}
```

---

### 4️⃣ **src/lib/firestore.ts** - Firestore Helpers

Utility per operazioni Firestore comuni.

---

### 5️⃣ **src/lib/storage.ts** - Storage Helpers

Utility per operazioni Firebase Storage.

---

### 6️⃣ **src/lib/auth.ts** - Auth Helpers

Utility per autenticazione e gestione utenti.

---

## 🔐 AUTENTICAZIONE

### 📝 File: `src/hooks/useAuth.ts`

**Custom Hook per Auth State:**
```typescript
const { user, loading } = useAuth();

// user: Firebase User object o null
// loading: true durante caricamento iniziale
```

**Metodi Firebase Auth Usati:**
```typescript
signInWithEmailAndPassword(auth, email, password)
signInWithPopup(auth, GoogleAuthProvider)
createUserWithEmailAndPassword(auth, email, password)
sendPasswordResetEmail(auth, email)
updateProfile(user, { displayName })
```

---

## 📄 PAGINE PRINCIPALI

### 1️⃣ Homepage: `src/app/page.tsx`

**Sezioni:**
- ✅ Hero section con CTA
- ✅ Features (3 cards)
- ✅ How it works (3 steps)
- ✅ Final CTA
- ✅ Redirect automatico se authenticated

---

### 2️⃣ Login: `src/app/auth/login/page.tsx`

**Features:**
- ✅ Email/Password login
- ✅ Google OAuth
- ✅ Remember me checkbox
- ✅ Forgot password link
- ✅ Redirect dopo login
- ✅ Wrapped in Suspense per useSearchParams

---

### 3️⃣ Signup: `src/app/auth/signup/page.tsx`

**Features:**
- ✅ Email/Password signup
- ✅ Google OAuth
- ✅ Nome completo
- ✅ Conferma password
- ✅ Validazione password (min 6 chars)
- ✅ Creazione profilo Firestore automatica
- ✅ Terms of Service + Privacy Policy links

**User Profile Schema (Firestore):**
```typescript
{
  name: string;
  email: string;
  role: 'creator';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

### 4️⃣ Password Reset: `src/app/auth/reset/page.tsx`

**Features:**
- ✅ Invio email reset
- ✅ Success state con conferma
- ✅ Error handling per email non trovata
- ✅ Link ritorno a login

---

### 5️⃣ Products Dashboard: `src/app/creator/products/page.tsx`

**Features:**
- ✅ Lista prodotti creator
- ✅ Filtri e search
- ✅ Paginazione
- ✅ Link a creazione nuovo prodotto
- ✅ Protected route (richiede auth)

---

### 6️⃣ Create Product: `src/app/creator/products/new/page.tsx`

**🎯 WORKFLOW 7 STEP:**

#### **Step 1: Upload Design**
```typescript
- Drag & drop o file picker
- Validazione file (formato, dimensione, risoluzione)
- Preview design
- Upload Firebase Storage
- Salvataggio metadata Firestore
```

#### **Step 2: Select Product**
```typescript
- Grid prodotti Printful catalog
- Categorie: T-Shirts, Hoodies, Mugs, Posters, etc.
- Preview immagine prodotto
- Selezione prodotto base
```

#### **Step 3: Choose Variants**
```typescript
- Lista varianti prodotto (colori, taglie)
- Multi-select variants
- Preview varianti selezionate
- Prezzi base per variante
```

#### **Step 4: Design Placement**
```typescript
- Selezione placement design
- Opzioni: front, back, sleeve, etc.
- Preview placement
- Suggerimento placement ottimale
```

#### **Step 5: Generate Mockup**
```typescript
- Generazione mockup automatica via Printful
- Progress indicator
- Polling status generazione
- Preview mockup generati
- Gallery mockup per varianti
```

#### **Step 6: Set Pricing**
```typescript
- Prezzo base Printful
- Margine creator (%)
- Calcolo prezzo finale automatico
- Preview profitto per vendita
```

#### **Step 7: Publish Product**
```typescript
- Review finale dati prodotto
- Pubblicazione prodotto
- Creazione sync store Printful
- Salvataggio Firestore
- Redirect a dashboard
```

**State Management:**
```typescript
interface ProductData {
  designId: string;
  designUrl: string;
  productId: number;
  productName: string;
  productImage: string;
  placement: PrintfulPlacement;
  selectedVariants: number[];
  mockupUrls: string[];
  basePrice: number;
  margin: number;
  finalPrice: number;
}
```

---

## 🌐 API ROUTES

### 1️⃣ **GET /api/printful/catalog**

**Endpoint:** Ottiene catalogo prodotti Printful

**Response:**
```json
{
  "products": [
    {
      "id": 71,
      "name": "Unisex Staple T-Shirt",
      "type": "T-SHIRT",
      "image": "https://...",
      "variants": 116
    }
  ]
}
```

---

### 2️⃣ **GET /api/printful/product/[id]**

**Endpoint:** Dettagli prodotto specifico + varianti

**Params:** `id` (product ID)

**Response:**
```json
{
  "product": {
    "id": 71,
    "name": "Unisex Staple T-Shirt",
    "description": "..."
  },
  "variants": [
    {
      "id": 4011,
      "name": "S / Black",
      "price": "13.00",
      "color": "Black",
      "size": "S"
    }
  ]
}
```

---

### 3️⃣ **POST /api/printful/order**

**Endpoint:** Crea nuovo ordine Printful

**Body:**
```json
{
  "recipient": {
    "name": "John Doe",
    "address1": "123 Main St",
    "city": "Los Angeles",
    "state_code": "CA",
    "country_code": "US",
    "zip": "90001"
  },
  "items": [
    {
      "variant_id": 4011,
      "quantity": 1,
      "files": [
        {
          "url": "https://..."
        }
      ]
    }
  ]
}
```

---

### 4️⃣ **POST /api/printful/shipping**

**Endpoint:** Calcola tariffe spedizione

**Body:**
```json
{
  "recipient": {
    "country_code": "US",
    "state_code": "CA"
  },
  "items": [
    {
      "variant_id": 4011,
      "quantity": 1
    }
  ]
}
```

---

### 5️⃣ **POST /api/printful/webhook**

**Endpoint:** Webhook Printful events

**Events Supportati:**
- `order_created` - Ordine creato
- `order_updated` - Ordine aggiornato
- `order_failed` - Ordine fallito
- `order_canceled` - Ordine cancellato
- `package_shipped` - Pacco spedito
- `package_returned` - Pacco restituito

**Verifica Signature:**
```typescript
// Validazione HMAC signature Printful
// Security header check
```

---

## 📊 TYPES TYPESCRIPT

### 📝 File: `src/types/printful.ts`

**Type Definitions Completi:**

```typescript
// Product Types
export interface PrintfulProduct
export interface PrintfulCatalogProduct
export interface PrintfulVariant
export interface PrintfulCatalogVariant

// Order Types
export interface PrintfulOrder
export interface PrintfulOrderData
export interface PrintfulOrderItem
export interface PrintfulRecipient

// Shipping Types
export interface PrintfulShippingRate
export interface PrintfulShippingRatesRequest

// Mockup Types
export interface PrintfulMockupGenerationTask
export interface PrintfulMockup
export interface PrintfulMockupTaskResponse

// Webhook Types
export interface PrintfulWebhook
export interface PrintfulWebhookEvent
export type PrintfulWebhookType =
  | 'order_created'
  | 'order_updated'
  | 'order_failed'
  | 'order_canceled'
  | 'package_shipped'
  | 'package_returned'
```

---

## 🎨 COMPONENTI UI

### 📁 `src/components/`

**Struttura:**
```
components/
├── base/              # Componenti base (button, input, etc)
├── application/       # Componenti app (navigation, table, etc)
├── marketing/         # Componenti marketing (header, footer)
├── foundations/       # Icons, logos
└── shared-assets/     # Illustrations, patterns
```

**Componenti Usati:**
- ✅ Buttons, Input, Textarea
- ✅ Select, Checkbox, Radio
- ✅ Modal, Dropdown
- ✅ File Upload
- ✅ Loading Indicators
- ✅ Pagination
- ✅ Tables
- ✅ Badges, Tags
- ✅ Navigation
- ✅ Empty States

---

## 🚀 DEPLOYMENT

### Vercel Configuration

**Environment Variables Richieste:**
```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

# Printful
PRINTFUL_API_KEY
PRINTFUL_API_URL

# App
NEXT_PUBLIC_APP_NAME
NEXT_PUBLIC_APP_URL
```

**Build Settings:**
```
Framework: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Node Version: 18.x
```

---

## 📦 DIPENDENZE PRINCIPALI

```json
{
  "next": "15.5.5",
  "react": "19.1.0",
  "typescript": "5.9.0",
  "firebase": "11.2.0",
  "axios": "^1.7.0",
  "tailwindcss": "4.0.0",
  "@protobufjs/*": "^7.0.0"  // Per Firebase Firestore
}
```

---

## 🔄 WORKFLOW COMPLETO

### Flusso Creator:

1. **Signup/Login** → Autenticazione Firebase
2. **Upload Design** → Firebase Storage + Firestore
3. **Seleziona Prodotto** → API Printful Catalog
4. **Scegli Varianti** → API Printful Variants
5. **Design Placement** → Logica frontend
6. **Genera Mockup** → Printful Mockup Generator API
7. **Set Pricing** → Calcolo margini
8. **Pubblica** → Printful Sync Products API + Firestore

### Flusso Ordine (Future):

1. **Customer Order** → Frontend e-commerce
2. **Process Payment** → Payment gateway (Stripe/PayPal)
3. **Create Printful Order** → API Printful Orders
4. **Confirm Order** → Printful confirma
5. **Webhook Updates** → Status updates via webhook
6. **Package Shipped** → Tracking info via webhook
7. **Delivery** → Completamento ordine

---

## 📝 NOTE IMPLEMENTAZIONE

### ✅ Completed Features:
- Firebase Authentication (Email + Google)
- Firebase Firestore Database
- Firebase Storage (Design upload)
- Printful API Integration (Tutte le API)
- Mockup Generation System
- Design Upload + Validation
- Product Creation Wizard (7 steps)
- Creator Dashboard
- Homepage
- Auth Pages (Login/Signup/Reset)

### 🚧 Future Features:
- E-commerce frontend pubblico
- Payment gateway integration
- Order management dashboard
- Analytics dashboard
- Email notifications
- Multi-language support
- Advanced design editor
- Product collections
- Discount codes system
- Affiliate program

---

## 🔗 LINKS UTILI

- **Repository:** https://github.com/Hamzamamma/opera-manufacture
- **Vercel URL:** https://opera-manufacture.vercel.app
- **Firebase Console:** https://console.firebase.google.com/project/opera-manufacture
- **Printful Dashboard:** https://www.printful.com/dashboard
- **Printful API Docs:** https://developers.printful.com

---

## 👨‍💻 DEVELOPMENT

### Local Development:
```bash
npm install
npm run dev
# Apri http://localhost:3000
```

### Build Production:
```bash
npm run build
npm start
```

### Deploy Vercel:
```bash
git push origin main
# Auto-deploy su Vercel
```

---

**Creato con ❤️ by Claude Code**
**Versione:** 1.0.0
**Ultimo update:** 15 Ottobre 2025
