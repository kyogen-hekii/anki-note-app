import { firebaseDb } from '../firebase'

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

const TABLE_CATEGORIES = 'categories'

export const getCategories = async () => {
  const categoryRef = firebaseDb.collection(TABLE_CATEGORIES)
  return categoryRef.get().then(ss => ss.docs.map(e => e.data()))
}
export const setCategory = async (category: any) => {
  const categoryRef = firebaseDb.collection(TABLE_CATEGORIES)
  categoryRef.doc(category.label).set(category)
}

// #region getNotes
export const getNotes = () => {
  const notes = [
    {
      id: 1,
      categoryId: 1,
      title: 'basic',
      content: 'this is a basic text./nthis...',
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
      categoryId: 2,
      title: 'setup',
      content: 'how to setup vue.',
    },
  ]
  return notes
}
// #endregion
