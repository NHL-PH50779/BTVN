const textInput = document.getElementById("textInput");
const wordCount = document.getElementById("wordCount");
const charCount = document.getElementById("charCount");
const maxLength = 200;
textInput.addEventListener("input", function () {
  const text = textInput.value.trim();

  let words = 0;
  if (text !== "") {
    words = text.split(/\s+/).length;
  }
  wordCount.textContent = "Số từ: " + words;
  const remaining = maxLength - text.length;
  charCount.textContent = "Số ký tự còn lại: " + remaining;
  if (remaining <= 20) {
    charCount.style.color = "red";
  } else {
    charCount.style.color = "#333";
  }
});
