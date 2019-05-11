setButtonEnabled(false)

function setButtonEnabled(enabled) {
    document.getElementById("submit").disabled = !enabled
}

function setProgressBarVisible(visible) {
    const prog = document.getElementsByTagName("progress")[0]
    visible ? prog.classList.add("invisible") : prog.classList.remove("invisible")
}

function setProgress(percent) {
    document.getElementsByTagName("progress").value = percent
}

function fileChange() {    
    const file = document.getElementById("zip").files[0];
    console.log(file.type)

    setButtonEnabled(true)
    setProgress(0)
    setProgressBarVisible(false)
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
    request.upload.onprogress = prog => setProgress(Math.round(100/prog.total * prog.loaded))
    request.onabort = () => console.log("Submit cancelled")

    // Display the progress bar
    setProgressBarVisible(true)

    // Send the request
    request.open("POST", "http://localhost:8080/upload")
    request.send(form)

}