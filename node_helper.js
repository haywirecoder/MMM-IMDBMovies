var NodeHelper = require("node_helper");
var https = require("https");

module.exports = NodeHelper.create({

    start: function () {
		console.log("Starting node helper: " + this.name);
	},

    socketNotificationReceived: function (notification, payload) {
        
        if (notification === "GET_MOVIES") {
            this.getData(payload.id, payload.apikey, payload.maxdays, payload.offline)
        }
    },

    getData: function (id, apikey, maxdays, offline) {
        
        if (offline === true) {
            console.log( "[MMM-IMDBMovies]: Working in offline mode "); 
            const movieOffilenData = '{"data":{"comingSoon":[{"date":"20231130","movies":[{"idIMDB":"tt28697492"},{"idIMDB":"tt14252678"},{"idIMDB":"tt23804728"},{"idIMDB":"tt22489892"}]},{"date":"20231201","movies":[{"idIMDB":"tt23289160"},{"idIMDB":"tt19406606"},{"idIMDB":"tt15799866"},{"idIMDB":"tt29354040"},{"idIMDB":"tt21054736"},{"idIMDB":"tt9351856"},{"idIMDB":"tt16899656"},{"idIMDB":"tt13499272"},{"idIMDB":"tt15212880"},{"idIMDB":"tt16987062"}]},{"date":"20231203","movies":[{"idIMDB":"tt29977945"},{"idIMDB":"tt30069245"}]},{"date":"20231204","movies":[{"idIMDB":"tt13998382"}]},{"date":"20231205","movies":[{"idIMDB":"tt29137989"}]},{"date":"20231206","movies":[{"idIMDB":"tt29731419"}]},{"date":"20231207","movies":[{"idIMDB":"tt15477042"}]},{"date":"20231208","movies":[{"idIMDB":"tt14230458"},{"idIMDB":"tt6587046"},{"idIMDB":"tt5198890"},{"idIMDB":"tt6722400"},{"idIMDB":"tt18925050"},{"idIMDB":"tt21810682"},{"idIMDB":"tt11893676"},{"idIMDB":"tt27710871"}]},{"date":"20231209","movies":[{"idIMDB":"tt2478478"},{"idIMDB":"tt28136660"}]},{"date":"20231211","movies":[{"idIMDB":"tt14960442"}]},{"date":"20231212","movies":[{"idIMDB":"tt29551083"}]},{"date":"20231215","movies":[{"idIMDB":"tt6166392"},{"idIMDB":"tt23952252"},{"idIMDB":"tt13086266"},{"idIMDB":"tt14695060"}]},{"date":"20231222","movies":[{"idIMDB":"tt26047818"},{"idIMDB":"tt9663764"},{"idIMDB":"tt21064584"},{"idIMDB":"tt6495056"},{"idIMDB":"tt23561236"},{"idIMDB":"tt19401654"},{"idIMDB":"tt16257866"}]},{"date":"20231223","movies":[{"idIMDB":"tt15712668"}]},{"date":"20231225","movies":[{"idIMDB":"tt3758542"},{"idIMDB":"tt1200263"},{"idIMDB":"tt1856080"},{"idIMDB":"tt9573150"},{"idIMDB":"tt16085546"},{"idIMDB":"tt8035464"}]},{"date":"20240105","movies":[{"idIMDB":"tt9682428"},{"idIMDB":"tt16383764"}]},{"date":"20240106","movies":[{"idIMDB":"tt28136667"}]},{"date":"20240112","movies":[{"idIMDB":"tt11762114"},{"idIMDB":"tt15314262"},{"idIMDB":"tt22866358"},{"idIMDB":"tt10923334"}]},{"date":"20240119","movies":[{"idIMDB":"tt23785128"},{"idIMDB":"tt5834410"}]},{"date":"20240125","movies":[{"idIMDB":"tt13818368"},{"idIMDB":"tt17044106"}]},{"date":"20240126","movies":[{"idIMDB":"tt13655120"},{"idIMDB":"tt21434318"}]},{"date":"20240131","movies":[{"idIMDB":"tt3643390"}]},{"date":"20240202","movies":[{"idIMDB":"tt15009428"},{"idIMDB":"tt20561198"}]},{"date":"20240209","movies":[{"idIMDB":"tt10655524"},{"idIMDB":"tt21188080"},{"idIMDB":"tt19760052"},{"idIMDB":"tt12234316"}]},{"date":"20240214","movies":[{"idIMDB":"tt11057302"},{"idIMDB":"tt8521778"},{"idIMDB":"tt2263648"}]},{"date":"20240223","movies":[{"idIMDB":"tt19356262"},{"idIMDB":"tt4996328"},{"idIMDB":"tt22379462"}]},{"date":"20240227","movies":[{"idIMDB":"tt20864606"}]},{"date":"20240301","movies":[{"idIMDB":"tt15239678"}]},{"date":"20240303","movies":[{"idIMDB":"tt15213120"}]},{"date":"20240308","movies":[{"idIMDB":"tt26658104"},{"idIMDB":"tt14351082"},{"idIMDB":"tt21271216"}]},{"date":"20240315","movies":[{"idIMDB":"tt13884444"},{"idIMDB":"tt21879688"},{"idIMDB":"tt27598124"}]},{"date":"20240321","movies":[{"idIMDB":"tt8542964"}]},{"date":"20240322","movies":[{"idIMDB":"tt10720352"},{"idIMDB":"tt20114686"},{"idIMDB":"tt30007864"},{"idIMDB":"tt15005606"},{"idIMDB":"tt30007899"}]},{"date":"20240329","movies":[{"idIMDB":"tt21235248"},{"idIMDB":"tt21692408"},{"idIMDB":"tt12299608"},{"idIMDB":"tt14362186"}]},{"date":"20240402","movies":[{"idIMDB":"tt22334258"}]},{"date":"20240405","movies":[{"idIMDB":"tt5672290"},{"idIMDB":"tt22525332"}]},{"date":"20240412","movies":[{"idIMDB":"tt14539740"}]},{"date":"20240415","movies":[{"idIMDB":"tt25054634"}]},{"date":"20240419","movies":[{"idIMDB":"tt27489557"}]},{"date":"20240421","movies":[{"idIMDB":"tt10954718"},{"idIMDB":"tt11333048"}]},{"date":"20240426","movies":[{"idIMDB":"tt16426418"}]},{"date":"20240430","movies":[{"idIMDB":"tt1117392"}]},{"date":"20240503","movies":[{"idIMDB":"tt1684562"}]},{"date":"20240510","movies":[{"idIMDB":"tt27002073"}]},{"date":"20240517","movies":[{"idIMDB":"tt11152168"}]},{"date":"20240524","movies":[{"idIMDB":"tt11389872"},{"idIMDB":"tt5779228"},{"idIMDB":"tt12037194"},{"idIMDB":"tt7193124"}]},{"date":"20240530","movies":[{"idIMDB":"tt1508690"}]},{"date":"20240607","movies":[{"idIMDB":"tt7181546"},{"idIMDB":"tt26736843"}]},{"date":"20240608","movies":[{"idIMDB":"tt24017338"}]},{"date":"20240609","movies":[{"idIMDB":"tt29330072"}]},{"date":"20240614","movies":[{"idIMDB":"tt22022452"},{"idIMDB":"tt4919268"}]},{"date":"20240615","movies":[{"idIMDB":"tt20873392"}]},{"date":"20240626","movies":[{"idIMDB":"tt14816630"}]},{"date":"20240628","movies":[{"idIMDB":"tt13433802"},{"idIMDB":"tt17505010"},{"idIMDB":"tt14088510"}]},{"date":"20240701","movies":[{"idIMDB":"tt16450020"},{"idIMDB":"tt15744718"}]},{"date":"20240703","movies":[{"idIMDB":"tt7510222"}]},{"date":"20240714","movies":[{"idIMDB":"tt16891968"}]},{"date":"20240719","movies":[{"idIMDB":"tt12584954"}]},{"date":"20240726","movies":[{"idIMDB":"tt6263850"}]},{"date":"20240802","movies":[{"idIMDB":"tt26753003"},{"idIMDB":"tt1609486"}]},{"date":"20240809","movies":[{"idIMDB":"tt4978420"}]},{"date":"20240816","movies":[{"idIMDB":"tt18412256"},{"idIMDB":"tt27665778"},{"idIMDB":"tt29372726"}]},{"date":"20240823","movies":[{"idIMDB":"tt26731216"}]},{"date":"20240830","movies":[{"idIMDB":"tt8790086"},{"idIMDB":"tt11307440"}]},{"date":"20240901","movies":[{"idIMDB":"tt28784201"}]},{"date":"20240904","movies":[{"idIMDB":"tt4519000"}]},{"date":"20240906","movies":[{"idIMDB":"tt2049403"}]},{"date":"20240913","movies":[{"idIMDB":"tt8864596"},{"idIMDB":"tt15482442"}]},{"date":"20241003","movies":[{"idIMDB":"tt10928904"}]},{"date":"20241004","movies":[{"idIMDB":"tt11315808"}]},{"date":"20241010","movies":[{"idIMDB":"tt8639168"},{"idIMDB":"tt14598526"}]},{"date":"20241011","movies":[{"idIMDB":"tt15845656"}]},{"date":"20241018","movies":[{"idIMDB":"tt29268110"}]},{"date":"20241024","movies":[{"idIMDB":"tt10844184"}]},{"date":"20241025","movies":[{"idIMDB":"tt27911000"}]},{"date":"20241031","movies":[{"idIMDB":"tt11487742"},{"idIMDB":"tt8702454"}]},{"date":"20241101","movies":[{"idIMDB":"tt19556180"}]},{"date":"20241108","movies":[{"idIMDB":"tt16366836"},{"idIMDB":"tt0899043"}]},{"date":"20241114","movies":[{"idIMDB":"tt27694684"}]},{"date":"20241115","movies":[{"idIMDB":"tt21815562"}]},{"date":"20241121","movies":[{"idIMDB":"tt10994444"}]},{"date":"20241122","movies":[{"idIMDB":"tt9218128"}]},{"date":"20241127","movies":[{"idIMDB":"tt1262426"},{"idIMDB":"tt26443597"}]}]},"about":{"version":"2.51.1","serverTime":"2023/12/03 04:36:57"}}';
            this.processList(id, JSON.parse(movieOffilenData), apikey, maxdays, offline);
        }
        else
        {
            var url = "https://www.myapifilms.com/imdb/comingSoon?token=" + apikey + "&format=json&language=en-us";
            var body = '';
            console.log("[MMM-IMDBMovies] Getting Coming soon list from " + url + "...");
            const request =   https.get(url, (response) => { 
                response.on('data', (data) => { 
                        body += data;
                });
                response.on('end', () => { 
                    this.processList(id, JSON.parse(body), apikey, maxdays);
                });
            });
            
            request.on('error', (err) => { 
                        console.log( "[MMM-IMDBMovies] Error: " + err.message); 
                    });
            request.end();  
        }

    },

    getMovieData: async function (idIMDB, apikey) {

        // Get movie detail, must waiting until get function returns. Wrap http get in promise statement
        return new Promise((resolve, reject) => {

            var url = "https://www.myapifilms.com/imdb/idIMDB?idIMDB=" + idIMDB + "&token=" + apikey + "&format=json&language=en-us";
            var returnJSON = '';
            var body = ''; 

            const request =   https.get(url, (response) => { 
                response.on('data', (data) => { 
                    body += data;
                }); 
    
                response.on('end', () => { 
                    returnJSON = JSON.parse(body); 
                    resolve(JSON.parse(body));
                    }); 
            });
    
            request.on('error', (err) => { 
                    console.log( "[MMM-IMDBMovies] Error: " + err.message); 
                });

            request.end(); 
        });

    },

    processList: async function (id, list, apikey, maxdays, offline) {

        var maxCommingSoon = new Date;
        var todayDate = new Date;
        var i, j, idIMDBData, movieList = [],  payload = {};
        var openningDate;
        const movieDefault01 = '{"data":{"movies":[{"year":1999,"releaseDate":"19990331","directors":[{"id":"nm0905154","name":"Lana Wachowski"},{"id":"nm0905152","name":"Lilly Wachowski"}],"writers":[{"id":"nm0905152","name":"Lilly Wachowski"},{"id":"nm0905154","name":"Lana Wachowski"}],"runtime":136,"countries":["United States","Australia"],"languages":["English"],"genres":["Action","Sci-Fi"],"simplePlot":"When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.","rating":8.7,"metascore":73,"rated":"R","votes":2007382,"type":"MOVIE","idIMDB":"tt0133093","title":"The Matrix","urlIMDB":"https://www.imdb.com/title/tt0133093/","urlPoster":"https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg"}]},"about":{"version":"2.51.1","serverTime":"2023/11/28 02:38:57"}}';
        const movieDefault02 = '{"data":{"movies":[{"year":1987,"releaseDate":"19871009","directors":[{"id":"nm0001661","name":"Rob Reiner"}],"writers":[{"id":"nm0001279","name":"William Goldman"}],"runtime":98,"countries":["United States"],"languages":["English"],"genres":["Adventure","Comedy","Family"],"simplePlot":"A bedridden boys grandfather reads him the story of a farmboy-turned-pirate who encounters numerous obstacles, enemies and allies in his quest to be reunited with his true love.","metascore":78,"rated":"PG","votes":444229,"type":"MOVIE","idIMDB":"tt0093779","title":"The Princess Bride","urlIMDB":"https://www.imdb.com/title/tt0093779/","urlPoster":"https://m.media-amazon.com/images/M/MV5BYzdiOTVjZmQtNjAyNy00YjA2LTk5ZTAtNmJkMGQ5N2RmNjUxXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_FMjpg_UX1000_.jpg"}]},"about":{"version":"2.51.1","serverTime":"2023/12/10 22:25:46"}}';
        const movieDefault03 = '{"data":{"movies":[{"year":1986,"releaseDate":"19860808","directors":[{"id":"nm0793802","name":"Nelson Shin"}],"writers":[{"id":"nm0295357","name":"Ron Friedman"},{"id":"nm0226863","name":"Flint Dille"},{"id":"nm0095685","name":"Douglas Booth"}],"runtime":84,"countries":["United States","Japan","Italy"],"languages":["English","Japanese"],"genres":["Animation","Action","Adventure"],"simplePlot":"The Autobots must stop a colossal planet consuming robot who goes after the Autobot Matrix of Leadership. At the same time, they must defend themselves against an all-out attack from the Decepticons.","rating":7.2,"metascore":43,"rated":"PG","votes":41461,"type":"MOVIE","idIMDB":"tt0092106","title":"The Transformers: The Movie","urlIMDB":"https://www.imdb.com/title/tt0092106/","urlPoster":"https://m.media-amazon.com/images/M/MV5BZGM1MGY4OTYtOGZkOC00NjYyLTk3OTMtODUyZDdhYWQ3NGFjXkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_FMjpg_UX1000_.jpg"}]},"about":{"version":"2.51.1","serverTime":"2023/12/10 22:29:11"}}';
       
    
        if (offline !== true) {
            if (list.error !== undefined) {
                payload.error = true;
                payload.errorMessage += "Code: " + list.error.code + " Message: " + list.error.message;
            }
            if (list.data !== undefined) {
                payload.error = false;
                var cs = list.data.comingSoon;
                if (cs.length === 0) {
                    console.log("[MMM-IMDBMovies] Warning: No movies selection found");
                }
                // only get movies data for max number of days
                maxCommingSoon.setDate(maxCommingSoon.getDate() + maxdays);
                for (i = 0; i < cs.length; i += 1) {
                    openningDate = Date.parse(cs[i].date.substr(0,4) + '-' + cs[i].date.substr(4,2) + '-' + cs[i].date.substr(6,2));
                    if ((openningDate < maxCommingSoon) && ( openningDate > todayDate ))
                    {
                        for (j = 0; j < cs[i].movies.length; j += 1) {
                            idIMDBData =  await this.getMovieData(cs[i].movies[j].idIMDB, apikey);
                            movieList.push(idIMDBData.data.movies[0]);
                            }
                        }
                    }
            }
        }

        //If nothing in the list load default movie selection.
        if (movieList.length === 0 ) {
            idIMDBData = JSON.parse(movieDefault01); 
            movieList.push(idIMDBData.data.movies[0]); 
            idIMDBData = JSON.parse(movieDefault02); 
            movieList.push(idIMDBData.data.movies[0]); 
            idIMDBData = JSON.parse(movieDefault03); 
            movieList.push(idIMDBData.data.movies[0]); 
        }

        payload.movieList = movieList;
        payload.id = id;
        this.sendSocketNotification("MOVIE_LIST", payload);
    }
});
