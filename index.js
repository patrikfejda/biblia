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
    var bookName = document.querySelector('select[name="book"]').value;
    var bookNameHumanReadable = humanReadableFormat[bookName];
    var chapterName = document.querySelector('select[name="chapter"]').value;
    var text = `<h1>${bookNameHumanReadable} kap. ${chapterName}</h1>`;
    var chapter = bible[bookName][chapterName];
    var verseText = '';
    for (var verseNumber in chapter) {
        var verse = chapter[verseNumber];
        verseText += `<sup>${verseNumber}</sup> ${verse}<br>`;
    }
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