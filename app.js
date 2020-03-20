const app = () => {
    const song = document.querySelector('.song'),
          play = document.querySelector('.play'),
          outline = document.querySelector('.moving-outline circle'),
          video = document.querySelector('.vid-container__video');

    // Sounds
    const sounds = document.querySelectorAll('.sound-picker button');

    // Time Display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');

    // Get the length of outline
    const outlineLength = outline.getTotalLength();
    
    // Durations
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Pick different sounds
    sounds.forEach(sound => {
        sound.addEventListener('click', function() {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    })

    // Play Sound
    play.addEventListener('click', () => {
       checkPlaying(song);
    });

    // Stop and Play the song function
    const checkPlaying = song => {
        if(song.paused){
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        }else{
            video.pause();
            song.pause();
            play.src = './svg/play.svg';
        }
    }

    // Select sound
    timeSelect.forEach(option => {
        option.addEventListener('click', function() {
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        })
    })

    // Animating Play button
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        // Animate Circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        // Animate Text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= fakeDuration){
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }
    };
};

app();