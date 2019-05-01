module.exports = (req, res) => {
    const https = require('https');
    //const authURL = 'https://getflywheel.namely.com/api/v1/oauth2/authorize?response_type=code&client_id=aLqEQUSDghqvKamgshUfsn5sxtpg9FsUGT3Mv0ZLRGyOSJOOp6F784uR6gTG3ucl&redirect_uri=https%3A%2F%2Ffly-faces.now.sh';

    https.get('https://getflywheel.com/wp-json/wp/v2/pages?slug=team', (resp) => {
        let data = ''

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            console.log(JSON.parse(data));
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

    getData();
}