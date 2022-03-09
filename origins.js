function show(shown, hidden) {
  document.getElementById(shown).style.display = "flex";
  document.getElementById(hidden).style.display = "none";
  return false;
}

let addatr;
const createElement = ({
  tag,
  classList,
  text,
  parent,
  id,
  child,
  attribute,
}) => {
  const element = document.createElement(tag);

  addatr = (attribute, value) => {
    return element.setAttribute(attribute, value);
  };
  if (id) {
    element.id = id;
  }
  if (classList.length) {
    classList.map((className) => {
      element.classList.add(className);
    });
  }

  if (text) {
    element.textContent = text;
  }

  if (parent) {
    parent.append(element);
  }
  if (child) {
    element.append(child);
  }
  if (attribute) {
    return addatr(attribute, value);
  }
  return element;
};

const section3option = document.querySelector("#section3option");
const select = createElement({
  tag: "SELECT",
  classList: ["select"],
  parent: section3option,
  id: "select",
});

let emptyArr = [];
fetch("https://bootcamp-2022.devtest.ge/api/skills")
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((data) => {
    console.log("data", data);
    data.map((eachLang) => {
      let titles = eachLang.title;
      emptyArr.push(titles);
    });
    console.log("pushed", emptyArr);

    for (let i = 0; i < emptyArr.length; i++) {
      const option = createElement({
        tag: "OPTION",
        classList: ["option"],
        parent: select,
        id: `opt${i}`,
        child: emptyArr[i],
        attribute: addatr("value", emptyArr[i - 1]),
      });
    }
  });

const section3btn = document.querySelector("#section3btn");

const section3form = document.querySelector("#section3form");

function btnFunction() {
  const ul = createElement({
    id: "ul",
    tag: "ul",
    classList: ["section3Lists"],
    parent: section3form,
  });
  const li1 = createElement({
    tag: "li",
    parent: ul,
    classList: ["li1"],
    text: select.value,
  });

  const li2 = createElement({
    tag: "li",
    parent: ul,
    classList: ["li2"],
    text: `Years of Experience:  ${
      document.querySelector("#experience").value
    }`,
  });

  let imageRemove = document.createElement("img");
  imageRemove.classList.add("minus");
  imageRemove.setAttribute("src", "/resources/Remove.svg");
  const li3 = createElement({
    tag: "li",
    parent: ul,
    child: imageRemove,
    classList: ["li3"],
  });

  return ul;
}
section3btn.addEventListener("click", btnFunction);

const submitbutton = document.querySelector("#submitbutton");
submitbutton.addEventListener("click", () => {
  const fistNameValue = document.querySelector("#first_name").value;
  const lastnameValue = document.querySelector("#last_name").value;
  const emailValue = document.querySelector("#email").value;
  const phoneValue = document.querySelector("#phone").value;
  const skillsValue = select.value;
  const experienceValue = document.querySelector("#experience").value;

  const radiosWorkValue = document.querySelectorAll("#work_preference");


let checkedRadiosWorkValue = null
  for (let i = 0, length = radiosWorkValue.length; i < length; i++) {
    if (radiosWorkValue[i].checked) {
       checkedRadiosWorkValue = radiosWorkValue[i].value
       console.log(checkedRadiosWorkValue)
      break;
    }
  }
  let checkedRadiosCovidValue 
const radiosCovidValue =document.querySelectorAll("#had_covid");
  for (let i = 0, length = radiosCovidValue.length; i < length; i++) {
    if (radiosCovidValue[i].checked) {
      checkedRadiosCovidValue = JSON.parse(radiosCovidValue[i].value) 
      break;
    }
  }
const dateCovidValue = document.querySelector("#had_covid_at").value
let checkedRadiosVacValue
const radiosVacValue =document.querySelectorAll("#vaccinated");
  for (let i = 0, length = radiosVacValue.length; i < length; i++) {
    if (radiosVacValue[i].checked) {
      checkedRadiosVacValue=JSON.parse(radiosVacValue[i].value)
      break;
    }
  }
let dateVaccValue = document.querySelector("#vaccinated_at").value
let checkedOrganizeDevValue 
const organizeDevValue =document.querySelectorAll("#will_organize_devtalk");
  for (let i = 0, length = organizeDevValue.length; i < length; i++) {
    if (organizeDevValue[i].checked) {
      checkedOrganizeDevValue=JSON.parse(organizeDevValue[i].value)
      break;
    }
  }
const DevTopicValue = document.querySelector("#devtalk_topic").value
const specialValue = document.querySelector("#something_special").value

 let obj ={
  token: "2f4a1eeb-f0d6-4f5a-8c3a-ffeb487180b1",
  first_name:  fistNameValue,
  last_name: lastnameValue,
  email: emailValue,
  phone:  phoneValue,
  skills: [skillsValue,experienceValue],
  work_preference: checkedRadiosWorkValue,
  had_covid:  checkedRadiosCovidValue,
  had_covid_at: dateCovidValue,
  vaccinated: checkedRadiosVacValue,
  vaccinated_at: dateVaccValue,
  will_organize_devtalk: checkedOrganizeDevValue,
  devtalk_topic: DevTopicValue,
  something_special: specialValue
}

console.log(obj)

  axios.post("https://bootcamp-2022.devtest.ge/api/application", obj)
  .then(function (response) {
    alert("success")
    console.log("resp",response);
  })
  .then(()=>{
    const getApp = async () =>{
      const res = await axios.get("https://bootcamp-2022.devtest.ge/api/applications?token=2f4a1eeb-f0d6-4f5a-8c3a-ffeb487180b1")
      localStorage.setItem("applications", JSON.stringify(res.data));
      console.log(res)
    }
    console.log(getApp())
  })
  .catch(function (error) {
    console.log("err",error);
  });

});
const myApp = JSON.parse(localStorage.getItem("applications"))
console.log("myapp",myApp)

