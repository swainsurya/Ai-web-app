// Scripting overhere

let body = document.querySelector("body");
let header = document.querySelector(".header");
let loaderGIF = document.querySelector(".loadergif")
let imgContainer = document.querySelector(".container");

let inputFile = document.querySelector("#inputFile");
let imgBox = document.querySelector(".innerImg");
let imageUrl = ""


setTimeout(() => {
    randomBackgrounds();
}, 2);

// responsive sidebar

let sideIcon = document.querySelector(".sidebar-img");
let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector(".closeSidebar");

// opening and closing sidebar

closeBtn.addEventListener("click", () => {
    sidebar.classList.add("hidden");
});
sideIcon.addEventListener("click", () => {
    sidebar.classList.remove("hidden")
});


// Random Background Changer 
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

//  Upload photo on imgbox

inputFile.addEventListener("change", () => {
    imageUrl = URL.createObjectURL(inputFile.files[0]);
    imgBox.style.backgroundImage = `url(${imageUrl})`
    imgBox.innerHTML = ''
    imgBox.style.border = 0
})

// generating prompt from image 

let generateBtn = document.querySelector(".button_generate");

let textContainer = document.querySelector(".textGenerated");

// ###########################################
let apiKey = "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"
async function query(filename) {
    const data = inputFile.files[0];
    const response = await fetch(
        "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base",
        {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: data,
        }
    );
    const result = await response.json();
    return result;
}

// #########################################
generateBtn.addEventListener("click", () => {
    if (inputFile.files.length > 0) {
        textContainer.textContent = "Generating..."
    }
    else {
        textContainer.textContent = "Please select an image"
    }
    let ai_text = ""
    query(inputFile.files[0].name).then(async (response) => {
        ai_text = await response[0].generated_text;

        if (ai_text == "") {
            textContainer.textContent = "Please Upload HD photos";
        }
        else {
            textContainer.textContent = ai_text
        }

        inputFile.files[0] = {}
    })
    .catch(err => {
        textContainer.textContent = "Please try again"
    })
})
