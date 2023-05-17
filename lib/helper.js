
//const base_URL = process.env.BASE_URL;


const base_URL = "http://localhost:3000";

//Return All User
export const getUsers = async () => {
  const response = await fetch(`${base_URL}/api/users`);
  const Json = await response.json();

  return Json;
};

//Return Singel User
export const getUser = async (userId) => {
  const response = await fetch(`${base_URL}/api/users/${userId}`);
  const Json = await response.json();

  return Json ? Json : {};
};

//Create a new User
export const addUser = async (formData) => {
    try{
        const Options = {
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(formData)
        }
        const response = await fetch(`${base_URL}/api/users`, Options);
        const Json = await response.json();
        return Json;
    }catch (error){
        return error;
    }
};


// //Update User
// export const PutUser = async (userId, formData) => {
//     try{
//         const Options = {
//             method: 'PUT',
//             headers: {'Content-Type': "application/json"},
//             body: JSON.stringify(formData)
//         }
//         const response = await fetch(`${BASE_URL}/api/users/${userId}`,Options);
//         const Json = await response.json();
//   return Json;
//     }catch (error){
//         return error;
//     }
// };


//Update User
export const PutUser = async (userId, formData) => {
   
        const Options = {
            method: 'PUT',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(formData)
        }
        const response = await fetch(`${base_URL}/api/users/${userId}`,Options);
        const Json = await response.json();
  return Json;
   
};


//Delete User
export const deleteUser = async (userId) => {
    try{
        const Options = {
            method: 'DELETE',
            headers: {'Content-Type': "application/json"},
        }
        const response = await fetch(`${base_URL}/api/users/${userId}`,Options);
        const Json = await response.json();
  return Json;
    }catch (error){
        return error;
    }
};
