const input = document.getElementById("input");
const btnConvert = document.getElementById("btnConvert");
const img = document.getElementById("img");
const imgText = document.getElementById("imgText");
const mainRes = document.getElementById("mainResult");
const ok = document.getElementById("ok");
let copy = document.getElementById("copy");
const close = document.getElementById("close");
const cancle = document.getElementById("cancle");


btnConvert.addEventListener("click",_=>{
    cha();
})

function cha() {
    if (input.value===""){
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
    }
    else {
        let res = input.files[0];
        const reader = new FileReader();
        copy.classList.add("disabled");

        reader.addEventListener("load", () => {
            img.src = reader.result;
            imgText.innerText = res.name;
            cancle.addEventListener("click",_=>{
                input.value = ""
                input.classList.remove("is-valid");
            })
            ok.addEventListener("click",_=>{
                close.addEventListener("click",_=>{
                    input.value = "";
                    console.log("hello")
                    input.classList.remove("is-valid");
                })
                Tesseract.recognize(
                    reader.result,
                    "eng",
                    { logger: m => console.log(m) }
                ).then(({ data: { text } }) => {
                    mainRes.innerHTML = text;
                    console.log(text);
                    copy.classList.remove("disabled");
                    copy.addEventListener("click",_=>{
                        navigator.clipboard.writeText(mainRes.innerText)
                        location.reload();
                    });
                    close.addEventListener("click",_=>{
                        input.value = ""
                        console.log("hello")
                        location.reload();
                    })
                })
            });
        }, false);

        reader.readAsDataURL(res);

        btnConvert.setAttribute("data-bs-toggle","modal")
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
    }
}
