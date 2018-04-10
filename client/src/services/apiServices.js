import axios from 'axios';
const services = {};


/*======== Characters ========*/
services.getAllCharacters = (data) => {
  return axios.get(`/characters`)
};

services.getCharactersByUserId = (id) => {
  return axios.get(`characters/user/${id}`)
}

services.createCharacter = (data) => {
  return axios({
    method: 'POST',
    url: `/characters`,
    data: {
      user_id: data.user_id,
      name: data.name,
      class_id: data.class_id,
      experience: data.experience,
      level: data.level
    }
  })
}
/*-------- END --------*/

export default services;
