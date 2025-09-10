

```markdown
# 💰 Cassa

Un’applicazione full-stack sviluppata con **React** (frontend) e **Laravel** (backend) per la gestione di una cassa digitale.  
Consente di visualizzare categorie e prodotti, aggiungerli allo scontrino e calcolare il totale in tempo reale.

## 🚀 Funzionalità

- 📂 Gestione delle **categorie** (con Laravel API)  
- 🛒 Visualizzazione e selezione dei **prodotti**  
- ➕ Aggiunta prodotti allo **scontrino**  
- 🧾 Calcolo automatico del **totale**  
- 🔗 Connessione **frontend ↔ backend** tramite API REST  
- 🎨 Interfaccia semplice e reattiva  

## 🛠️ Tecnologie utilizzate

### Frontend
- [React](https://react.dev/) + [Vite](https://vitejs.dev/)  
- [CSS Modules](/) per lo stile  
- Fetch API per comunicare con il backend  

### Backend
- [Laravel](https://laravel.com/)  
- [MySQL](https://www.mysql.com/)  come database  
- Eloquent ORM per la gestione dei modelli (`Category`, `Product`, …)  
- API RESTful per fornire dati a React  

## 📂 Struttura del progetto

```

cassa/
│── frontend/        # React + Vite
│   ├── src/
│   │   ├── api/
│   │   │   ├── getCategorie.js
│   │   │   ├── getProdotti.js
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
│
│── backend/         # Laravel
│   ├── app/
│   │   ├── Models/Category.php
│   │   ├── Models/Product.php
│   │   └── Http/Controllers/
│   │       ├── CategoryController.php
│   │       └── ProductController.php
│   ├── routes/api.php
│   ├── database/migrations/
│   └── composer.json

````

## ▶️ Avvio del progetto

### Backend (Laravel)
Assicurati di avere [Composer](https://getcomposer.org/) e [XAMPP](https://www.apachefriends.org/) o un ambiente simile.

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
````

Il backend sarà disponibile su **[http://localhost:8000](http://localhost:8000)**

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Il frontend sarà disponibile su **[http://localhost:5173](http://localhost:5173)**

## 📦 Build

Frontend:

```bash
npm run build
```

Backend:

```bash
php artisan serve --env=production
```


👨‍💻 Progetto sviluppato da **\[Gioele Boccanegra]**

```


