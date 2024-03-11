export const fetchOneCharacter = async (id) => {
  // console.log(id);
  try {
    const res = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=c50392cf75ca31e5fc906b00d1249c34&hash=166021915c8ae5bcb3480926f57f2076`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error, "error");
    return error;
  }
};
