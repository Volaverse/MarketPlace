function LogOut({ history }) {
    localStorage.removeItem("address");

    history.push('/');
    window.location.reload();
}

export default LogOut;