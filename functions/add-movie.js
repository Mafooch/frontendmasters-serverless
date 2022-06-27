const { query } = require('./utils/hasura')

exports.handler = async (event) => {
  const { id, title, tagline, poster } = JSON.parse(event.body)
  console.log(event)
  
  const result = await query({
    query: `
      mutation ($id: String!, $poster: String!, $tagline: String!, $title: String!) {
        insert_movies(objects: {id: $id, poster: $poster, tagline: $tagline, title: $title}) {
          returning {
            id
            poster
            tagline
            title
          }
        }
      }
    `,
    variables: { id, title, tagline, poster }
  })

  
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  }
  
  // mutation MyMutation {
  //   insert_movies(objects: {id: "", poster: "", tagline: "", title: ""}) {
  //     returning {
  //       id
  //       poster
  //       tagline
  //       title
  //     }
  //   }
  // }
}