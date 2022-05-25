import Player from '@vimeo/player';

const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.setCurrentTime(getCurrentTime());

player.on('timeupdate', onPlayerCurrentTimeSave, 1000);

function onPlayerCurrentTimeSave(event) {
  let timeToSave = event.seconds;
  localStorage.setItem(LOCAL_STORAGE_KEY, timeToSave);
  console.log('timeupdate', event);
}

function getCurrentTime() {
  return localStorage.getItem(LOCAL_STORAGE_KEY);
}
