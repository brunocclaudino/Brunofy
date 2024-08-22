const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const cover = document.getElementById('cover');
const song = document.getElementById('audio');
const play= document.getElementById('play');
const next= document.getElementById('next');
const previous= document.getElementById('previous');
const soPorUmaNoite = {
    songName: 'Só Por Uma Noite (Ao Vivo)',
    artist:'Charlie Brown Jr.',
    cover:'charlieBrown',
    file:'Só Por Uma Noite (Ao Vivo)'
}
const drainYou = {
    songName : 'Drain you',
    artist : 'Nirvana',
    cover:'nirvana',
    file:'Drain You'
}
const dontLookBackMeAnger = {
    songName : 'Don\'t Look Back In Anger',
    artist : 'Oasis',
    cover:'oasis',
    file:'Dont Look Back In Anger'
}

let isPlaying = false;
const playlist = [soPorUmaNoite,drainYou,dontLookBackMeAnger];
let index = 0;


function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play(); 
    isPlaying = true;
}

function pauseSong(){
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    song.pause();
    isPlaying = false;
}

function playPauseDecider(){
    if(isPlaying === true){
        pauseSong();
    }
    else{
        playSong();
    }
}

function initializeSong(){
    cover.src =`images/${playlist[index].cover}.jpeg`;
    song.src = `songs/${playlist[index].file}.mp3`;
    songName.innerText = playlist[index].songName;
    bandName.innerText = playlist[index].artist;
}
function previousSong(){
    if(index === 0){
        index = playlist.length - 1;
    }else{
        index--;
    }
    initializeSong();
    playSong();
}
function nextSong(){
    if(index === playlist.length - 1){
        index = 0;
    }else{
        index++;
    }
    initializeSong();
    playSong();
}
initializeSong();
play.addEventListener('click',playPauseDecider);
previous.addEventListener('click',previousSong);
next.addEventListener('click',nextSong);