$(function () {

    // onClick() -> Opens the input field
    $(".main__search").click(function () {
        $(".main__input").show();
    });

    // onChange() -> Searches for pages with the input field value
    $(".main__input").change(function () {

        var txt = $(this).val().replace(" ", "20%");
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