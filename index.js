const
  socks5 = require('simple-socks'),
  server = socks5.createServer().listen(5050);

const http_proxy = require('http-proxy-to-socks');

// When a reqest arrives for a remote destination
server.on('proxyConnect', (info, destination) => {
  console.log('connected to remote server at %s:%d', info.address, info.port);

  // destination.on('data', (data) => {
  //   console.log(data.length);
  // });
});

// When data arrives from the remote connection
// server.on('proxyData', (data) => {
//   console.log(data.length);
// });

// When an error occurs connecting to remote destination
server.on('proxyError', (err) => {
  console.error('unable to connect to remote server');
  console.error(err);
});

// When a request for a remote destination ends
server.on('proxyDisconnect', (originInfo, destinationInfo, hadError) => {
  console.log(
    'client %s:%d request has disconnected from remote server at %s:%d with %serror',
    originInfo.address,
    originInfo.port,
    destinationInfo.address,
    destinationInfo.port,
    hadError ? '' : 'no ');
});

// When a proxy connection ends
server.on('proxyEnd', (response, args) => {
  console.log('socket closed with code %d', response);
  console.log(args);
});


http_proxy.createServer({
    host: '0.0.0.0',
    socks: '127.0.0.1:5050',
    proxyListReloadTimeout: 60,
    port: 5051,
  });
  
  
console.log("Proxy Started");