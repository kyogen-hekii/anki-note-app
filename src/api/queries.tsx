export const getUser = (userId: number) => {
  const user = {
    id: userId,
    name: `loginUser${userId}`,
  }
  return user
}
// #region REALgetUser
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
// #endregion

// #region getCategories
export const getCategories = () => {
  const categories = [
    {
      id: 1,
      value: 'react',
      label: 'React',
    },
    {
      id: 2,
      value: 'vue',
      label: 'Vue.js',
    },
  ]
  return categories
}
// #endregion

// #region getNotes
export const getNotes = () => {
  const notes = [
    {
      id: 1,
      categoryId: 1,
      title: 'basic',
      content: 'this is a basic text.',
      codepenHash: 'BaavNYr',
    },
    {
      id: 2,
      categoryId: 1,
      title: 'setup',
      content: 'how to setup react.',
      codepenHash: 'BaavNYr',
    },
    {
      id: 3,
      categoryId: 3,
      title: 'setup',
      content: 'how to setup vue.',
    },
  ]
  return notes
}
// #endregion
