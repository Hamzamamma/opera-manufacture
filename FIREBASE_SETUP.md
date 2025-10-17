# 🔥 Firebase Setup Guide

Questa guida ti aiuterà a configurare Firebase per il tuo progetto fourthwall-clone, sia in locale che su Vercel.

---

## 📋 Prerequisiti

1. Account Firebase (vai su [firebase.google.com](https://firebase.google.com))
2. Progetto Firebase creato
3. Account Vercel (se vuoi fare il deploy)

---

## 🛠️ Step 1: Ottieni le credenziali Firebase

1. Vai alla [Firebase Console](https://console.firebase.google.com/)
2. Seleziona il tuo progetto (es: "opera-manufacture")
3. Clicca sull'icona ⚙️ (Settings) → **Project Settings**
4. Scorri fino a "Your apps" e clicca su **</>** (Web app)
5. Se non hai già un'app web, creane una
6. Copia la configurazione `firebaseConfig`

Dovrebbe apparire così:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyABcDEfGhIjKlMnOpQrStUvWxYz123456",
  authDomain: "opera-manufacture.firebaseapp.com",
  projectId: "opera-manufacture",
  storageBucket: "opera-manufacture.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456",
  measurementId: "G-ABCDEFGHIJ"
};
```

---

## 💻 Step 2: Configurazione Locale (.env.local)

1. Crea un file `.env.local` nella root del progetto:

```bash
cd fourthwall-clone
touch .env.local
```

2. Aggiungi le tue credenziali Firebase (usa il prefisso `VITE_` per Vite):

```env
VITE_FIREBASE_API_KEY=AIzaSyABcDEfGhIjKlMnOpQrStUvWxYz123456
VITE_FIREBASE_AUTH_DOMAIN=opera-manufacture.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=opera-manufacture
VITE_FIREBASE_STORAGE_BUCKET=opera-manufacture.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-ABCDEFGHIJ
```

3. **Riavvia il server di sviluppo**:

```bash
npm run dev
```

4. Apri la console del browser (F12) e verifica che vedi:
   ```
   ✅ Firebase initialized successfully
   ```

---

## ☁️ Step 3: Configurazione su Vercel

### Opzione A: Tramite Dashboard Vercel

1. Vai su [vercel.com/dashboard](https://vercel.com/dashboard)
2. Seleziona il tuo progetto
3. Vai su **Settings** → **Environment Variables**
4. Aggiungi **TUTTE** queste variabili (una per una):

| Nome Variabile | Valore | Environments |
|----------------|--------|--------------|
| `VITE_FIREBASE_API_KEY` | `AIzaSy...` | Production, Preview, Development |
| `VITE_FIREBASE_AUTH_DOMAIN` | `opera-manufacture.firebaseapp.com` | Production, Preview, Development |
| `VITE_FIREBASE_PROJECT_ID` | `opera-manufacture` | Production, Preview, Development |
| `VITE_FIREBASE_STORAGE_BUCKET` | `opera-manufacture.appspot.com` | Production, Preview, Development |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `123456789012` | Production, Preview, Development |
| `VITE_FIREBASE_APP_ID` | `1:123456789012:web:abc` | Production, Preview, Development |
| `VITE_FIREBASE_MEASUREMENT_ID` | `G-ABCDEFGHIJ` | Production, Preview, Development |

5. Clicca **Save** per ogni variabile
6. Fai un nuovo **Deploy** del progetto (o aspetta il prossimo push su Git)

### Opzione B: Tramite CLI Vercel

```bash
# Installa Vercel CLI se non l'hai già
npm i -g vercel

# Login
vercel login

# Aggiungi le variabili
vercel env add VITE_FIREBASE_API_KEY
vercel env add VITE_FIREBASE_AUTH_DOMAIN
vercel env add VITE_FIREBASE_PROJECT_ID
vercel env add VITE_FIREBASE_STORAGE_BUCKET
vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID
vercel env add VITE_FIREBASE_APP_ID
vercel env add VITE_FIREBASE_MEASUREMENT_ID

# Deploy
vercel --prod
```

---

## 🔐 Step 4: Configura Firebase Security Rules

### Firestore Rules (Database)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Esempio: solo utenti autenticati possono leggere/scrivere
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Storage Rules (File Upload)

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true; // Pubblico in lettura
      allow write: if request.auth != null; // Solo autenticati per scrivere
    }
  }
}
```

---

## ✅ Verifica che Tutto Funzioni

### In Locale:
```bash
npm run dev
```

Apri: http://localhost:5173

### Su Vercel:
Dopo il deploy, apri il tuo sito su Vercel e controlla la console del browser.

Se vedi:
```
✅ Firebase initialized successfully
```

Tutto è configurato correttamente! 🎉

---

## ❌ Errori Comuni e Soluzioni

### `Error (auth/api-key-not-valid)`
- ✅ Controlla che la `API_KEY` sia corretta
- ✅ Verifica che le variabili su Vercel inizino con `VITE_`
- ✅ Riavvia il server dopo aver modificato `.env.local`

### `Firebase: Error (auth/project-not-found)`
- ✅ Controlla che `projectId` sia corretto
- ✅ Verifica che il progetto Firebase esista

### Le variabili non vengono lette su Vercel
- ✅ Assicurati che il prefisso sia `VITE_` (per Vite) o `NEXT_PUBLIC_` (per Next.js)
- ✅ Fai un nuovo deploy dopo aver aggiunto le variabili
- ✅ Controlla che le variabili siano assegnate a **Production, Preview e Development**

---

## 📚 Risorse Utili

- [Firebase Documentation](https://firebase.google.com/docs)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)

---

## 🆘 Supporto

Se hai problemi, controlla:
1. La console del browser (F12) per errori
2. I log di Vercel (se deployato)
3. Le Firebase Security Rules

Buon lavoro! 🚀
