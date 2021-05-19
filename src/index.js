const express = require('express');
const exec = require('child_process').exec;
const app = express();

const port = process.env.NODE_HOSTNAME_PORT || 3000;

function execute(cmd) {
    return new Promise((resolve, reject) => {
        exec(cmd, function (error, stdout, stderr) {
            if (error) {
                reject({
                    error,
                    message: stderr.trim()
                });
            }
            resolve(stdout.trimEnd());
        });
    });
}

app.get("/", function (req, res) {
    Promise.all([execute("hostname")])
        .then(([hostname]) => res.json({
            hostname,
            clientAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress
        }))
        .catch(err => res.status(500).json(err))
});

app.get("/healthcheck", function (req, res) {
    res.send("OK");
});

app.listen(port, () => console.log("Server start... Listen Port :", port));