export const fetchAccountInfo = async (address) => {
    return fetch(`http://localhost:4000/api/accounts/${address}`)
      .then((res) => res.json())
      .then((res) => res.data);
};

export async function checkIfUserIsConnected() {
    if (localStorage.getItem("address")){
        return true;
    }else{
        return false;
    }
}