//  https://github.com/sayantanm19/js-music-player
const number_of_songs = document.querySelector(".number-of-songs");
const song_name = document.querySelector(".song-name");
const song_img = document.querySelector(".song-img");

const prev_button = document.querySelector(".prev-button");
const play_button = document.querySelector(".play-button");
const next_button = document.querySelector(".next-button");
const doubleTime_button = document.querySelector(".doubleTime");
const halfTime_button = document.querySelector(".halfTime");


let seek_slider = document.querySelector(".seek_slider");
let current_time = document.querySelector(".current-time");
let total_time = document.querySelector(".total-time");

let song_index = 0;

let play_Music = document.createElement('audio');
let isPlaying = false;
let updateTimer = 0;

let song_list = [
    {
        name: "Toumei Elegy",
        img: "Images/toumei.jpg",
        path: "Songs/Elegy.mp3",
    },
    {
        name: "Shanghai teahouse remix",
        img: "Images/4052106.jpg",
        path: "Songs/Remix.mp3",
    },
    {
        name: "Freedom dive",
        img: "Images/587809.jpg",
        path: "Songs/Freedom Dive.mp3",
    },
    {
        name: "PUPA",
        img: "Images/pbg.jpg",
        path: "Songs/PUPA.mp3",
    }
];

function loadTrack(song_index){
    clearInterval(updateTimer);
    resetValues();
    play_Music.src = song_list[song_index].path;
    play_Music.load();
    
    
    song_img.style.backgroundImage = "url(" + song_list[song_index].img + ")";
    song_name.textContent = song_list[song_index].name;
    number_of_songs.textContent = (song_index + 1) + " " + "/" + " " + song_list.length;
    
    updateTimer = setInterval(seekUpdate, 1000);
    play_Music.addEventListener("ended", nextTrack);
}

function resetValues(){
    current_time.textContent = "00:00";
    total_time.textContent = "00:00";
    seek_slider.value = 0;
}

function seekTo(){
    seekto = play_Music.duration * (seek_slider.value / 100);
    play_Music.currentTime = seekto;
}

function seekUpdate() {
    let seekposition = 0;

    seekposition = play_Music.currentTime * (100 / play_Music.duration);

    seek_slider.value = seekposition;
        
    let currentMinutes = Math.floor(play_Music.currentTime / 60);
    let currentSeconds = Math.floor(play_Music.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(play_Music.duration / 60);
    let durationSeconds = Math.floor(play_Music.duration - durationMinutes * 60);
        
    currentMinutes < 10 ? currentMinutes = "0" + currentMinutes : currentMinutes;
    currentSeconds < 10 ? currentSeconds = "0" + currentSeconds : currentSeconds;
    durationMinutes < 10 ? durationMinutes = "0" + durationMinutes : durationMinutes;
    durationSeconds < 10 ? durationSeconds = "0" + durationSeconds : durationSeconds;
        
    current_time.textContent = currentMinutes + ":" + currentSeconds;
    total_time.textContent = durationMinutes + ":" + durationSeconds;
        
        
}

function playpauseTrack(){
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack(){
    play_Music.play();
    isPlaying = true;
    play_button.innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>';
}

function pauseTrack(){
    play_Music.pause();
    isPlaying = false;
    play_button.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';
}

function nextTrack(){
    if(song_index < song_list.length - 1){
        song_index += 1;
    }
    else{
        song_index = 0;
    }
    loadTrack(song_index);
    playTrack();
}

function prevTrack(){
    if(song_index > 0){
        song_index -= 1;
    }
    else{
        song_index = song_list.length - 1;
    } 

    loadTrack(song_index);
    playTrack();
}

function doubleTime(){
    play_Music.playbackRate = 1.25;
}

function halfTime(){
    play_Music.playbackRate = 0.50;
}

function reloadBtn(){
    play_button.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';
}

function init(){
    loadTrack(song_index);
}

init();

