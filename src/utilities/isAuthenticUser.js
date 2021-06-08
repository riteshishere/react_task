const isAuthenticUser = () => {
    const tokenPair = document.cookie.split(";").filter(cook => cook.startsWith("token=")).pop()
    const AuthenticationToken = tokenPair ?
        tokenPair.length > 6 ?
            tokenPair.slice(6)
            : ""
        : ""
    return AuthenticationToken.length > 0 ? AuthenticationToken : null
}

export default isAuthenticUser