
const BASE_URL = "https://api.frankfurter.app/latest";

  const dropdowns= document.querySelectorAll(".dropdown select");
  let btn = document.querySelector("form button");
  let fromCurr = document.querySelector(".from select");
  let toCurr = document.querySelector(".to select");
  const msg = document.querySelector(".msg");
  

for (let select of dropdowns){
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText= currCode;
    newOption.value= currCode;
    if (select.name==="from" && currCode==="USD") {
      newOption.selected=true;
    } else if (select.name==="to" && currCode==="INR") {
      newOption.selected=true;
    }
    select.append(newOption);

  };
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
};

const updateFlag= (element) =>{
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src = newSrc;
};

const updateExchangeRate =  async() => {
  let amount = document.querySelector("form input");
  let amtVal= amount.value;
  if (amtVal==="" || amtVal < 1) {
    amtVal= 1;
    amount.value ="1";
  };
  const URL = `${BASE_URL}?amount=${amtVal}&from=${fromCurr.value}&to=${toCurr.value}`;
  let response =  await fetch(URL)
  let data = await response.json();
  let rate = data.rates[toCurr.value];
  let finalAmount =  amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

};
btn.addEventListener("click",(evt)=>{
  evt.preventDefault();
  updateExchangeRate();
});
window.addEventListener("load", () => {
  updateExchangeRate();
});

const toggle = document.getElementById("darkToggle");

// Load saved theme from localStorage
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark");
  toggle.checked = true;
}

toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");

  // Save preference
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
});



