import { firebaseDb, firebaseAuth } from '../firebase'
import { pascalize } from 'humps'
import firebase from 'firebase'
import { addErrorMessage } from '../containers/Error'

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
  return categoryRef.get().then((ss) => ss.docs.map((e) => e.data()))
}
/**
 * create: 存在する場合上書きしない
 */
export const createCategory = async (category: any) => {
  const categoryRef = firebaseDb.collection(TABLE_CATEGORIES)
  const exists = await categoryRef
    .doc(category.label)
    .get()
    .then((doc: any) => doc.exists)
  if (exists) {
    return
  }
  categoryRef
    .doc(category.label)
    .set(category)
    .catch((e) => addErrorMessage('データベースエラー'))
}
// #endregion

// #region note
const TABLE_NOTES = 'notes'
export const getNotes = async () => {
  const noteRef = firebaseDb.collection(TABLE_NOTES)
  return noteRef.get().then((ss) => ss.docs.map((e) => e.data()))
}
export const getNotesByCategoryId = async (categoryId: number) => {
  const noteRef = firebaseDb.collection(TABLE_NOTES).where('categoryId', '==', Number(categoryId))
  return noteRef.get().then((ss) => ss.docs.map((e) => e.data()))
}
export const getNote = async (noteId: number) => {
  const noteRef = firebaseDb.collection(TABLE_NOTES).where('id', '==', Number(noteId))
  return noteRef.get().then((ss) => ss.docs.map((e) => e.data()))
}
/**
 * create: 存在する場合上書きしない
 */
export const createNote = async (note: any, argCategoryName?: string) => {
  const noteRef = firebaseDb.collection(TABLE_NOTES)
  const docName = await getNoteDocName(note, argCategoryName)

  const exists = await noteRef
    .doc(docName)
    .get()
    .then((doc: any) => doc.exists)
  if (exists) {
    return
  }
  noteRef &&
    noteRef
      .doc(docName)
      .set(note)
      .catch((e) => addErrorMessage('データベースエラー'))
}
export const setNote = async (note: any, argCategoryName?: string) => {
  const noteRef = firebaseDb.collection(TABLE_NOTES)
  const docName = await getNoteDocName(note, argCategoryName)
  noteRef &&
    noteRef
      .doc(docName)
      .set(note)
      .catch((e) => addErrorMessage('データベースエラー'))
}
export const updateNoteVocabulary = async (
  note: any,
  vocabularyRow: any,
  rowIndex: number,
  argCategoryName?: string,
) => {
  const noteRef = firebaseDb.collection(TABLE_NOTES)
  const docName = await getNoteDocName(note, argCategoryName)
  const noteDoc = noteRef && noteRef.doc(docName)
  //const fieldName = `vocabulary.${rowIndex}`

  const newNote = {} as typeof note
  Object.assign(newNote, note)
  newNote.vocabulary[rowIndex] = vocabularyRow
  noteDoc.update({
    vocabulary: newNote.vocabulary,
  })
}
export const deleteNote = async (note: any, argCategoryName?: string) => {
  const noteRef = firebaseDb.collection(TABLE_NOTES)
  const docName = await getNoteDocName(note, argCategoryName)
  noteRef &&
    noteRef
      .doc(docName)
      .delete()
      .catch((e) => addErrorMessage('データベースエラー'))
}
const getNoteDocName = async (note: any, argCategoryName?: string) => {
  let categoryName = argCategoryName
  if (!argCategoryName) {
    const categoryRef = firebaseDb.collection(TABLE_CATEGORIES)
    const catData = await categoryRef
      .where('id', '==', note.categoryId)
      .get()
      .then((ss) => ss.docs.map((e) => e.data()))
    categoryName = catData.find((e) => e)?.label.toString()
  }
  const authorName = note?.author || ''
  const docName = `${categoryName}-${pascalize(note.title)}${authorName ? '@' : ''}${authorName}`
  return docName
}
// #endregion

// #region auth
// https://firebase.google.com/docs/auth/web/start
// https://firebase.google.com/docs/auth/web/manage-users?hl=ja
export const register = async (userName: string, email: string, password: string) => {
  if (await existsUserName(userName)) {
    return
  }
  if (firebaseAuth.currentUser) {
    await logout()
  }
  return await firebaseAuth
    .createUserWithEmailAndPassword(email, password)
    .then(async () => {
      console.log('registered')
      const user = await login(email, password)
      if (user !== null) {
        await updateUserInfo(user, userName)
      }
      return user
    })
    .catch((error) => {
      addErrorMessage('データベースエラー')
      console.log(error.code, error.message)
      return null
    })
}
export const login = async (email: string, password: string) => {
  if (firebaseAuth.currentUser) {
    await logout()
  }
  await firebaseAuth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('logined', firebaseAuth.currentUser)
    })
    .catch((error) => {
      if (['auth/invalid-email', 'auth/wrong-password'].some((err) => err === error.code)) {
        console.log('login failed')
        addErrorMessage('メールアドレス、またはパスワードが間違っています')
      } else {
        addErrorMessage('データベースエラー')
        console.log(error.code, error.message)
      }
    })
  return firebaseAuth.currentUser
}
export const logout = async () => {
  firebaseAuth
    .signOut()
    .then(() => {
      console.log('log out')
    })
    .catch((error) => {
      addErrorMessage('データベースエラー')
      console.log(error.code, error.message)
    })
}
export const updateUserInfo = async (user: firebase.User, userName: string) => {
  // TODO: トランザクションの考慮(チェック処理もここにいれるところから)
  // むしろ、admin権限作って、一元管理にすること
  // firestore
  const userInfoRef = firebaseDb.collection('userInfo')
  userInfoRef
    .doc(user.uid)
    .set({ displayName: userName })
    .then(() => {
      // authentication
      user
        .updateProfile({
          displayName: userName,
        })
        .catch((error) => {
          addErrorMessage('データベースエラー')
          console.log(error.code, error.message)
        })
    })
    .catch((e) => console.log(e))
  return user
}
export const existsUserName = async (userName: string) => {
  const userInfoRef = firebaseDb.collection('userInfo')
  const result = await userInfoRef
    .where('displayName', '==', userName)
    .get()
    .then((ss) => ss.docs.map((e) => e.data()))
  if (result.length !== 0) {
    return true
  }
  return false
}
// #endregion
