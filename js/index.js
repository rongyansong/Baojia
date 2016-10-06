/**
 * Created by YangZi on 2016/10/3.
 */
window.addEventListener('touchmove', function (e) {
    e.preventDefault();
});
var index = 2;
var totalAngle= 0;
window.addEventListener('DOMContentLoaded', function () {
    //音乐暂停、播放
    music();
    //进入第二页
    setTimeout(function () {
        $('.content').css({'-webkit-transform': 'translate3d(-12.5%,0,0)', 'transform': 'translate3d(-12.5%,0,0)'});
    }, 2000);
    //触摸移动骑车并进入第三页
    $('.page2').on('touchstart', '.page2-car', function (e) {
        $('.page2').addClass('active');
        setTimeout(function () {
            $('.content').css({'-webkit-transform': 'translate3d(-25%,0,0)', 'transform': 'translate3d(-25%,0,0)'});
            index++;
        }, 2000);
    });
    startRotate();

});

function startRotate(){
    //换页
    touch.on('.target', 'touchstart', function (ev) {
        ev.startRotate();
        ev.preventDefault();
    });
    touch.on('.target', 'rotate', function (ev) {
        ev.preventDefault();
        totalAngle += ev.rotation;
        this.style.webkitTransform = 'rotate(' + totalAngle + 'deg)';
        if(ev.fingerStatus === 'end'){
            this.style.webkitTransform = 'rotate(0deg)';
            if (ev.direction == 'right') {
                index = index + 1 >= 8 ? 8 : index + 1;
            } else if (ev.direction == 'left') {
                index = index - 1 <= 2 ? 2 : index - 1;
            }
            animate();
            $('.page').removeClass('active');
            if (index != 2) {
                $('.page' + index).addClass('active');
            }
        }
    });
}
function animate() {
    $('.page').removeClass('active');
    $('.content').css({
        '-webkit-transform': 'translate3d(-' + (index) / 8 * 100 + '%,0,0)',
        'transform': 'translate3d(-' + (index - 1) / 8 * 100 + '%,0,0)'
    })
}
//音乐播放
function music() {
    var box = document.getElementById('music-box');
    var audio = document.createElement('audio');
    var source = document.createElement('source');
    source.src = 'music/bg.mp3';
    audio.autoplay = true;
    audio.loop = true;
    audio.appendChild(source);
    box.appendChild(audio);
    audio.play();
    box.addEventListener('touchstart', function () {
         if (audio.paused) {
            audio.play();
            $('.music').css({'-webkit-animation-play-state': 'running', 'animation-play-state': 'running'});
        } else {
            audio.pause();
            $('.music').css({'-webkit-animation-play-state': 'paused', 'animation-play-state': 'paused'});
        }
    })
}

