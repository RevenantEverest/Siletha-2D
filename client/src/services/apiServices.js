import axios from 'axios';
const services = {};


/*======== Characters ========*/

services.getAllCharacters = (data) => {
  return axios.get(`/characters`)
};

services.getCharactersByUserId = (id) => {
  return axios.get(`characters/user/${id}`)
};

services.createCharacter = (data) => {
  return axios({
    method: 'POST',
    url: `/characters`,
    data: {
      user_id: data.user_id,
      name: data.name,
      class_id: data.class_id,
      experience: data.experience,
      level: data.level,
      gold: data.gold
    }
  })
};

services.updateCharacterExperience = (data) => {
  return axios({
    method: 'PUT',
    url: `/characters/experience`,
    data: {
      character_id: data.character_id,
      experience: data.exp
    }
  })
};

services.getCharacterInfo = (data) => {
  return axios.get(`characters/${data}`);
};

services.deleteCharacter = (data) => {
  return axios({
    method: 'DELETE',
    url: `/characters/${data}`,
    data: {
      character_id: data
    }
  })
};

/*-------- END --------*/

/*======== Inventory ========*/

services.getInventoryByCharacterId = (data) => {
  console.log('apiServices =>', data);
  return axios.get(`/inventory/${data}`)
};

services.addItem = (data) => {
  return axios({
    method: 'POST',
    url: `/inventory/${data.character_id}`,
    data: {
      character_id: data.character_id,
      item_id: data.item_id
    }
  })
};

services.removeItem = (data) => {
  return axios({
    method: 'delete',
    url: '/inventory',
    data: {
      entry_id: data.entry_id
    }
  })
};

/*-------- END --------*/

export default services;
