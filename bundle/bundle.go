// +build dev

package bundle

import "net/http"

//go:generate vfsgendev -source="Ghosting/bundle".Bundle
var Bundle = http.Dir("public/")
