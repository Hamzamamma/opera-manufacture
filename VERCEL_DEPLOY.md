# 🚀 Deploy su Vercel - Guida Rapida

## Metodo 1: Deploy tramite Dashboard (Consigliato)

### Step 1: Connetti il Repository
1. Vai su [vercel.com](https://vercel.com)
2. Clicca su **"Add New..." → Project**
3. Seleziona il tuo repository GitHub
4. Clicca **Import**

### Step 2: Configura il Progetto
- **Framework Preset**: Vite
- **Root Directory**: `./` (lascia vuoto)
- **Build Command**: `npm run build` (dovrebbe essere già impostato)
- **Output Directory**: `dist` (dovrebbe essere già impostato)

### Step 3: Aggiungi le Environment Variables

**⚠️ IMPORTANTE: Aggiungi PRIMA del primo deploy!**

Nella sezione **Environment Variables**, aggiungi:

```
VITE_FIREBASE_API_KEY = [la tua API key]
VITE_FIREBASE_AUTH_DOMAIN = [tuo-progetto].firebaseapp.com
VITE_FIREBASE_PROJECT_ID = [tuo-progetto]
VITE_FIREBASE_STORAGE_BUCKET = [tuo-progetto].appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID = [numero]
VITE_FIREBASE_APP_ID = [app id]
VITE_FIREBASE_MEASUREMENT_ID = G-XXXXXXXXXX
```

**Seleziona per ogni variabile:**
- ✅ Production
- ✅ Preview
- ✅ Development

### Step 4: Deploy!
Clicca **Deploy** e attendi qualche minuto.

---

## Metodo 2: Deploy tramite CLI

```bash
# Installa Vercel CLI
npm i -g vercel

# Login
vercel login

# Prima di fare il deploy, aggiungi le variabili:
vercel env add VITE_FIREBASE_API_KEY production
vercel env add VITE_FIREBASE_AUTH_DOMAIN production
vercel env add VITE_FIREBASE_PROJECT_ID production
vercel env add VITE_FIREBASE_STORAGE_BUCKET production
vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID production
vercel env add VITE_FIREBASE_APP_ID production
vercel env add VITE_FIREBASE_MEASUREMENT_ID production

# Deploy in produzione
vercel --prod
```

---

## ⚙️ Comandi Utili Vercel CLI

```bash
# Deploy in preview
vercel

# Deploy in production
vercel --prod

# Visualizza tutte le environment variables
vercel env ls

# Rimuovi una variabile
vercel env rm NOME_VARIABILE

# Visualizza i log in real-time
vercel logs [url-del-deploy]

# Apri il progetto nel browser
vercel --open
```

---

## 🔧 Aggiornare le Environment Variables

### Tramite Dashboard:
1. Vai su **Settings** → **Environment Variables**
2. Trova la variabile da modificare
3. Clicca sui tre puntini `...` → **Edit**
4. Modifica il valore
5. Clicca **Save**
6. **Fai un nuovo deploy** (le variabili vengono lette solo al build)

### Tramite CLI:
```bash
# Rimuovi la vecchia
vercel env rm VITE_FIREBASE_API_KEY production

# Aggiungi la nuova
vercel env add VITE_FIREBASE_API_KEY production

# Redeploy
vercel --prod
```

---

## 🐛 Troubleshooting

### Errore: `Firebase API key not valid`
**Soluzione:**
- ✅ Controlla che le variabili siano aggiunte su Vercel
- ✅ Verifica che inizino con `VITE_` (per Vite)
- ✅ Fai un nuovo deploy dopo aver aggiunto le variabili

### Errore: Build fallito
**Soluzione:**
- ✅ Controlla i log su Vercel: **Deployments** → clicca sul deploy → **Build Logs**
- ✅ Verifica che `npm run build` funzioni in locale
- ✅ Controlla che tutte le dipendenze siano in `package.json`

### Il sito è bianco/non carica
**Soluzione:**
- ✅ Apri la Console del browser (F12) e guarda gli errori
- ✅ Controlla i **Runtime Logs** su Vercel
- ✅ Verifica che le variabili Firebase siano caricate

---

## ✅ Verifica che il Deploy sia Riuscito

1. Apri l'URL del deploy su Vercel (es: `tuo-sito.vercel.app`)
2. Apri la Console del browser (F12)
3. Dovresti vedere:
   ```
   ✅ Firebase initialized successfully
   ```

Se vedi questo messaggio, tutto funziona! 🎉

---

## 📚 Risorse

- [Vercel Documentation](https://vercel.com/docs)
- [Vite on Vercel](https://vercel.com/guides/deploying-vite)
- [Environment Variables on Vercel](https://vercel.com/docs/projects/environment-variables)

---

Buon deploy! 🚀
