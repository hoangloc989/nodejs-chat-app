var Service = require('node-windows').Service;
var dir = require('path').join(process.cwd(), 'server.js')

// Create a new service object
var svc = new Service({
  name:'MfgChatApp',
  description: 'The nodejs Mfg Chat App server.',
  script: dir,
  env:{
    name: "NODE_ENV",
    value: "production"
  }
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

// Just in case this file is run twice.
svc.on('alreadyinstalled',function(){
  console.log('This service is already installed.');
});

// Listen for the "start" event and let us know when the
// process has actually started working.
svc.on('start',function(){
  console.log(svc.name+' started!\nVisit http://127.0.0.1:3000 to see it in action.');
});

// Install the script as a service.
console.log("Installing to", dir)
svc.install();