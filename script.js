let colorInputs = document.querySelectorAll('input[type="color"]');
let createbtn = document.getElementById("createbtn");
let list = document.getElementById("list");

let selectedColor = colorInputs[0].value; 

colorInputs.forEach((input) => {
  input.addEventListener("input", () => {
    selectedColor = input.value; 
  });
});

createbtn.onclick = () => {
  let newnote = document.createElement("div");
  newnote.classList.add("note");
  newnote.innerHTML = `<span class="close">X</span>
            <textarea id="" placeholder="Write something....." rows="10" cols="30"></textarea>`;
  newnote.style.borderColor = selectedColor;
  list.appendChild(newnote);
  saveNotes();
};

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("close")) {
    event.target.parentNode.remove();
    saveNotes();
  }
});

let cursor = {
  x: null,
  y: null,
};

let note = {
  dom: null,
  x: null,
  y: null,
};

document.addEventListener("mousedown", (event) => {
  if (event.target.classList.contains("note")) {
    cursor = {
      x: event.clientX,
      y: event.clientY,
    };

    note = {
      dom: event.target,
      x: event.target.getBoundingClientRect().left,
      y: event.target.getBoundingClientRect().top,
    };
  }
});

document.addEventListener("mousemove", (event) => {
  if (note.dom == null) return;

  let currentCursor = {
    x: event.clientX,
    y: event.clientY,
  };

  let distance = {
    x: currentCursor.x - cursor.x,
    y: currentCursor.y - cursor.y,
  };

  note.dom.style.left = note.x + distance.x + "px";
  note.dom.style.top = note.y + distance.y + "px";
  note.dom.style.cursor = "grab";
});

document.addEventListener("mouseup", (event) => {
  if (note.dom == null) return;
  note.dom.style.cursor = "auto";
  note.dom = null;
});

function saveNotes() {
  let notes = [];
  let noteElements = document.querySelectorAll(".note");

  noteElements.forEach((note) => {
    let color = note.style.borderColor;
    let text = note.querySelector("textarea").value;
    notes.push({ color, text });
  });

  localStorage.setItem("notes", JSON.stringify(notes)); 
}


function loadNotes() {
  let savedNotes = JSON.parse(localStorage.getItem("notes"));

  if (savedNotes) {
    savedNotes.forEach((savedNote) => {
      let newnote = document.createElement("div");
      newnote.classList.add("note");
      newnote.innerHTML = `<span class="close">X</span>
                  <textarea placeholder="Write something....." rows="10" cols="30">${savedNote.text}</textarea>`;
      newnote.style.borderColor = savedNote.color; 
      list.appendChild(newnote);
    });
  }
}

document.addEventListener("input", () => {
  saveNotes(); 
});

loadNotes();
