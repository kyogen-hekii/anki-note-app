export const getUser = (userId: number) => {
  switch (userId) {
    default:
      const user = {
        id: userId,
        name: `loginUser${userId}`,
      }
      return user
  }
}

export const REALgetUser = (userId: number) => {
  return {
    query: `query (userId: ID!) {
      user(id: userId) {
        id
        name
      }
    }
    `,
    variables: {
      userId,
    },
  }
}
