export default function protectRoutes(server, authConfig = {
  clients: [],
  login: 'login',
  password: 'password',
}) {
  if (authConfig) {
    server.router.use((req, res, next) => {

      const isProtected  = authConfig.clients
        .map(type => req.path.endsWith(`/${type}`))
        .reduce((acc, value) => acc || value, false);

      if (isProtected) {
        // parse login and password from headers
        const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
        const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

        // verify login and password are set and correct
        if (login && password && login === authConfig.login && password === authConfig.password) {
          // -> access granted...
          return next();
        }

        // -> access denied...
        res.writeHead(401, {
          'WWW-Authenticate':'Basic',
          'Content-Type':'text/plain'
        });
        res.end('Authentication required.')
      } else {
        // route not protected
        return next();
      }
    });
  }
};