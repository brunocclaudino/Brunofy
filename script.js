const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const cover = document.getElementById('cover');
const song = document.getElementById('audio');
const play= document.getElementById('play');
const next= document.getElementById('next');
const like = document.getElementById('like');
const previous= document.getElementById('previous');
const currentProgress= document.getElementById('current-progress');
const progressContainer= document.getElementById('progress-container');
const shuffleButton= document.getElementById('shuffle');
const repeatButton= document.getElementById('repeat');
const likeButton = document.getElementById('like');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');

const soPorUmaNoite = {
    songName: 'Só Por Uma Noite (Ao Vivo)',
    artist:'Charlie Brown Jr.',
    cover:'charlieBrown',
    file:'Só Por Uma Noite (Ao Vivo)',
    liked: false,
}
const drainYou = {
    songName : 'Drain you',
    artist : 'Nirvana',
    cover:'nirvana',
    file:'Drain You',
    liked: true,

}
const dontLookBackMeAnger = {
    songName : 'Don\'t Look Back In Anger',
    artist : 'Oasis',
    cover:'oasis',
    file:'Dont Look Back In Anger',
    liked: false,
}

let isPlaying = false;
let isShuffled = false;
let isRepeat = false;
let isLiked = false;
const originalPlaylist = JSON.parse(localStorage.getItem('playlist'))??[soPorUmaNoite,drainYou,dontLookBackMeAnger];
let sortedPlaylist = [...originalPlaylist]
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
    cover.src =`images/${sortedPlaylist[index].cover}.jpeg`;
    song.src = `songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
    likeButtonRender();
}
function previousSong(){
    if(index === 0){
        index = sortedPlaylist.length - 1;
    }else{
        index--;
    }
    initializeSong();
    playSong();
}
function nextSong(){
    if(index === sortedPlaylist.length - 1){
        index = 0;
    }else{
        index++;
    }
    initializeSong();
    playSong();
}
function updateProgess(){
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress',`${barWidth}%`);
    songTime.innerText = toHHMMSS(song.currentTime);    
}
function jumpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)*song.duration;
    song.currentTime = jumpToTime;
}
function shuffleArray(preShuffleArray){
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    
    while(currentIndex > 0 ){
        let randomIndex = Math.floor(Math.random() * size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}
function shuffleMode(){
    if(isShuffled === false){
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        //console.log('MISTO: [0]'+JSON.stringify(sortedPlaylist[0])+'[1]'+JSON.stringify(sortedPlaylist[1])+'[2]'+JSON.stringify(sortedPlaylist[2]));
        shuffleButton.classList.add('button-active');
    }
    else{
        isShuffled = false;
        sortedPlaylist = [...originalPlaylist];
        shuffleButton.classList.remove('button-active');
        //console.log('Original: [0]'+JSON.stringify(sortedPlaylist[0])+'[1]'+JSON.stringify(sortedPlaylist[1])+'[2]'+JSON.stringify(sortedPlaylist[2]));
    }
}
function repeatMode(){
    if(isRepeat === false){
        isRepeat = true;
        repeatButton.classList.add('button-active');
    }
    else{
        isRepeat = false;
        repeatButton.classList.remove('button-active');
    }
}
function nextOrRepeat(){
    if(isRepeat === false){
        nextSong();
    } else{
        playSong();
    }
}
function likeButtonRender(){
    if(sortedPlaylist[index].liked === true){
        //sortedPlaylist[index].liked = false;
        like.querySelector('.bi').classList.remove('bi-heart');
        like.querySelector('.bi').classList.add('bi-heart-fill');
        like.classList.add('button-active');
    }else{
        //sortedPlaylist[index].liked = true;
        like.querySelector('.bi').classList.remove('bi-heart-fill');
        like.querySelector('.bi').classList.add('bi-heart');
        like.classList.remove('button-active');
    }
}
function toHHMMSS(originalNumber){
    let hours = Math.floor(originalNumber/3600);
    let minutes = Math.floor((originalNumber - hours * 3600) / 60);
    let seconds = Math.floor(originalNumber - hours * 3600 - minutes * 60);

    return `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}

function updateTotalTime(){
    toHHMMSS(song.duration);
    totalTime.innerText = toHHMMSS(song.duration);
}
function likedSong(){
    if(sortedPlaylist[index].liked === false){
        sortedPlaylist[index].liked = true;
    }else{
        sortedPlaylist[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem('playlist',JSON.stringify(originalPlaylist));
}
initializeSong();
play.addEventListener('click',playPauseDecider);
previous.addEventListener('click',previousSong);
next.addEventListener('click',nextSong);
song.addEventListener('timeupdate', updateProgess);
song.addEventListener('ended',nextOrRepeat);
song.addEventListener('loadedmetadata',updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleMode);
repeatButton.addEventListener('click', repeatMode);
likeButton.addEventListener('click', likedSong);