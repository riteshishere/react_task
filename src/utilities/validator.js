const generalValidator = (value, pattern, ErrorMsg, setErrorMsg, msg) => {
    if (value.length > 0) {
        if (!pattern.test(value) && ErrorMsg !== msg) {
            setErrorMsg(msg)
        } else if (pattern.test(value) && ErrorMsg.length !== 0) {
            setErrorMsg("")
        }
    } else if (value === "" && ErrorMsg !== "") {
        setErrorMsg("")
    }
}

export default generalValidator