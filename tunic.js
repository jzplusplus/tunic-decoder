const vowels = {
    "2": "e",
    "12": "ʌ",
    "23456": "i",
    "3456": "ɛ",
    "1": "aɪ",
    "56": "ɪ",
    "12345": "u",
    "12346": "ɔɹ",
    "6": "aw",
    "234": "ɔ",
    "123456": "o",
    "1234": "æ",
    "1256": "ɑɹ",
    "13456": "ɚ",
    "2346": "ɪɹ",
    "346": "ɛɹ",
    "12346": "ɔɹ",
    "345": "ʊ"
};

const consonants = {
    "26": "b",
    "13456": "ʃ",
    "25": "l",
    "125": "ɹ",
    "1245": "s",
    "46": "m",
    "126": "k",
    "15": "p",
    "256": "h",
    "24": "dʒ",
    "246": "d",
    "2456": "ð",
    "145": "f",
    "156": "ɡ",
    "135": "t",
    "235": "j",
    "346": "n",
    "13": "w",
    "2356": "z",
    "236": "v",
    "12346": "ʒ",
    "123456": "ŋ",
    "1235": "θ",
    "35": "tʃ"
};

const no_stem = ["346", "13"];

let current = {
    "v1": false,
    "v2": false,
    "v3": false,
    "v4": false,
    "v5": false,
    "v6": false,
    "c1": false,
    "c2": false,
    "c3": false,
    "c4": false,
    "c5": false,
    "c6": false,
    "bubble": false
};

let v = "";
let c = "";

function update() {
    let lines = document.getElementsByClassName("letter-lines");
    v = "";
    c = "";

    for (line of lines) {
        if (current[line.id]) {
            line.style.opacity = 1;
            if (line.id.substring(0, 1) == "v") v += line.id.substring(1, 2);
            if (line.id.substring(0, 1) == "c") c += line.id.substring(1, 2);
        } else line.style.opacity = 0;
    }

    if ((current["c1"] || current["c2"] || current["c3"]) && !no_stem.includes(c)) {
        document.getElementById("stem").style.opacity = 1;
    } else {
        document.getElementById("stem").style.opacity = 0;
    }

    if (v == "" && c == "") {
        document.getElementById("submit").textContent = "Space";
    } else if ((c.length > 0 && !consonants.hasOwnProperty(c)) || (v.length > 0 && !vowels.hasOwnProperty(v))) {
        document.getElementById("submit").textContent = "-";
    } else {
        document.getElementById("submit").textContent = "Enter";
    }
}

let touchzones = document.getElementsByClassName("touch-zones");
for (tz of touchzones) {
    tz.addEventListener("click", function(e) {
        let id = e.target.id.split("-")[0];
        current[id] = !current[id];
        update();
    });
}

document.getElementById("submit").addEventListener("click", function(e) {
    let vow = "";
    if (vowels.hasOwnProperty(v)) vow = vowels[v];

    let con = "";
    if (consonants.hasOwnProperty(c)) con = consonants[c];

    if (v.length == 0 && c.length == 0) {
        document.getElementById("result").innerHTML += "\u00A0";
        document.getElementById("result").innerHTML += "<wbr>";
    } else if (current["bubble"]) {
        document.getElementById("result").innerHTML += vow;
        document.getElementById("result").innerHTML += con;
    } else {
        document.getElementById("result").innerHTML += con;
        document.getElementById("result").innerHTML += vow;
    }

    for (const key in current) {
        current[key] = false;
    }
    update();
});

update();