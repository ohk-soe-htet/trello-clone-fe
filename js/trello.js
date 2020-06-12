let starStatus = false;
let lists = document.getElementById("lists");

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

(() => {
    fetch("http://localhost:8080/lists")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            document.getElementById("lists").innerHTML = data.map(l => getList(l)).join("") + addDiv;
            if (lists.children[1]) {
                document.getElementById("addList").innerText = " + Add another list";
            }
        })
        .catch(err => console.log(err));
})();

const inpLiDisplay = () => {
    document.getElementById("addList").style.display = "none";
    document.getElementById("inpList").style.display = "inline-block";
}
const cancelAddLi = () => {
    document.getElementById("addList").style.display = "inline-block";
    document.getElementById("inpList").style.display = "none";
}

const addList = event => {
    event.preventDefault();
    let newList = document.createElement("div");
    newList.setAttribute("class", "list");
    lists.insertBefore(newList, addListDiv);
    addListDiv.style.display = "inline-block";
    inpListDiv.style.display = "none";
}

if (lists.children[0].children[3]) {
    lists.children[0].lastElementChild.children[0].innerText = " + Add another card";
}

const inpCardDis = event => {
    event.target.parentElement.previousElementSibling.style.display = "inline-block";
    event.target.parentElement.style.display = "none";
}

const cancelAddCard = event => {
    event.target.parentElement.style.display = "none";
    event.target.parentElement.nextElementSibling.style.display = "inline-block";
}

const addCard = event => {
    event.preventDefault();
    console.log(event.target.firstElementChild.value);
}

const addDiv = `<div id="addList" onclick="inpLiDisplay()"> + Add a list</div>
<form id="inpList" onsubmit="addList(event)">
    <input type="text" placeholder="Enter list title" id="liTitle">
    <input type="submit" value="Add list" id="submitLi">
    <i class="fas fa-times" id="cancelLi" onclick="cancelAddLi()"></i>
</form>
<div id="marginR"></div>`;

const getCard = (cards, list) => {
    console.log(cards.title);
    return `
    <div class="createdCard">
                <input type="text" class="createdCTitle" value="${cards.title}">
            </div>
    `;
};

const getList = (list) => {
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