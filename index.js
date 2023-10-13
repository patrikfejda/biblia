function createChapterSelectOptions() {
    const selectedBook = document.querySelector('select[name="book"]').value;
    const chaptersCount = numberOfChaptersInBooks[selectedBook];
    const chapterSelect = document.querySelector('select[name="chapter"]');
    chapterSelect.innerHTML = '';
    for (let i = 1; i <= chaptersCount; i++) {
        chapterSelect.add(new Option(i, i));
    }
}

function saveSelectionToLocalStorage() {
    const bookName = document.querySelector('select[name="book"]').value;
    const chapterName = document.querySelector('select[name="chapter"]').value;
    localStorage.setItem("bookName", bookName);
    localStorage.setItem("chapterName", chapterName);
}

function readSelectionsFromLocalStorage() {
    const storedBookName = localStorage.getItem("bookName");
    const storedChapterName = localStorage.getItem("chapterName");

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

    const container = document.getElementById("text");
    container.innerHTML = '';

    const title = document.createElement('h1');
    title.textContent = `${humanReadableFormat[bookName]} kap. ${chapterName}`;
    title.classList.add('text-2xl', 'mb-4', 'font-bold');

    const verseText = document.createElement('div');
    Object.entries(chapter).forEach(([verseNumber, verse]) => {
        const verseElement = document.createElement('div');
        verseElement.innerHTML = `<sup class="text-sm mr-2">${verseNumber}</sup>${verse}`;
        verseElement.classList.add('mb-2');
        verseText.appendChild(verseElement);
    });

    container.appendChild(title);
    container.appendChild(verseText);
}

function generateBookOptions() {
    const bookSelect = document.querySelector('select[name="book"]');
    for (let book in bible) {
        bookSelect.add(new Option(abbreviations[book], book));
    }
    createChapterSelectOptions();
}

document.getElementById("button").addEventListener("click", function () {
    saveSelectionToLocalStorage();
    printBibleChapter();
});

document.querySelector('select[name="book"]').addEventListener('change', function () {
    createChapterSelectOptions();
});

generateBookOptions();
readSelectionsFromLocalStorage();
printBibleChapter();
