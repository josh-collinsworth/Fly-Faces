module.exports = (req, res) => {

    //This Node file handles initial oAuth authentication with Namely

    const https = require('https');
    const url = require('url');

    let authCode = url.parse(req.url, true).query.auth_code;
    let body = encodeURI(`grant_type=authorization_code&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${authCode}`);

    res.end(JSON.stringify(body));
    // let args = {
    //     hostname: 'getflywheel.namely.com',
    //     path: '/api/v1/oauth2/token',
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    // }

    // const call = https.request(args, (resp) => {
    //     let data = '';

    //     resp.on('data', (chunk) => {
    //         data += chunk;
    //     });

    //     resp.on('end', () => {
    //         res.end(JSON.stringify(data));
    //     });

    // })

    // call.on("error", (err) => {
    //     res.end(JSON.stringify(err.message));
    // });

    // call.write(body);
    // call.end();
}