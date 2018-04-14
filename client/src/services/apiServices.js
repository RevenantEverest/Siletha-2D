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
      gold: data.gold,
      health: data.health
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

services.levelUp = (data) => {
  return axios({
    method: 'PUT',
    url: '/characters/level',
    data: {
      character_id: data
    }
  })
};

services.getCharacterInfo = (data) => {
  return axios.get(`characters/${data}`);
};

services.playerTakeDamage = (data) => {
  return axios({
    method: 'PUT',
    url: 'characters/takeDamage',
    data: {
      character_id: data.character_id,
      damage: data.damage
    }
  })
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

services.useItem = (data) => {
  return axios({
    method: 'PUT',
    url: 'inventory/useItem',
    data: {
      health: data.health,
      character_id: data.character_id
    }
  })
};

services.getGold = (data) => {
  return axios({
    method: 'PUT',
    url: '/inventory/gold',
    data: {
      gold: data.gold,
      character_id: data.character_id
    }
  })
};

services.getItemName = (data) => {
  return axios.get(`/inventory/items/${data}`)
};

services.getItemByEntry_id = (data) => {
  return axios.get(`/inventory/entryId/${data.entry_id}`)
};

/*-------- END --------*/

/*======== Shop ========*/

services.sellItem = (data) => {
  return axios({
    method: 'PUT',
    url: `/shops/sell`,
    data: {
      character_id: data.character_id,
      gold: data.gold
    }
  })
};

services.buyItem = (data) => {
  return axios({
    method: 'POST',
    url: `/shops/buy`,
    data: {
      item_id: data.item_id,
      character_id: data.character_id
    }
  })
};

services.removeGold = (data) => {
  return axios({
    method: 'PUT',
    url: `/shops/buy`,
    data: {
      gold: data.gold,
      character_id: data.character_id
    }
  })
};

/*-------- END --------*/

export default services;
