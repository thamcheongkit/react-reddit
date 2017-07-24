// self.addEventListener('fetch', function(event) {
//   console.log('Fetch event for ', event.request.url);
//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       if (response) {
//         console.log('Found ', event.request.url, ' in cache');
//         return response;
//       }
//       console.log('Network request for ', event.request.url);
//       return fetch(event.request)

//       // TODO 4 - Add fetched files to the cache

//     }).catch(function(error) {

//       // TODO 6 - Respond with custom offline page

//     })
//   );
// });