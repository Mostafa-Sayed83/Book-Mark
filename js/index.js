var siteNameInput = document.getElementById("site-name");
var siteUrlInput = document.getElementById("site-url");
var submitInput = document.getElementById("submit");
var close_Btn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-info");
var show_box = document.getElementById("showbox");

var taskList = [];

    if (localStorage.getItem("bookMark") !== null) {
    taskList = JSON.parse(localStorage.getItem("bookMark"));
    display();
    }

    submitInput.addEventListener("click", function addTask() {
    var data = JSON.parse(localStorage.getItem("bookMark"));
    for (let i = 0; i < data?.length; i++) {
    if (siteNameInput.value.toLowerCase() == data[i].siteName.toLowerCase())
        return window.alert("The name is repeated");
    }
    if (validationName() == true && validationUrl() == true) {
    var taskContainer = {
        siteName: siteNameInput.value,
        siteUrl: siteUrlInput.value,
    };
    taskList.push(taskContainer);

    localStorage.setItem("bookMark", JSON.stringify(taskList));
    display();
    clear();
    } else {
    show_box.classList.remove("d-none");
    }
    });

// display Data
function display() {
  var cartona = "";
  for (var i = 0; i < taskList.length; i++) {
    cartona += `
                            <tr>
                                <td>${i + 1}</td>
                                <td>${taskList[i].siteName}</td>
                                <td>
                                <a href=${taskList[i].siteUrl} target="_blank">
                                    <button class="btn btn-visit btn-success " data-index="0">
                                    <i class="fa-solid fa-eye pe-2" onclick="visit()" >
                                    
                                    </i>Visit
                                    </button>
                                    </a>
                                </td>
                                <td>
                                    <button onclick="delte(${i})" class="btn btn-delete pe-2 btn-danger" data-index="0">
                                        <i class="fa-solid fa-trash-can "> </i>
                                        Delete
                                    </button>
                                </td>
                            </tr>`;
  }

  document.getElementById("tableContent").innerHTML = cartona;
}

// clear Data
function clear() {
  siteNameInput.value = null;
  siteUrlInput.value = null;

  siteNameInput.classList.remove("is-valid");
  siteUrlInput.classList.remove("is-valid");


}

// Delete Dtata
function delte(index) {
  taskList.splice(index, 1);
  localStorage.setItem("bookMark", JSON.stringify(taskList));
  display();
}

// validationName
function validationName() {
  var regex = /^[a-zA-Z][a-zA-Z0-9 ]{2,19}$/;
  var text = siteNameInput.value;
  if (regex.test(text)) {
    siteNameInput.classList.remove("is-invalid");
    siteNameInput.classList.add("is-valid");
    nameAlert.classList.add("d-none")
    return true;
  } else {
    siteNameInput.classList.remove("is-valid");
    siteNameInput.classList.add("is-invalid");
    nameAlert.classList.remove("d-none")
    return false;

  }
}

// validationUrl
function validationUrl() {
  var regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
  var text = siteUrlInput.value;
  if (regex.test(text)) {
    siteUrlInput.classList.remove("is-invalid");
    siteUrlInput.classList.add("is-valid");
    urlAlert.classList.add("d-none")
    return true;
  } else {
    siteUrlInput.classList.remove("is-valid");
    siteUrlInput.classList.add("is-invalid");
    urlAlert.classList.remove("d-none")
    return false;
  }
}
function closeModal() {
  boxModal.classList.add("d-none");
}

function visit() {}