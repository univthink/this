$(document).ready(function () {
    var playlists = [];
    var userID;
    if (localStorage.getItem("lastFM") != "null" || localStorage.getItem("lastFM") != "") {

                $.ajax({
                    type: "GET",
                    url: "https://api.spotify.com/v1/me",
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    dataType: "json",
                    data: "formdata",
                    success: function (userData) {
                        localStorage['userID'] = userData.id;
                        userID = localStorage['userID'];
                    }
                });
                 $.ajax({
                    type: "GET",
                    url: "https://api.spotify.com/v1/users/" + userID + "/playlists",
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    dataType: "json",
                    data: "formdata",
                    success: function (data) {
                        for (i = 0; i < data.items.length; i++) {
                            playlists.push(data.items[i].name);
                        }
                        if (playlists.indexOf("Partify") == -1) {
                            baseURL = "https://api.spotify.com/v1/users/";
                            searchQry = document.getElementById('filename').value;
                            sendInfo = { "name": "Partify", "public": true, }
                            $.ajax({
                                type: "POST",
                                url: "https://api.spotify.com/v1/users/" + userID + "/playlists",
                                headers: { 'Authorization': 'Bearer ' + access_token },
                                dataType: "application/json",
                                data: JSON.stringify(sendInfo),
                                success: function (dataFirst) {
                                    $.ajax({
                                        type: "GET",
                                        url: "https://api.spotify.com/v1/users/" + userID + "/playlists",
                                        headers: { 'Authorization': 'Bearer ' + access_token },
                                        dataType: "json",
                                        data: "formdata",
                                        success: function (data) {
                                          localStorage.setItem('Snapster', data.items[partyPlaylist].id);
                                         Snapster = localStorage['Snapster'];
                                        }
                                    });
                                }
                            });
                        }
                        else {
                          partyPlaylist = playlists.indexOf("Partify");
                          localStorage.setItem('Snapster', data.items[partyPlaylist].id);
                          console.log("Awesome");
                        }

                    }
                });
   }
});
