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
    const listenGoogleTranslate = document.getElementById('listen-google-translate');
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

    wholeText = ""
    Object.entries(chapter).forEach(([verseNumber, verse]) => {
        wholeText += verse
    });

    container.appendChild(title);
    container.appendChild(verseText);

    listenGoogleTranslate.href = `https://translate.google.com/?sl=auto&tl=sv&op=translate&text=${wholeText}`;
}

function generateBookOptions() {
    const bookSelect = document.querySelector('select[name="book"]');
    for (let book in bible) {
        bookSelect.add(new Option(abbreviations[book], book));
    }
    createChapterSelectOptions();
}

function handleDarkMode() {
    if (localStorage.getItem('mode') === 'dark') {
        disableDarkMode();
        localStorage.setItem('mode', 'light');
    } else {
        enableDarkMode();
        localStorage.setItem('mode', 'dark');
    }
}


function enableDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.textContent = 'Switch to light mode';
    darkModeToggle.classList.remove('text-black');
    document.body.classList.remove('bg-white', 'text-black');
    document.getElementById('main-card').classList.remove('bg-gray-200');
    document.getElementById('book-select').classList.remove('bg-gray-200');
    document.getElementById('chapter-select').classList.remove('bg-gray-200');

    darkModeToggle.classList.add('text-white');
    document.body.classList.add('bg-black', 'text-white');
    document.getElementById('main-card').classList.add('bg-gray-700');
    document.getElementById('book-select').classList.add('bg-gray-700');
    document.getElementById('chapter-select').classList.add('bg-gray-700');
}

function disableDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.textContent = 'Switch to dark mode';
    darkModeToggle.classList.remove('text-white');
    document.body.classList.remove('bg-black', 'text-white');
    document.getElementById('main-card').classList.remove('bg-gray-700');
    document.getElementById('book-select').classList.remove('bg-gray-700');
    document.getElementById('chapter-select').classList.remove('bg-gray-700');

    darkModeToggle.classList.add('text-black');
    document.body.classList.add('bg-white', 'text-black');
    document.getElementById('main-card').classList.add('bg-gray-200');
    document.getElementById('book-select').classList.add('bg-gray-200');
    document.getElementById('chapter-select').classList.add('bg-gray-200');
}

function setInitialMode() {
    if (!localStorage.getItem('mode')) {
        localStorage.setItem('mode', 'light');
    }

    if (localStorage.getItem('mode') === 'dark') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
}

document.querySelector('select[name="book"]').addEventListener('change', function () {
    createChapterSelectOptions();
    saveSelectionToLocalStorage();
    printBibleChapter();
});

document.querySelector('select[name="chapter"]').addEventListener('change', function () {
    saveSelectionToLocalStorage();
    printBibleChapter();
});


document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    handleDarkMode()
});

generateBookOptions();
readSelectionsFromLocalStorage();
printBibleChapter();
setInitialMode()
