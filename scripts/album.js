var setSong = function(songNumber) {
     currentlyPlayingSongNumber = parseInt(songNumber);
     currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
 };

 var getSongNumberCell = function(number) {
       return $('.song-item-number[data-song-number="' + number + '"]');
 };


 var createSongRow = function(songNumber, songName, songLength) {
     var template =
       ' <tr class="album-view-song-item">'
     + '     <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + '     <td class="song-item-title">' + songName + '</td>'
     + '     <td class="song-item-duration">' + songLength + '</td>'
     + ' </tr>'

     var $row = $(template);

var clickHandler = function() {
    var songNumber = parseInt($(this).attr('data-song-number'));

           //revert to song number if users plays new song
    if (currentlyPlayingSongNumber !== null) {
        var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
        currentlyPlayingCell.html(currentlyPlayingSongNumber);
    }
        //switch from play to pause for new song
    if (currentlyPlayingSongNumber !== songNumber) {
        $(this).html(pauseButtonTemplate);
        setSong(songNumber);
        updatePlayerBarSong();
          //switch from pause to play to pause currently playing song
    } else if (currentlyPlayingSongNumber === songNumber) {
          $(this).html(playButtonTemplate);
          $('.main-controls .play-pause').html(playerBarPlayButton);
          currentlyPlayingSongNumber = null;
          currentSongFromAlbum = null;
    }
};

  var onHover = function(event) {
      var songNumberCell = $(this).find('.song-item-number');
      var songNumber = parseInt(songNumberCell.attr('data-song-number'));
      if (songNumber !== currentlyPlayingSongNumber) {
          songNumberCell.html(playButtonTemplate);
      }
  };

  var offHover = function(event) {
      var songNumberCell = $(this).find('.song-item-number');
      var songNumber = parseInt(songNumberCell.attr('data-song-number'));
      if (songNumber !== currentlyPlayingSongNumber) {
        songNumberCell.html(songNumber);
      }
      console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
  };

     $row.find('.song-item-number').click(clickHandler);
     $row.hover(onHover, offHover);
     return $row;
 };

 var setCurrentAlbum = function(album) {
     currentAlbum = album;
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

 var trackIndex = function(album, song) {
      return album.songs.indexOf(song);
 };
//updates player bar with song name and artist name of currently playing song
 var updatePlayerBarSong = function() {
     $('.currently-playing .song-name').text(currentSongFromAlbum.title);
     $('.currently-playing .artist-name').text(currentAlbum.artist);
     $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
     $('.main-controls .play-pause').html(playerBarPauseButton);
 };

var nextPrevious = function(event) {
    var isNext = $(event.currentTarget).hasClass('next');
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    //goes to first song if at last song (loop forward)
      if (isNext === true) {
          currentSongIndex++;
          setSong(currentSongIndex + 1);
      } else if (currentSongIndex >= currentAlbum.songs.length) {
          currentSongIndex = 0;
          currentSongIndex++;
        setSong(currentSongIndex + 1);
      } else if (currentSongIndex < 0){
          currentSongIndex = currentAlbum.songs.length -1;
          currentSongIndex--;
          console.log(currentSongIndex, currentAlbum.songs.length - 1);
          setSong(currentSongIndex + 1);
      }
    var lastSongNumber = currentlyPlayingSongNumber;


    updatePlayerBarSong();
    $('.main-controls .play-pause').html(playerBarPauseButton);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    $lastSongNumberCell.html(lastSongNumber);
};


 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
 var playerBarPlayButton = '<span class="ion-play"></span>';
 var playerBarPauseButton = '<span class="ion-pause"></span>';
 var currentAlbum = null;
 var currentlyPlayingSongNumber = null;
 var currentSongFromAlbum = null; //holds currently playing song object from songs array
 var $previousButton = $('.main-controls .previous');
 var $nextButton = $('.main-controls .next');

 $(document).ready(function() {
      setCurrentAlbum(albumPicasso);
      $previousButton.click(nextPrevious);
      $nextButton.click(nextPrevious);
});
