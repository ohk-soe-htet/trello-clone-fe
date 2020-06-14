let starStatus = false;
let lists = document.getElementById("lists");
let dataLists = [];

(() => {
    fetch("http://localhost:8080/lists")
        .then(res => res.json())
        .then(data => {
            dataLists = data;
            document.getElementById("lists").innerHTML = data.map(l => getList(l)).join("") + addDiv;
            if (lists.children[1]) {
                document.getElementById("addList").innerText = " + Add another list";
            }
        })
        .catch(err => console.log(err));
})();
//onclick display setting
const searchBar = () => {
    document.getElementById("search").style.width = "320px";
    document.getElementById("sIcon").style.display = "none";
    document.getElementById("searchInp").style.width = "232px";
}
const cancelSearchBar = () => {
    document.getElementById("search").style.width = "200px";
    document.getElementById("sIcon").style.display = "inline-block";
    document.getElementById("searchInp").style.width = "152px";
}

const starColor = () => {
    let star = document.getElementById("star");
    if (starStatus === false) {
        star.style.color = "gold";
        starStatus = true;
    } else if (starStatus === true) {
        star.style.color = "rgb(38, 22, 131)";
        starStatus = false;
    }
}

const inpLiDisplay = () => {
    document.getElementById("addList").style.display = "none";
    document.getElementById("inpList").style.display = "inline-block";
}
const cancelAddLi = () => {
    document.getElementById("addList").style.display = "inline-block";
    document.getElementById("inpList").style.display = "none";
}
const inpCardDis = event => {
    event.target.parentElement.previousElementSibling.style.display = "inline-block";
    event.target.parentElement.style.display = "none";
}
const cancelAddCard = event => {
    event.target.parentElement.style.display = "none";
    event.target.parentElement.nextElementSibling.style.display = "inline-block";
}

const addList = event => {
    const listTitle = document.getElementById("liTitle").value;
    if (listTitle) {
        fetch("http://localhost:8080/lists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: listTitle,
                    position: dataLists.length + 1
                })
            })
            .then(res => res.json())
            .catch(err => {
                console.log(err);
            })
    }
}

const addCard = event => {
    event.preventDefault();
}

const addDiv = `<div id="addList" onclick="inpLiDisplay()"> + Add a list</div>
<form id="inpList" onsubmit="addList(event)">
    <input type="text" placeholder="Enter list title" id="liTitle">
    <input type="submit" value="Add list" id="submitLi">
    <i class="fas fa-times" id="cancelLi" onclick="cancelAddLi()"></i>
</form>
<div id="marginR"></div>`;

const getCard = cards => {
    return `
    <div class="createdCard">
        <input type="text" class="createdCTitle" value="${cards.title}">
    </div>
    `;
};

const getList = list => {
    const cardsStr = list.cards.map(c => getCard(c, list)).join("");
    return `
    <div class="list">
        <div class="titleDiv">
            <input type="text" class="title" value="${list.title}">
            <i class="fas fa-ellipsis-h actionMenu"></i>
        </div>
        ${cardsStr}
        <form class="inpCard" onsubmit="addCard(event)">
            <input type="text" placeholder="Enter a title for this card" class="cardTitle"><br>
            <input type="submit" value="Add card" class="submitCard">
            <i class="fas fa-times cancelCard" onclick="cancelAddCard(event)"></i>
        </form>
        <div class="cardDiv">
            <div class="addCardDiv" onclick="inpCardDis(event)"> + Add a card</div>
            <i class="fas fa-window-restore tem" title="Create from template..."></i>
        </div>
    </div>
    `;
};