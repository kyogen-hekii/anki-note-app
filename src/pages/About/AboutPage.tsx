import React from 'react'
import Markdown from 'react-markdown'

export default function AboutPage() {
  return (
    <div>
      <div className="m20" style={{ fontSize: '2.8rem', fontWeight: 'bold' }}>
        About
      </div>
      <div
        className="m20"
        style={{
          color: '#5d627b',
          background: '#EFEFEF',
          borderTop: 'solid 5px #5d627b',
          boxShadow: '0 3px 5px rgba(0, 0, 0, 0.22)',
          minHeight: '65vh',
          width: 'calc(100vw - 40px - 4rem)',
          marginBottom: '8rem',
          marginRight: '4rem',
        }}
      >
        <Markdown
          className="m20 markdown"
          source={`### このアプリについて
このアプリは、プログラミング言語やライブラリ別に学んだことを、一問一答形式でメモしておき、単語カードのように覚えているかを確認できるアプリです。
        
ログインなしでもご利用いただけますので、お忙しい場合は、そのまま閲覧ください。

### 基本的な操作方法
1. 上部のセレクトボックスからカテゴリを選択
2. 表示されるノートを選択するとNOTEページに遷移  
  → ログインなしの場合、ノートの右部が@publicのもののみ編集可能
3. 他ユーザが作成したメモや、単語帳の閲覧、および単語テストができます。
4. 右上からログインしていただくと、個人用のノートが作成できます。
5. 個人用のノートに関しては、単語テストで記憶定着用のアルゴリズムを使用されており、効率的な暗記が行えます。

### github
https://github.com/kyogen-hekii/anki-note-app

        `}
        />
      </div>
    </div>
  )
}
