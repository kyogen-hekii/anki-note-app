import firebase from 'firebase'
/**
 * DB保存時用のparse
 * key情報はleftに持っておくようにしている
 */
export const parseVocabulary = (note: any, vocabulary: any[]) => {
  const arr = vocabulary
    .filter((e, i) => i > 0)
    .map((e: any[]) =>
      // memo:[ [{value: leftvalue},{value: rightvalue}],...]このような[Array(1)]ペアの状態で表示している(他propsは略)
      e.reduce((left: any, right: any) => {
        return {
          left: left.value,
          right: right.value,
          dueDate: left?.dueDate || firebase.firestore.Timestamp.now().toDate(),
          progress: left?.progress || 0,
          categoryId: left.categoryId || note.categoryId, //大丈夫と思うが一応
          noteId: left.noteId || note.id, //大丈夫と思うが一応
          index: left.index,
        }
      }),
    )
  return arr
}
/**
 * DBから取得した、storeのデータを表示用にserialize
 * key情報はleftに持っておくようにしている
 */
export const serializeVocabulary = (vocabulary: any[], isEditable: boolean) => {
  if (!vocabulary) {
    return []
  }
  const vocabularyHeader = [{ left: '表', right: '裏' }]
  let vocabularyRows = vocabulary as any[]
  vocabularyRows = vocabularyHeader.concat(vocabularyRows)

  return vocabularyRows.map((e: any, i: number) => {
    return [
      {
        value: e.left,
        width: 200,
        readOnly: i === 0 || !isEditable, //0はheader
        className: 'left',
        dueDate: e?.dueDate,
        progress: e?.progress,
        categoryId: e?.categoriId,
        noteId: e?.noteId,
        index: i - 1, //headerのせいで一個ずれてる
      },
      { value: e.right, width: 200, readOnly: i === 0 || !isEditable, className: 'right' },
    ]
  })
}
