module.exports = (req, res) => {

    //This Node file handles reaching out to the Namely API to retrieve employee profiles and extract only the needed info server-side
    
    const https = require('https');
    const url = require('url');
    
    //NOTE: this needs to be increased when we have more than 250 employees (1 page = 50 employees)
    let pages = 5;
    let completedRequests = 0;
    let token = url.parse(req.url, true).query.token;
    let APIResponses = [];
    let finalResponse = [];

    const getRandomJob = () => {
        const randomJobs = [
            'BPMT connoisseur',
            'La Croix sommelier',
            'Human person',
            'Ghost hunter',
            'Vape novelist',
            'Director of dogs',
            'Fetch maker happener',
            'Instagram influencer',
            'Hand model',
            'Foot model',
            'Assistant (to the) regional manager',
            'Lifestyle coach',
            'Hug advocate',
            'Salmon lover',
            'Peanut butterer',
            'Mouse detective',
            'Werepup babysitter',
            'Bowtie aficionado',
            'VP of owls',
            'Hot dog artist'
        ]
        return randomJobs[Math.floor(Math.random() * randomJobs.length)];
    }

    for (let i=1; i <= pages; i++) {

        let args = {
            hostname: 'getflywheel.namely.com',
            path: `/api/v1/profiles.json?per_page=50&page=${i}&filter[user_status]=active`,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const call = https.request(args, function (resp) {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                APIResponses[i -1] = (data);
                completedRequests++;
                if (completedRequests === pages) {
                    APIResponses.forEach(response => {
                        response = JSON.parse(response);
                        finalResponse = finalResponse.concat(response.profiles);
                    });

                    finalResponse = finalResponse.map(face => {
                        if (face && face.image) {
                            const newFace = {}
                            //.trim and .replace help account for rogue spaces in the name
                            newFace.name = face.full_name.trim().replace(/ {1,}/g, ' ');
                            newFace.img = face.image.thumbs["300x300"];
                            newFace.role = face.job_title.title ? face.job_title.title : getRandomJob();
                            newFace.department = face.team_positions ? face.team_positions[0].team_name : '[No team listed]';
                            return newFace;
                        } else {
                            return null;
                        }
                    });

                    finalResponse = finalResponse.filter(face => (face !== null && face !== undefined));
               
                    res.end(JSON.stringify(finalResponse));
                }
            });
        });

        call.on("error", (err) => {
            res.end(JSON.stringify(err.message));
        });

        call.end();
    }
}
