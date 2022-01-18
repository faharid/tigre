// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  env: 'dev',
  api_url: 'http://localhost:3000/',

  firebase: {
    apiKey: 'AIzaSyAFje11X5AxCPtFMl2Lrx21C89h4rrdNG0',
    authDomain: 'chat-demo-2b2c5.firebaseapp.com',
    databaseURL: 'https://chat-demo-2b2c5.firebaseio.com',
    projectId: 'chat-demo-2b2c5',
    storageBucket: 'chat-demo-2b2c5.appspot.com',
    messagingSenderId: '429331302289',
    appId: '1:429331302289:web:5978d0f457676e7db4fc30',
    measurementId: 'G-MGVD03DN1V'
  }

};




/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
