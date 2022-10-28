function LogOut({ history }) {
    localStorage.removeItem("passphrase");

    history.push('/');
    window.location.reload();
}

export default LogOut;