import App from './App';
import config from './config';

const port = config.port;

App.listen(port, () => {
  console.log('Express server listening on port ' + port);
});
