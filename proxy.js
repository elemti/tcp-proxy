var net = require('net');

// parse "80" and "localhost:80" or even "42mEANINg-life.com:80"
var addrRegex = /^(([a-zA-Z\-\.0-9]+):)?(\d+)$/;

module.exports = (_from, _to) => {
    _from = addrRegex.exec(_from);
    _to = addrRegex.exec(_to);

    if (!_from || !_to) {
        throw Error('invalid input');
    }

    let startForward = () => {
        let proxyServer = net.createServer(function(fromConn) {
            var toConn = net.createConnection({
                host: _to[2],
                port: _to[3]
            });
            toConn.on('error', err => {
                toConn.destroy();
                fromConn.destroy();
                proxyServer.close();
                setTimeout(() => startForward(), 0);
            });
            fromConn.pipe(toConn);
            toConn.pipe(fromConn);
        })
        proxyServer.listen(_from[3], _from[2]);
    };

    startForward();
};
