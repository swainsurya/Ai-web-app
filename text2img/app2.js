// Scripting overhere

let body = document.querySelector("body")

setTimeout(() => {
    randomBackgrounds();
    screen.orientation.lock();
}, 0.2);

// Random backgrounds

let randomBackgrounds = () => {
    let backgroundArrays = [
        '../assets/backrounds/1.jpg',
        '../assets/backrounds/2.jpg',
        '../assets/backrounds/3.jpg',
        '../assets/backrounds/4.jpg',
        '../assets/backrounds/5.jpg',
        '../assets/backrounds/6.jpg'
    ];
    let backgroundItem = backgroundArrays[Math.floor(Math.random() * backgroundArrays.length)]

    body.style.backgroundImage = `url(${backgroundItem})`
}

// responsive sidebar

let sideIcon = document.querySelector(".sidebar-img");
let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector(".closeSidebar");

// opening and closing sidebar

closeBtn.addEventListener("click", () => {
    console.log("close clicked");
    sidebar.classList.add("hidden")
});
sideIcon.addEventListener("click", () => {
    sidebar.classList.remove("hidden")
});

// working on ai image generation

let imgViewBox = document.querySelector(".imgViewBox");
let generateImg = document.querySelector(".generateImg");
let btnBox = document.querySelector(".btnBox");
let userText = document.querySelector(".input");
let submitBtn = document.querySelector(".inputBox");
let loading = document.querySelector(".generating");
let downloadBtn = document.querySelector(".downloadBtn");

// Generating image from text

let apiKey = "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"

async function generation(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
        {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.blob();
    return result;
}

// generated image url
let imgUrl = ""
let downloadUrl = ""

// generating image from text using api
submitBtn.addEventListener("submit", async (e) => {
    e.preventDefault();
    loading.classList.remove("hide");
    downloadBtn.classList.add("hide");
    generateImg.classList.add("invisible")
    if (userText.value == "") {
        window.alert("Input field can not be empty");
    }
    else {
        imgViewBox.classList.remove("invisible");
    }
    generation({ "inputs": userText.value }).then((response) => {
        // Use image
        imgUrl = URL.createObjectURL(response);
        loading.classList.add("hide");
        generateImg.classList.remove("invisible");
        downloadBtn.classList.remove("hide");
        generateImg.src = imgUrl
        downloadUrl = imgUrl
        imgUrl = ""
        userText.value = ""
    })
    .catch(error => {
        generateImg.textContent = `url('"../assets/icons/error.jpg"')`
    })
})

// download clicked
downloadBtn.addEventListener("click",() => {

    let imageEle = document.createElement("img") ;
    imageEle.src = imgUrl ;

  let link = document.createElement("a");
  link.download = 'image.jpg';
  link.href = downloadUrl;
  link.click();
  link.remove();
})