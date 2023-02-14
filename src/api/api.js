//This file will be for all functions making calls to the API i.e fetch, post etc.

// export async function getProfile() {
//     try {
//       const res = await fetch(`${APIURL}/users/me`, {
//         headers: getHeaders(),
//         method: "GET",
//       });
//       const data = await res.json();
//       console.log(data.data.posts);
//       return data.data;
//     } catch (error) {
//       throw error;
//     }
//   }