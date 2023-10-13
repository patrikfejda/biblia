function createChapterSelectOptions() {
    var selectedBook = document.querySelector('select[name="book"]').value;
    var chaptersCount = numberOfChaptersInBooks[selectedBook];
    var select = document.querySelector('select[name="chapter"]');
    select.innerHTML = '';
    for (var i = 1; i <= chaptersCount; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        select.appendChild(option);
    }
}

function saveSelectionToLocalStorage() {
    var bookName = document.querySelector('select[name="book"]').value;
    var chapterName = document.querySelector('select[name="chapter"]').value;
    localStorage.setItem("bookName", bookName);
    localStorage.setItem("chapterName", chapterName);
}

function readSelectionsFromLocalStorage() {
    var storedBookName = localStorage.getItem("bookName");
    var storedChapterName = localStorage.getItem("chapterName");

    if (storedBookName) {
        document.querySelector('select[name="book"]').value = storedBookName;
    }
    if (storedChapterName) {
        createChapterSelectOptions();
        document.querySelector('select[name="chapter"]').value = storedChapterName;
    }
}

function printBibleChapter() {
    const bookName = document.querySelector('select[name="book"]').value;
    const chapterName = document.querySelector('select[name="chapter"]').value;
    const chapter = bible[bookName][chapterName];
    const text = `<h1>${humanReadableFormat[bookName]} kap. ${chapterName}</h1>`;
    const verseText = Object.entries(chapter).map(([verseNumber, verse]) => `<sup>${verseNumber}</sup> ${verse}<br>`).join('');
    document.getElementById("text").innerHTML = text + verseText;
}

document.getElementById("button").addEventListener("click", function () {
    saveSelectionToLocalStorage();
    printBibleChapter();
});

document.querySelector('select[name="book"]').addEventListener('change', function () {
    createChapterSelectOptions();
});

readSelectionsFromLocalStorage();
printBibleChapter();