import axios from 'axios';

export function getCharacters(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/characters");
        return dispatch({
            type: 'GET_CHARACTERS',
            payload: json.data
        })
    }
}

export function orderByName(payload) {          
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
  }
  export function filterCharactersByStatus(payload) {           
    console.log(payload)
    return {
        type: 'FILTER_BY_STATUS',
        payload
      }
  }
  export function filterCreated(payload) {            
    console.log(payload)
    return {
        type: 'FILTER_CREATED',
        payload
      }
  }

  export function getDetails(id) {
    return async function(dispatch) {
        try {
            const res = await axios.get(`http://localhost:3001/characters/${id}`);
            return dispatch({
                type: 'GET_DETAIL',
                payload: res.data
            });
        } catch (err) {
            console.log(err)
        };
    };
};

export function getOccupations() {
    return async function(dispatch) {
        const res = await axios.get('http://localhost:3001/occupations')
        return dispatch({
            type: 'GET_OCCUPATION',
            payload: res.data
        });
    };
};

export function postCharacter(payload) {
    return async function(dispatch) {
        const res = await axios.post('http://localhost:3001/character', payload)
        return {
            type: 'POST',
            res //?????
        }
    };
};
