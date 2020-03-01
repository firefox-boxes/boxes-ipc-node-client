package main

import "C"

import (
	"net/rpc"
)

//export Query
func Query(req string) *C.char {
	client, err := rpc.Dial("tcp", "127.0.0.1:6688")
	if err != nil {
		panic(err)
	}
	defer client.Close()
	var res string
	client.Call("IPC.Handle", &req, &res)
	var cres *C.char = C.CString(res)
	return cres
}

func main() {}