package main

import (
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
)

func handleForm(w http.ResponseWriter, r *http.Request) {

	// Store at most 10MB in Memory
	r.ParseMultipartForm(10 << 20)

	file, header, err := r.FormFile("zip")
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error while receiving the file")
		return
	}

	log.Printf("Uploaded File: %+v\n", header.Filename)
	log.Printf("File Size: %+v\n", header.Size)
	log.Printf("MIME Header: %+v\n", header.Header)

	// Close the file when function returns
	defer file.Close()

	// Create a file to write the upload to
	upload, err := ioutil.TempFile("uploads", "program-*.txt")
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error creating file")
		return
	}
	defer upload.Close()

	// Read the upload to a byte array
	fileBytes, err := ioutil.ReadAll(file)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error while reading the file")
		return
	}

	// Write the bytes to the created file
	_, writeErr := upload.Write(fileBytes)
	if err != nil && err != io.EOF {
		log.Println(writeErr)
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error while writing the file")
		return
	}

	fmt.Fprintf(w, "Working route")
}

func main() {
	http.HandleFunc("/upload", handleForm)
	fmt.Println("Server running on Port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
