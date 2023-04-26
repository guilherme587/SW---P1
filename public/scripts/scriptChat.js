const inputQuestion = document.getElementById("chatUser");
const result = document.getElementById("chatGPT");
const ususario = document.getElementById("user-name").innerHTML;

inputQuestion.addEventListener("keypress", (e) => {
  if (inputQuestion.value && e.key === "Enter") SendQuestion();
});

const OPENAI_API_KEY = "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";

function btnsOptions(par){
    inputQuestion.value = par;
    SendQuestion();
}

function SendQuestion() {
  let sQuestion = inputQuestion.value;

  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: sQuestion,
      max_tokens: 2048, // tamanho da resposta
      temperature: 0.5, // criatividade na resposta
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (result.value) result.value += "\n";

      if (json.error?.message) {
        result.value += `Error: ${json.error.message}`;
      } else if (json.choices?.[0].text) {
        let text = json.choices[0].text || "Sem resposta";

        result.value += "Chat GPT: " + text;
      }

      result.scrollTop = result.scrollHeight;
    })
    .catch((error) => console.error("Error:", error))
    .finally(() => {
      inputQuestion.value = "";
      inputQuestion.disabled = false;
      inputQuestion.focus();
    });

  if (result.value) result.value += "\n\n\n";

  result.value += `${ususario}: ${sQuestion}`;
  inputQuestion.value = "Carregando... aguarde.";
  inputQuestion.disabled = true;

  result.scrollTop = result.scrollHeight;
}
