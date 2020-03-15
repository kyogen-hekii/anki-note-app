export default async (data: any) => {
  return data
}

// TODO: export default
export const SimpleFetch = async (query: any) => {
  try {
    const data = await fetch('http://dev.anchor.id/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query.query,
        variables: query.variables,
      }),
    })
    const json = await data.json()
    return json.data
  } catch (error) {
    // TODO
    console.error('network error')
  }
}
