const options = {
  firebaseVersion: '7.11.0',
  config: {
    apiKey: 'AIzaSyCUW89qN4MV42Bym8GifnRtpLmpZTO_gcE',
    authDomain: 'nuxt-demo-c3694.firebaseapp.com',
    databaseURL: 'https:\u002F\u002Fnuxt-demo-c3694.firebaseio.com',
    projectId: 'nuxt-demo-c3694',
    storageBucket: 'nuxt-demo-c3694.appspot.com',
    messagingSenderId: '676463145430',
    appId: '1:676463145430:web:f8b3e163f0c63dac21f477',
  },
  onFirebaseHosting: false,
};
const version = options.firebaseVersion;
const onFirebaseHosting = options.onFirebaseHosting;

if (onFirebaseHosting) {
  // Only works on Firebase hosting!
  importScripts('/__/firebase/' + version + '/firebase-app.js');
  importScripts('/__/firebase/' + version + '/firebase-messaging.js');
  importScripts('/__/firebase/init.js');
} else {
  importScripts(
    'https://www.gstatic.com/firebasejs/' + version + '/firebase-app.js'
  );
  importScripts(
    'https://www.gstatic.com/firebasejs/' + version + '/firebase-messaging.js'
  );
  firebase.initializeApp(options.config);
}

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.info('SW received the message: ', payload);
  const notification = payload.notification;

  const notificationTitle = notification.title;
  const notificationOptions = {
    body: notification.body,
    icon: notification.image,
    vibrate: notification.vibrate || [200, 100, 200, 100, 200, 100, 200],
    actions: [
      // First item is always taken as click action (see comment below)
      {
        title: 'Visit',
        action: notification.clickPath,
      },
    ],
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener('notificationclick', function(e) {
  const notification = e.notification;
  // MARK 1 -> always takes first item
  const clickAction = notification.actions[0].action;
  const action = e.action;
  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow(clickAction);
    notification.close();
  }
});
