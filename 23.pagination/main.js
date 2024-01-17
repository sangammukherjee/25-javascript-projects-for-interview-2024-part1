const paginationListWrapper = document.querySelector(".pagination-list");

function createDummyData() {
  for (let i = 1; i <= 100; i++) {
    const li = document.createElement("li");
    li.textContent = `Card ${i}`;
    paginationListWrapper.appendChild(li);
  }
}

createDummyData();

const extractAllListItems = document.querySelectorAll("li");
const paginationNumbers = document.querySelector(".pagination-numbers");
const previousButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");

let paginationLimit = 10;
let pageCount = Math.ceil(extractAllListItems.length / paginationLimit);
let currentPage = 1;

function createPageNumber(getCurrentIndex) {
  const pageNumber = document.createElement("button");
  pageNumber.classList.add("pagination-number");
  pageNumber.textContent = getCurrentIndex;
  pageNumber.setAttribute("page-index", getCurrentIndex);

  paginationNumbers.appendChild(pageNumber);
}

function createPaginationNumbers() {
  for (let i = 1; i <= pageCount; i++) {
    createPageNumber(i);
  }
}

function handleActiveCurrentPageNumber() {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("active-state");
    const getCurrentPageIndex = Number(button.getAttribute("page-index"));

    if (getCurrentPageIndex === currentPage) {
      button.classList.add("active-state");
    }
  });
}

function handleDisableButton(getBtn) {
  getBtn.classList.add("disabled");
  getBtn.setAttribute("disabled", "true");
}

function handleEnableButton(getBtn) {
  getBtn.classList.remove("disabled");
  getBtn.removeAttribute("disabled");
}

function handlePaginationButtonStatus() {
  console.log(currentPage);
  if (currentPage === 1) {
    handleDisableButton(previousButton);
  } else {
    handleEnableButton(previousButton);
  }

  if (pageCount === currentPage) {
    handleDisableButton(nextButton);
  } else {
    handleEnableButton(nextButton);
  }
}

function handleCurrentPage(getCurrentPageNumber) {
  currentPage = getCurrentPageNumber;

  handleActiveCurrentPageNumber();
  handlePaginationButtonStatus();

  const getPreviousRange = (getCurrentPageNumber - 1) * paginationLimit;
  const getCurrentrange = getCurrentPageNumber * paginationLimit;

  extractAllListItems.forEach((listItem, index) => {
    listItem.classList.add("hide-list-item");

    if (index >= getPreviousRange && index < getCurrentrange) {
      listItem.classList.remove("hide-list-item");
    }
  });
}

createPaginationNumbers();
handleCurrentPage(1);

previousButton.addEventListener("click", () => {
  handleCurrentPage(currentPage - 1);
});

nextButton.addEventListener("click", () => {
  handleCurrentPage(currentPage + 1);
});

document.querySelectorAll(".pagination-number").forEach((button) => {
  const getCurrentPageIndex = Number(button.getAttribute("page-index"));

  if (getCurrentPageIndex) {
    button.addEventListener("click", () => {
      handleCurrentPage(getCurrentPageIndex);
    });
  }
});
