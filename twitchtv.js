$(document).ready(getAll);

// GET https://api.twitch.tv/kraken/streams/channel
// console.log()

// $.getJSON('https://api.twitch.tv/kraken/channels/freecodecamp?callback=?', function(data) {
//    console.log('channels', data);
//  });

function getAll() {

    var fccTwitchers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
        "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas",
        "brunofin", "comster404"
    ];

    // TODO: clear wherever you're storing your list
    $('#myListId').html('');

    $.each(fccTwitchers, function(i, twitcher) {
        $.when(
            $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + twitcher + '?callback=?'),
            $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + twitcher + '?callback=?')
        ).then(function(channelParameters, streamParameters) {


            console.log('channel', channelParameters[0], 'stream', streamParameters[0]);

            var link = channelParameters[0].url;
            var status = channelParameters[0].status;
            var message = channelParameters[0].message;
            // TODO: build whatever html objects you want with your datas
            var twitcherCard = $('<div class="twitcherCard"></div>');
            var twitcherName = $("<a href='" + link + "'><h3></h3></a>").html(twitcher);
            var streamInfo = $('<div class="streamInfo"></div>').html(status);
            console.log("channel status: " + channelParameters[0].status);
            if (status == null || status == "404") {
                streamInfo = $('<div class="streamInfo"></div>').html(message);
            }
            var sectionBreak = $('<hr class="decorativeLine"></hr>')
            twitcherCard.append(twitcherName);
            twitcherCard.append(streamInfo);
            twitcherCard.append(sectionBreak);






            // TODO: append objects to previously-cleared list
            $('#myListId').append(twitcherCard);

        });
    });
}
