$(function () {

    // Variables to store the current text being searched and the "page" value
    var currentSearch = '';
    var continueSearch = '';

    // Triggers the search function when pressing "Enter"
    $(".main__input").keyup(function (e) {
        if (e.keyCode == 13) {
            $(".main__button").trigger("click");
        }
    })

    // onClick() -> Searches for pages with the input field value
    $(".main__button").click(function () {
        if ($(".main__input").val() == "") {
            return false;
        }
        if (currentSearch != '') {
            $(".result__section").fadeOut().remove();
            continueSearch = '';
        }
        currentSearch = $(".main__input").val().replace(" ", "20%");
        searchPages(currentSearch, continueSearch);
    }); // endof onChange

    // onClick() -> Searches for a random Wiki Page
    $(".main__random").click(function () {
        // Generate a random number to be the page's ID
        var randomId = Math.floor(Math.random() * 10 ** 6) + 1

        $.ajax({
            url: "https://en.wikipedia.org/w/api.php",
            data: {
                action: 'query',
                generator: 'random',
                format: 'json',
                prop: 'info',
                inprop: 'url',
                grnlimit: 1,
                grnnamespace: 0
            },
            dataType: "jsonp",
            success: function (data) {
                for (page in data.query.pages) {
                    window.open(data.query.pages[page].fullurl);
                }
            },
            error: function () {
                console.log("Error looking for data");
            }
        }); // endof ajax

        // window.open(data.query.pages[randomId].fullurl);
    }); // endof onClick

    // Triggers continue search when reaching bottom
    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            searchPages(currentSearch, continueSearch);
        }
    });

    /**
     * Search for pages in the MediaWiki API based on a text parameter
     * @param {String} search 
     * @param {Object} cont 
     */
    function searchPages(search, cont = {continue: '', sroffset: 10}) {
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php",
            async: false,
            data: {
                action: 'query',
                format: 'json',
                list: 'search',
                srsearch: search,
                continue: cont.continue,
                sroffset: cont.sroffset
            },
            dataType: 'jsonp',
            success: function (data) {
                if (data.hasOwnProperty("continue")) {
                    continueSearch = data.continue;
                }
                insertResultSection(data.query.search);
            },
            error: function () {
                console.log("Error looking for data");
            }
        }); // endof ajax

    } // endof searchPages()

    /**
     * Inserts a new section div in the page, containing the pages
     * @param {Array} pages 
     */
    function insertResultSection(pages) {
        $(".result").append('<div class="result__section"></div>');
        for (i in pages) {
            var page = pages[i];
            var insert = '<div class="col-xs-12 result__item">'
                + '<h3 class="result__title">'
                + '<a href="https://www.wikipedia.org/wiki/' + encodeURI(page.title) + '" target="_blank">'
                + page.title + '</a></h3>'
                + '<p class="result__snippet">' + page.snippet + '</p>'
                + '</div>';
            $(".result__section:last-child").append(insert);
        }
        $(".result__section:last-child").fadeIn();
    } // endof insertResultSection()
    
});
