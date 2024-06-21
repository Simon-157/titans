import connect from './connectors';

connect(function connectCb() {
  require('./server');
});
