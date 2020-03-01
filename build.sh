# Requirements
# - go

echo "Building shared object..."

unameOut="$(uname -s)"
case "${unameOut}" in
    Linux)     soext=so;;
    Darwin)    soext=dylib;;
    *)          soext="UNKNOWN:${unameOut}"
esac
echo Building conn.${soext}

go build -o conn.${soext} -buildmode=c-shared conn.go

echo "Done!"