setButtonEnabled(false)

function setButtonEnabled(enabled) {
    document.getElementById("submit").disabled = !enabled
}

function setProgressBarVisible(visible) {
    const prog = document.getElementsByTagName("progress")[0]
    visible ? prog.classList.remove("invisible") : prog.classList.add("invisible")
}

function setProgress(percent) {
    document.getElementsByTagName("progress")[0].value = percent
}

function fileChange() {    
    const file = document.getElementById("zip").files[0];
    console.log(file.type)

    setButtonEnabled(true)
    setProgress(0)
    setProgressBarVisible(true)
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
    request.onprogress = prog => setProgress(Math.round(prog.total/prog.loaded * 100))
    request.onabort = () => console.log("Submit cancelled")
    request.onload = () => console.log(request.responseText)

    // Send the request
    request.open("POST", "http://localhost:8080/upload")
    request.send(form)

}