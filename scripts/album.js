var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21' },
         { title: 'Magenta', duration: '2:15'},
     ]
 };

var albumMarconi = {
      title: 'The Telephone',
      artist: 'Guglielmo Marconi',
      label: 'EM',
      year: '1909',
      albumArtUrl: 'assets/images/album_covers/20.png',
      songs: [
          { title: 'Hello, Operator?', duration: '1:01' },
          { title: 'Ring, ring, ring', duration: '5:01' },
          { title: 'Fits in your pocket', duration: '3:21'},
          { title: 'Can you hear me now?', duration: '3:14' },
          { title: 'Wrong phone number', duration: '2:15'}
      ]
  };

 var createSongRow = function(songNumber, songName, songLength) {
     var template =
       ' <tr class="album-view-song-item">'
     + '     <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + '     <td class="song-item-title">' + songName + '</td>'
     + '     <td class="song-item-duration">' + songLength + '</td>'
     + ' </tr>'

     return $(template);
 };

 var setCurrentAlbum = function(album) {
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
     $albumSongList.empty();
     for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };

 //This runs through DOM to find the class we want. If it doesn't exist, it returns undefined, if the class is found, it's returned.
 function findParentByClassName (element, targetClass) {
     if (element) {
         var currentParent = element.parentElement;
         while(currentParent.className !== null && currentParent.className !== targetClass) {
             currentParent = currentParent.parentElement
         }
     } else if (currentParent === null) {
         console.log("No parent found.")
     } else if (currentParent.className === null) {
         console.log("No parent found with that class name.")
     }
    return currentParent;
 };

 var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
 var songRows = document.getElementsByClassName('album-view-song-item');
 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
 var currentlyPlayingSong = null;


 //This determienes whethether to display the play/pause button, or the song number.
 var getSongItem = function(element) {
     switch(element.className){
         case 'album-song-button':
         case 'ion-play':
         case 'ion-pause':
             return findParentByClassName(element, 'song-item-number');
         case 'song-item-number':
             return element;
             break;
         case 'song-item-title':
         case 'song-item-duration':
             return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
             break;
         case 'album-view-song-item':
             return element.querySelector('.song-item-number');
         default:
             return;
     }
  };


var clickHandler = function(targetElement) {
      var songItem = getSongItem(targetElement);
      //assigns pause button template if there's not a currently playing song
      if (currentlyPlayingSong === null) {
          songItem.innerHTML = pauseButtonTemplate;
          currentlyPlayingSong = songItem.getAttribute('data-song-number');
     //changes currently playing song to null and removes pause if pause button is clicked
     }  else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
           songItem.innerHTML = playButtonTemplate;
           currentlyPlayingSong = null;
     //in case a song is currently playing and another song is clicked then this assigns pause button to new song
     } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }
 };

 window.onload = function() {
      setCurrentAlbum(albumPicasso);
      //This shows the play button during mouseover
      songListContainer.addEventListener('mouseover', function(event) {
         if (event.target.parentElement.className === 'album-view-song-item') {
             var songItem = getSongItem(event.target);
             if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                 songItem.innerHTML = playButtonTemplate;
             }
         }
});
      //this stores the song number and displays it on mouseleave, replacing the play button
     for (var i = 0; i < songRows.length; i++) {
          songRows[i].addEventListener('mouseleave', function(event) {
             //caches song item and song number as a variable to maximize performance
              var songItem = getSongItem(event.target);
              var songItemNumber = songItem.getAttribute('data-song-number');
              if (songItemNumber !== currentlyPlayingSong) {
                  songItem.innerHTML = songItemNumber;
              }
          });
      //this calls clickhandler on click
      songRows[i].addEventListener('click', function(event) {
         clickHandler(event.target);
      });
    }
  };
