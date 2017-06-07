$(function () {

    $(".main__input").keyup(function(e) {
        if (e.keyCode == 13) {
            $(".main__button").trigger("click");
        }
    })
    
    // onClick() -> Searches for pages with the input field value
    $(".main__button").click(function () {

        if ($(".main__input").val() == "") {
            return false;
        }
        $(".result").fadeOut();
        var txt = $(".main__input").val().replace(" ", "20%");
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php",
            data: {
                action: 'query',
                format: 'json',
                list: 'search',
                srsearch: txt
            },
            dataType: 'jsonp',
            success: function (data) {
                console.log(data);
                $(".result").html("");
                for (i in data.query.search) {
                    var page = data.query.search[i];
                    var insert = '<div class="col-xs-12 result__item">'
                    + '<h3 class="result__title">'
                    + '<a href="https://www.wikipedia.org/wiki/'+ encodeURI(page.title) +'" target="_blank">'
                    + page.title +'</a></h3>'
                    + '<p class="result__snippet">'+ page.snippet +'</p>'
                    + '</div>';
                    $(".result").append(insert);
                }
                $(".result").fadeIn();
            },
            error: function () {
                console.log("Error looking for data");
            }
        }); // endof ajax
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
                // console.log(data);
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

});