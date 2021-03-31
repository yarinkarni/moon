export const Api = async () => {
  try {
    return fetch('https://api.themoviedb.org/3/movie/popular?api_key=1a4ce07b4f58262f688e0cff96def2ec&language=en-US&page=1',
      {
        method: 'GET',
        body: null,
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
      })
      .then((resp) => resp.json())
      .then((data) => {
        return data
      })
  } catch (error) {
    console.log("API -  -ERROR  - >", error)
    return null
  }
}