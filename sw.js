const CACHE_NAME = 'hightech-ps-v2';

// القائمة الكاملة للملفات المطلوبة للتخزين أوفلاين
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './script.js',
  './manifest.json',
  './background.png'
];

// مرحلة التثبيت والتخزين المؤقت
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching offline assets...');
      // استخدام addAll بحذر: نمر على الملفات مع التجاوز إن لم توجد الصورة
      return Promise.allSettled(
        ASSETS_TO_CACHE.map(url => cache.add(url))
      );
    })
  );
  self.skipWaiting();
});

// مرحلة التفعيل وحذف الكاش القديم
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// استدعاء الملفات من الكاش في حالة عدم وجود شبكة (Cache First Strategy)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        // تخزين الاستجابات الجديدة ديناميكياً
        if (event.request.method === 'GET' && networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // في حالة قطع النت التام وعدم وجود الملف بالمرة
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
