const PUBLIC_VAPID_KEY1 = "BCBAeUeUVXFgTXf4W8AUV1FXrnUxvfGEE2JSzEFeziawoaL3AgdTkvmR1iwyQhbubCqYPDvbXrlsOBcwTb0gbN0"

const convertedVapidKey = urlBase64ToUint8Array(PUBLIC_VAPID_KEY1)

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
 
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
 
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function sendSubscription(subscription){
    return fetch('/api/pushNotifications/subscription', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          "Content-Type": "application/json"
        }
    })
}

export function subscribeUser(sendNotificationPush) {
    if ('serviceWorker' in navigator) {
      console.log(navigator)
      navigator.serviceWorker.ready.then(function(registration) {
        console.log('dentro')
        console.log(registration)
        if (!registration.pushManager) {
          console.log('Push manager unavailable.')
          return
        }
        if(sendNotificationPush){
          registration.pushManager.getSubscription().then(function(existedSubscription) {
            if (existedSubscription === null) {
              console.log('No subscription detected, make a request.')
              registration.pushManager.subscribe({
                applicationServerKey: convertedVapidKey,
                userVisibleOnly: true,
              }).then(function(newSubscription) {
                console.log('New subscription added.')
                sendSubscription(newSubscription)
              }).catch(function(e) {
                if (Notification.permission !== 'granted') {
                  console.log('Permission was not granted.')
                } else {
                  console.error('An error ocurred during the subscription process.', e)
                }
              })
            } else {
              console.log('Existed subscription detected.')
              sendSubscription(existedSubscription)
            }
          })
        }else{
          registration.pushManager.getSubscription().then(function(existedSubscription) {
            existedSubscription.unsubscribe().then(function(successful) {
              console.log('CHIMBA')
            }).catch(function(e) {
              console.log('NI TAN CHIMBA')
            })
          })
        }
        
      })
      .catch(function(e) {
        console.log('err')
        console.log(e)
        console.error('An error ocurred during Service Worker registration.', e)
      })
      .finally(() => console.log('FInally'))
    }
}