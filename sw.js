"use strict"

// All GitHub pages under the same account share the same origin, so the cache must always have a distinctive name (not only the number) so that it won't interfere with the cache of another GitHub page.
const CURRENT_CACHE = "catechismus-1.0.1"

self.addEventListener("install", cache_everything)
self.addEventListener("activate", del_prev_caches)
self.addEventListener("fetch", network_first)

// In development, sw_scope is: http://localhost:4000/catechismus/
// In production, sw_scope is: https://materialknight.github.io/catechismus/
const sw_scope = self.registration.scope
// All requests using a relative url would be made relative to this file's registration scope (/catechismus/).
// The service worker should not be cached.
const cacheable_responses = [
   sw_scope,
   sw_scope.concat("info"),
   sw_scope.concat("manifest.json"),
   sw_scope.concat("assets/main.css"),
   sw_scope.concat("assets/minima-social-icons.svg"),
   sw_scope.concat("assets/css/custom.css"),
   sw_scope.concat("assets/images/favicon.png"),
   sw_scope.concat("assets/images/icon_chrome.png"),
   sw_scope.concat("assets/images/icon_edge.png"),
   sw_scope.concat("assets/images/QR_BTC.jpeg"),
   sw_scope.concat("assets/js/font.js"),
   sw_scope.concat("assets/js/index.js"),
   sw_scope.concat("assets/js/toc.js"),
   sw_scope.concat("00_intro/01_laetamur_magnopere.md"),
   sw_scope.concat("00_intro/02_fidei_depositum.md"),
   sw_scope.concat("00_intro/03_prologo.md"),
   sw_scope.concat("01_parte_primera/p1_s1_c0.md"),
   sw_scope.concat("01_parte_primera/p1_s1_c1.md"),
   sw_scope.concat("01_parte_primera/p1_s1_c2.md"),
   sw_scope.concat("01_parte_primera/p1_s1_c3.md"),
   sw_scope.concat("01_parte_primera/p1_s2_c0.md"),
   sw_scope.concat("01_parte_primera/p1_s2_c1.md"),
   sw_scope.concat("01_parte_primera/p1_s2_c2.md"),
   sw_scope.concat("01_parte_primera/p1_s2_c3.md"),
   sw_scope.concat("02_parte_segunda/p2_s1_c0.md"),
   sw_scope.concat("02_parte_segunda/p2_s1_c1.md"),
   sw_scope.concat("02_parte_segunda/p2_s1_c2.md"),
   sw_scope.concat("02_parte_segunda/p2_s2_c0.md"),
   sw_scope.concat("02_parte_segunda/p2_s2_c1.md"),
   sw_scope.concat("02_parte_segunda/p2_s2_c2.md"),
   sw_scope.concat("02_parte_segunda/p2_s2_c3.md"),
   sw_scope.concat("02_parte_segunda/p2_s2_c4.md"),
   sw_scope.concat("03_parte_tercera/p3_s1_c0.md"),
   sw_scope.concat("03_parte_tercera/p3_s1_c1.md"),
   sw_scope.concat("03_parte_tercera/p3_s1_c2.md"),
   sw_scope.concat("03_parte_tercera/p3_s1_c3.md"),
   sw_scope.concat("03_parte_tercera/p3_s2_c0.md"),
   sw_scope.concat("03_parte_tercera/p3_s2_c1.md"),
   sw_scope.concat("03_parte_tercera/p3_s2_c2.md"),
   sw_scope.concat("04_parte_cuarta/p4_s1_c0.md"),
   sw_scope.concat("04_parte_cuarta/p4_s1_c1.md"),
   sw_scope.concat("04_parte_cuarta/p4_s1_c2.md"),
   sw_scope.concat("04_parte_cuarta/p4_s1_c3.md"),
   sw_scope.concat("04_parte_cuarta/p4_s2_c0.md")
]
console.log(sw_scope)
// Functions:

function cache_everything(installation) {
   skipWaiting()
   installation.waitUntil(
      caches.open(CURRENT_CACHE).then(cache => cache.addAll(cacheable_responses))
   )
}

function del_prev_caches(activation) {
   activation.waitUntil(
      caches.keys().then(cache_keys => {
         const pending_deletions = cache_keys.map(key => key !== CURRENT_CACHE ? caches.delete(key) : null)
         return Promise.all(pending_deletions)
      }).then(() => clients.claim())
   )
}

function network_first(fetching) {
   if (fetching.request.method !== "GET")
   {
      return // Let the browser handle non-GET requests.
   }
   fetching.respondWith(
      fetch(fetching.request)
         .then(network_response => {
            // Note: If fetching.request.url has search params "?key1=val1&key2=val2", the response won't be cached.
            const res_is_cacheable = cacheable_responses.includes(fetching.request.url)
            if (res_is_cacheable)
            {
               // setTimeout(() => console.log("cached!"), 1000)
               const response_clone = network_response.clone()
               caches.open(CURRENT_CACHE).then(cache => cache.put(fetching.request, response_clone))
            }
            return network_response
         })
         .catch(async () => {
            console.warn(`Could not fetch ${fetching.request.url} from the network, retrieving from cache.`)
            const open_cache = await caches.open(CURRENT_CACHE)
            const cached_response = await open_cache.match(fetching.request)
            if (cached_response)
            {
               return cached_response
            }
            const req_keys = await open_cache.keys()
            const req_404 = req_keys.find(req => req.url.endsWith("/404.html"))
            if (req_404)
            {
               const cached_404 = await open_cache.match(req_404)
               return cached_404
            }
            return new Response('La página solicitada no pudo ser traída de la red ni hallada en el cache.', {
               status: 404,
               headers: { 'Content-Type': 'text/plain' }
            })
         })
   )
}
