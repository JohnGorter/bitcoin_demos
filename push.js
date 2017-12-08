const webpush = require('web-push');

// VAPID keys should only be generated only once.
webpush.setVapidDetails(
 'mailto:john.gorter@gmail.com',
 'BDfRI75FpGG8jl6MCMu578TP024VYgnW_0rUyBXgl375aNVbnxuaCjJ6ahPtXaSLfPDzDRSiiGJMFwTCfKWA0x4',
 'XNdayn16GLtFzXMeaxetpI8eBeTLxzAuYFQvImGPhL8'
);



const pushSubscription = {
 endpoint: "https://fcm.googleapis.com/fcm/send/enfHfpEtNr4:APA91bEx8weNNGNeFf7hrJYmwi5Hq_IT3YFz_GaDlpTmm2_FTJRCkAGaol494pxsvs-YNkATtY0sXZQ6qWQEHQXrsy-ct2q0JNDa3y1at2METEARDfnfWhXExRWTeT9j6-ayhZUUNq7q",
 keys: {
   auth: "gnEfHNXiM7_Ap7wpqtu67Q==",
   p256dh: "BFTtwrfeoi1T8wrcBqN0J0USEY7TxEPwlBOcY63XpWflPwI_ZlxyUpUkD2u_YE2HN80R2ZaZo4XDUlHQW7jhO5g="
 }
};

setInterval(() => {
    console.log('sending push');
    webpush.sendNotification(pushSubscription, 'Your Push Payload Text');
}, 1000); 