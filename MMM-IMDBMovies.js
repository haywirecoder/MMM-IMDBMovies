/* global Module */

Module.register("MMM-IMDBMovies", {
    defaults: {
        reloadInterval: 12 * 60 * 60 * 1000, //12 hours
        maxDaysAhead: 15,
        dataSwapInterval: 30 * 1000, //30 sec
        animationSpeed: 1.5 * 1000, //1.5 secs
        offLineMode: false
    },

    start: function () {
        this.guid = this.createPseudoGUID();
        this.validConfig = this.checkConfig();
    
        if (this.validConfig) {
            this.loaded = false;
            this.error = false;
            this.updateListTimer();
        }
    },

    getHeader: function () {
        if (this.movieList !== undefined) {
            var titleHeader = this.data.header;
            if (this.movieList.length > 0) {
                titleHeader = titleHeader + " (" + (this.activeItem === 0 ? this.movieList.length : this.activeItem) + "/" + this.movieList.length + ")";
            }
            if (this.config.offLineMode) titleHeader = titleHeader + " - Offline Mode";

            return titleHeader;
        }
        return this.data.header
    },

    getStyles: function () {
        return [
            this.file("css/MMM-IMDBMovies.css"),
            "font-awesome.css"
        ]
    },

    getStars: function(movie_rating) {

        // Round to nearest half
        let rating = Math.round(movie_rating) / 2;
        const output = [];
     
        // Append all the filled whole stars
        for (var i = rating; i >= 1; i--)
            output.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');
      
        // If there is a half a star, append it
        if (i == .5) output.push('<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');
      
        return output.join('');
      
     },

    getDom: function () {
        var wrapper = document.createElement("div");
        wrapper.classList.add("foreground", "align-left");
        if (!this.validConfig) {
            wrapper.innerHTML = 'Invalid config! ' + this.errorMessage;
            return wrapper;
        }
        if (!this.loaded) {
            if (this.error) {
                wrapper.innerHTML = "an error occured: " + this.errorMessage;
                wrapper.className = "xsmall dimmed";
            } else {
                wrapper.innerHTML = "<span class='small fa fa-refresh fa-spin fa-fw'></span>";
                wrapper.className = "small dimmed";
            }
            return wrapper;
        }
        var title = document.createElement('div');
        title.classList.add('title');
        title.innerHTML = `${this.movieList[this.activeItem].title}`;
        wrapper.appendChild(title);


        var contentDiv = document.createElement('div');

        var background = document.createElement('div');
        background.classList.add('background');
        background.style.backgroundImage = `url(${this.movieList[this.activeItem].urlPoster})`;
        contentDiv.appendChild(background);

        var poster = document.createElement('img');
        poster.classList.add('poster');
        poster.src = this.movieList[this.activeItem].urlPoster;
        contentDiv.appendChild(poster);


        var releaseDate = document.createElement('div');
        releaseDate.classList.add('bright', 'xsmall');
        var rDate = new Date();
        rDate.setFullYear(
            parseInt(this.movieList[this.activeItem].releaseDate.slice(0, 4)),
            parseInt(this.movieList[this.activeItem].releaseDate.slice(4, 6)) - 1,
            parseInt(this.movieList[this.activeItem].releaseDate.slice(6))
        );
        releaseDate.innerHTML = `<b>Release: </b>` + rDate.toDateString();
        contentDiv.appendChild(releaseDate);
        
       if (this.movieList[this.activeItem].genres  !== undefined) {
            var genres = document.createElement('div');
            var max = Math.min(3, this.movieList[this.activeItem].genres.length);
            for (let i = 0; i < max; i += 1) {
                    let genre = document.createElement('span');
                    genre.classList.add('xsmall', 'thin', 'genre');
                    genre.innerHTML = this.movieList[this.activeItem].genres[i];
                    genres.appendChild(genre);
            }
            contentDiv.appendChild(genres);
        }
        
        if (this.movieList[this.activeItem].rated !== undefined) {
            var rated = document.createElement('div');
            rated.classList.add('xsmall', 'thin', 'rating');
            rated.innerHTML = `${this.movieList[this.activeItem].rated}`;
            contentDiv.appendChild(rated);
        }
        

        if (this.movieList[this.activeItem].rating !== undefined) {
            const stars = document.createElement('div');
            stars.classList.add('xsmall','thin');
            const starspan = document.createElement('span');
            starspan.innerHTML = this.getStars(this.movieList[this.activeItem].rating) + '&nbsp;';
            stars.appendChild(starspan);

            const ratingspan = document.createElement('span');
      
            if (this.movieList[this.activeItem].metascore == undefined) {
                ratingspan.classList.add('metascore_none');
                ratingspan.innerHTML = 'NR';
            } else { 
                if (this.movieList[this.activeItem].metascore < 40) {
                    ratingspan.classList.add('metascore_negative');
                } else if (this.movieList[this.activeItem].metascore > 60) {
                            ratingspan.classList.add('metascore_positive');
                        } else ratingspan.classList.add('metascore_mixed');

                ratingspan.innerHTML =`${this.movieList[this.activeItem].metascore}`;
            }
            stars.appendChild(ratingspan);
            contentDiv.appendChild(stars);
        }
        

        var plot = document.createElement('div');
        plot.classList.add('xsmall', 'plot');
        var editedPlot = this.movieList[this.activeItem].simplePlot;
        if (editedPlot.length > 250) {
            editedPlot = editedPlot.slice(0, 248) + "...";
        }
        plot.innerHTML = editedPlot;
        contentDiv.appendChild(plot);

        wrapper.appendChild(contentDiv);
        this.activeItem += 1;
        if (this.activeItem >= this.movieList.length) {
            this.activeItem = 0;
        }
        return wrapper;
    },

    checkConfig: function () {
        if (this.config.apikey === "You Must Change This Value") {
            this.error = true;
            this.errorMessage = "Missing API Key!";
            return false;
        }
        if (this.config.reloadInterval < 60 * 60 * 1000) {
            this.config.reloadInterval = 60 * 60 * 1000;
        }
        return true;
    },

    reloadData: function () {
        var now = new Date();
        this.year = now.getFullYear();
        this.month = ("0" + (now.getMonth() + 1)).slice(-2);
        this.error = false;
        this.errorMessage = "";
        this.loaded = false;
        this.movieList = [];
        this.activeItem = 0;
        Log.info("[MMM-IMDBMovies] reloading IMDB data");
        this.sendSocketNotification("GET_MOVIES", {
            id: this.guid,
            apikey: this.config.apikey,
            maxdays: this.config.maxDaysAhead,
            offline: this.config.offLineMode,
        })
    },

    socketNotificationReceived: function (notification, payload) {
        if (payload.id !== this.guid) {
            return;
        }
        if (notification === "MOVIE_LIST") {
            if (!payload.error) {
                this.error = false;
                this.movieList = this.movieList.concat(payload.movieList);
                this.movieList.sort(function (a, b) {
                    var x = a.releaseDate.toString();
                    var y = b.releaseDate.toString();
                    if (x < y) {
                        return -1;
                    }
                    if (x > y) {
                        return 1;
                    }
                    return 0;
                });
                if (!this.loaded) {
                    this.loaded = true;
                    this.updateDomTimer();
                    console.log("animation timer" + this.cycleListTimerID);
                }
            } else {
                this.loaded = false;
                this.error = true;
                this.errorMessage = payload.errorMessage;
                setTimeout(this.reloadData(), 60 * 1000)
            }
        }
    },

    updateDomTimer: function () {
        this.updateDom(this.config.animationSpeed);

        if (!this.cycleListTimerID === undefined) {
            clearInterval(this.cycleListTimerID);
        }

        var self = this;
        this.cycleListTimerID = setInterval(function () {
            self.updateDom(self.config.animationSpeed);
        }, this.config.dataSwapInterval);
    },

    updateListTimer: function () {
       

        if (!this.reloadDataTimerID === undefined) {
            clearInterval(this.reloadDataTimerID);
            this.loaded = false;
        } 
        if (!this.loaded) this.reloadData();

        var self = this;
        this.reloadDataTimerID = setInterval(function () {
            self.reloadData();
        }, this.config.reloadInterval);
    },

    createPseudoGUID: function () {
        return this.pseudoGUIDHelper() +
            this.pseudoGUIDHelper() +
            '-' +
            this.pseudoGUIDHelper() +
            '-' +
            this.pseudoGUIDHelper() +
            '-' +
            this.pseudoGUIDHelper() +
            '-' +
            this.pseudoGUIDHelper() +
            this.pseudoGUIDHelper() +
            this.pseudoGUIDHelper();
    },

    pseudoGUIDHelper: function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

});