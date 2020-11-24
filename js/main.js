load_div('root', 'snip/newgame.html')
let levels, i = -1, len, total_time = 5, score = 0, time_left, timer;

function load_div(id, file) {
    fetch(file)
        .then(
            resp => resp.text()
        )
        .then(
            data => document.getElementById(id).innerHTML = data
        )
        .catch(
            e => console.log(e)
        )
}

function load_json(file) {
    fetch(file)
        .then(
            resp => resp.json()
        )
        .then(
        data => {
            len = Object.keys(data).length;
            levels = data;
            start_level()
            }
        )
        .catch(
            e => console.log(e)
        )
}

function newgame() {
    load_div('root', 'snip/game.html')
    load_json('snip/levels.json')
}

function start_level() {
    i++;

    clearInterval(timer)

    if(i == len) {
        show_score()
        return
    }
    document.getElementsByClassName('timer_progress')[0].style.width = "0";
    let interval = 0.2;
    document.getElementById('img_right').src = levels[String(i)].right_img;
    document.getElementById('img_left').src = levels[String(i)].left_img;
    document.getElementById('img_desc').innerHTML = levels[String(i)].name;
    time_left = total_time;
    timer = setInterval(() => {
        document.getElementsByClassName('timer_progress')[0].style.width = String(100 * (1 - time_left/total_time)) + '%'
        time_left -= interval;
        if(time_left <= 0) {
            start_level();
        }
    }, 1000 * interval)
}

function check(string){
    console.log(string)
    if(string === levels[String(i)].correct && time_left >= 0)
        score += time_left;
    start_level()
}

function show_score() {
    load_div('root','snip/scores.html')
    t = setInterval(() => {
        if(document.getElementById('score') != null) {
            getScore();
            clearInterval(t);
        }
    }, 10);
}

function getScore() {
    document.getElementById('score').innerHTML = Math.floor(score)
}
