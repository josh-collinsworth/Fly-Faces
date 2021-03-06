module.exports = (req, res) => {

    //NOTE: this file is no longer used by the application, and is left only for posterity purposes.
    //It was previously used to avoid re-auth for a user by using a refresh_token stored in the browser; however; it has been decided that this is not optimally secure.

    //This Node file reaches out to Namely when a refresh token is provided for quick authentication 

    const https = require('https');
    const url = require('url');

    let refreshToken = url.parse(req.url, true).query.refresh_token;
    let body = encodeURI(`grant_type=refresh_token&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&refresh_token=${refreshToken}&redirect_uri=${process.env.APP_URL}`)
    
    let args = {
        hostname: `getflywheel.namely.com`,
        path: `/api/v1/oauth2/token`,
        method: 'POST',
        followAllRedirects: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    }

    const call = https.request(args, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            res.end(JSON.stringify(data));
        });

    })
    
    call.on("error", (err) => {
        res.end(JSON.stringify(err.message));
    });

    call.write(body);
    call.end();
}