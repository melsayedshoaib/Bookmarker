// Declare Variables

let siteName = document.querySelector("#sitename");
let siteUrl = document.querySelector("#siteurl");
let siteNameError = document.querySelector("#sitenameerror");
let siteUrlError = document.querySelector("#siteurlerror");
let table = document.querySelector("#table");
let submitBtn = document.querySelector("#submitBtn");
let bookmarkList;

// Check If There Are Bookmarks In The Local Storage

if (localStorage.getItem("bookmark") == null) {
  bookmarkList = [];
} else {
  bookmarkList = JSON.parse(localStorage.getItem("bookmark"));
  displayBookmark(bookmarkList);
}

// Check If All Inpits Are Empty Or Not

function isEmpty() {
  if (siteName.value == "" || siteUrl == "") {
    return true;
  } else {
    return false;
  }
}

// Check If The Name Starts With Capital Letter

function validateSiteName() {
  let regex = /^[A-Z]/;
  return regex.test(siteName.value);
}

// Check For Valid URLs

function validateSiteUrl() {
  let regex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
  return regex.test(siteUrl.value);
}

// Display Bookmarks Function

function displayBookmark(bookmark) {
  let container = ``;
  for (let i = 0; i < bookmarkList.length; i++) {
    container += `
        <tr>
            <td>${bookmark[i].name}</td>
            <td><button onclick="visitBookmark(${i})" type="button" class="btn btn-primary">visit</button></td>
            <td><button onclick="deleteBookmark(${i})" type="button" class="btn btn-danger">Delete</button></td>
        </tr>`;
  }
  table.innerHTML = container;
  table.parentNode.classList.replace("d-none", "d-block");
}

// Empty Input Fields After Creatign The Row

function emptyInputs() {
  siteName.value = "";
  siteUrl.value = "";
}

// Click Event On Submit

if (submitBtn) {
  submitBtn.addEventListener("click", function (e) {
    if (isEmpty() == true) {
      e.preventDefault();
      siteNameError.innerHTML = "Name is required";
      siteNameError.classList.add("alert-danger");
      siteUrlError.innerHTML = "Url Field is required";
      siteUrlError.classList.add("alert-danger");
    } else if (!validateSiteName()) {
      e.preventDefault();
      siteNameError.innerHTML = "Name has to start with a capital letter";
      siteNameError.classList.add("alert-danger");
    } else if (!validateSiteUrl()) {
      e.preventDefault();
      siteUrlError.innerHTML = "Enter a valid URL";
      siteUrlError.classList.add("alert-danger");
    } else {
      e.preventDefault();
      let bookmark = {
        name: siteName.value,
        url: siteUrl.value,
      };
      bookmarkList.push(bookmark);
      displayBookmark(bookmarkList);
      localStorage.setItem("bookmark", JSON.stringify(bookmarkList));
      emptyInputs();
    }
  });
}

// Visit A Bookmark

function visitBookmark(bm) {
  window.open(bookmarkList[bm].url, "_blank");
}

// Delete A Bookmark

function deleteBookmark(bm) {
  bookmarkList.splice(bm, 1);
  localStorage.setItem("bookmark", JSON.stringify(bookmarkList));
  displayBookmark(bookmarkList);
}
