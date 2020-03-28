import { firebaseDb } from '../firebase'
import { pascalize } from 'humps'

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

// #region category
const TABLE_CATEGORIES = 'categories'
export const getCategories = async () => {
  const categoryRef = firebaseDb.collection(TABLE_CATEGORIES)
  return categoryRef.get().then(ss => ss.docs.map(e => e.data()))
}
export const setCategory = async (category: any) => {
  const categoryRef = firebaseDb.collection(TABLE_CATEGORIES)
  categoryRef
    .doc(category.label)
    .set(category)
    .catch(e => console.log(e))
}
// #endregion

// #region note
const TABLE_NOTES = 'notes'
export const getNotes = async () => {
  const noteRef = firebaseDb.collection(TABLE_NOTES)
  return noteRef.get().then(ss => ss.docs.map(e => e.data()))
}
export const setNote = async (note: any, categoryName?: string) => {
  const noteRef = firebaseDb.collection(TABLE_NOTES)
  let categoryRefName
  if (!categoryName) {
    const categoryRef = firebaseDb.collection(TABLE_CATEGORIES)
    const catData = await categoryRef
      .where('id', '==', note.categoryId)
      .get()
      .then(ss => ss.docs.map(e => e.data()))
    categoryRefName = catData.find(e => e)?.label.toString()
  }
  console.log('saved: ', note)
  noteRef
    .doc(`${categoryName || categoryRefName}-${pascalize(note.title)}`)
    .set(note)
    .catch(e => console.log(e))
}
// #endregion
