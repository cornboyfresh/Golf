let url = "https://site.web.api.espn.com/apis/v2/scoreboard/header?sport=golf&league=pga&region=us&lang=en&contentorigin=espn&buyWindow=1m&showZipLookup=true&tz=America/New_York"
let url2 = "https://www.masters.com/en_US/scores/feeds/2023/scores.json"

function createGolfer(name, owner, score, thru, r1, r2, r3, r4) {
    return {
        name: name,
        owner: owner,
        score: score,
        thru: thru,
        r1: r1,
        r2: r2,
        r3: r3,
        r4: r4
    }
}

let allGolfers = {}
let ourGolfers = []
let ids = {
    "shelby": [46046, 39971, 39997],
    "pops": [34046, 47504, 40098],
    "alisha": [28237, 32839, 30911],
    "matt": [50525, 46717, 8793],
    "hillary": [46970, 57366, 33204],
    "hunter": [33448, 28089, 34363],
    "zach": [30925, 36689, 34098],
    "sammie": [35891,29725, 22405],
    "lollie": [47483, 39977, 47959],
    "jon": [35450, 48081, 37378]
}

fetch(url2).then(function(response) {
    return response.json()
}).then(function(data) {
    //let competitors = data['sports'][0]['leagues'][0]['events'][0]['competitors']
    //let competitors = data['events'][0]['competitions'][0]['competitors']
    let players = data['data']['player']
    players.forEach(competitor => {
        allGolfers[competitor.id] = competitor
    })
}).then(function() {
    for (const name in ids) {
        for (const id in ids[name]) {
            console.log(ids[name])
            console.log(name)
            let golfer = allGolfers[ids[name][id]]
            let score = golfer['topar']
            if (score == "E" || score == "") {
                score == 0
            } else {
                score == parseInt(score)
            }
            ourGolfers.push(createGolfer(golfer['display_name'],
                                        name,
                                        score,
                                        golfer['thru'],
                                        golfer['round1']['total'],
                                        golfer['round2']['total'],
                                        golfer['round3']['total'],
                                        golfer['round4']['total'],
                                        ))
        }
    }
}).then(function() {
    ourGolfers.sort(function(a, b) {
        return a.score - b.score
    })

    ourGolfers.forEach((golfer, index) => {
        let container = document.createElement("div")
        container.className = "row"
        container.classList.add("color" + index%2)

        let scoreDiv = document.createElement("div")
        scoreDiv.className = "stat"
        scoreDiv.className = "score"
        scoreDiv.innerText = golfer.score

        let nameDiv = document.createElement("div")
        nameDiv.className = "stat"
        nameDiv.innerText = golfer.name

        let ownerDiv = document.createElement("div")
        ownerDiv.className = "stat"
        ownerDiv.innerText = golfer.owner

        let thruDiv = document.createElement("div")
        thruDiv.className = "stat"
        thruDiv.innerText = golfer.thru

        container.appendChild(scoreDiv)
        container.appendChild(nameDiv)
        container.appendChild(thruDiv)
        container.appendChild(ownerDiv)

        document.body.appendChild(container)
    })
})