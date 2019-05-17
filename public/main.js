setButtonEnabled(false)

function setButtonEnabled(enabled) {
    document.getElementById("submit").disabled = !enabled
}

function setFileInfoProgressVisibility(visible) {
    const prog = document.getElementsByTagName("progress")[0]
    const nameP = document.getElementById("filename")
    if (visible) {
        prog.classList.remove("invisible")
        nameP.classList.remove("invisible")
    } else {
        prog.classList.add("invisible")
        nameP.classList.add("invisible")
    }
}

function setError(show, message) {
    const err = document.getElementById("error")
    if (show) {
        err.classList.remove("invisible")
    } else {
        err.classList.add("invisible")
        err.innerText = ""
    }
}

function setProgress(percent) {
    document.getElementsByTagName("progress")[0].value = percent
}

function fileChange() {
    const file = document.getElementById("zip").files[0];

    if (file.type !== "application/zip") {
        setError(true, "Please choose a .zip file.")
    } else {
        setError(false, "")
        document.getElementById("filename").innerText = file.name
        document.getElementsByTagName("label")[0].innerText = "Choose another file"
        setButtonEnabled(true)
        setProgress(0)
        setFileInfoProgressVisibility(true)
    }

}

function submitForm() {
    const file = document.getElementById("zip").files[0]

    if (!file) {
        return
    }

    // Build the form
    const form = new FormData()
    form.append("zip", file)

    // Build the request
    const request = new XMLHttpRequest()
    request.onerror = err => console.log(err)
    request.onprogress = prog => setProgress(Math.round(prog.total / prog.loaded * 100))
    request.onabort = () => console.log("Submit cancelled")
    request.onload = () => console.log(request.responseText)

    // Send the request
    request.open("POST", "/upload")
    request.send(form)

}