
function createChapterSelectOptions() {
    var book = document.querySelector('select[name="book"]').value;
    var chapters = numberOfChaptersInBooks[book];
    var select = document.querySelector('select[name="chapter"]');
    select.innerHTML = '';
    for (var i = 1; i <= chapters; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        select.appendChild(option);
    }
}

document.querySelector('select[name="book"]').addEventListener('change', function () {
    createChapterSelectOptions();
});

function saveSelectionToLocalstorage() {
    var book_name = document.querySelector('select[name="book"]').value;
    var chapter_name = document.querySelector('select[name="chapter"]').value;
    localStorage.setItem("book_name", book_name);
    localStorage.setItem("chapter_name", chapter_name);
}

function readSelectionsFromLocalstorage() {
    stored_book_name = localStorage.getItem("book_name");
    stored_chapter_name = localStorage.getItem("chapter_name");

    if (stored_book_name) {
        document.querySelector('select[name="book"]').value = stored_book_name;
    }
    if (stored_chapter_name) {
        createChapterSelectOptions();
        document.querySelector('select[name="chapter"]').value = stored_chapter_name;
    }
}
readSelectionsFromLocalstorage();
printBibleChapter();

function printBibleChapter() {
    var book_name = document.querySelector('select[name="book"]').value;
    var book_name_human_readable = humanReadableFormat[book_name]
    var chapter_name = document.querySelector('select[name="chapter"]').value;
    text = `<h1>${book_name_human_readable} kap. ${chapter_name}</h1>`;
    chapter = bible[book_name][chapter_name];
    document.getElementById("text").innerHTML = text;
    for (verse_number in chapter) {
        verse = chapter[verse_number];
        // append verse_number, " ", verse, "<br>" to text
        text += `<sup>${verse_number}</sup> ${verse}<br>`;
        // text += verse_number + " " + verse + "<br>";
    }
    document.getElementById("text").innerHTML = text;

}

document.getElementById("button").addEventListener("click", function () {
    saveSelectionToLocalstorage();
    printBibleChapter();
});