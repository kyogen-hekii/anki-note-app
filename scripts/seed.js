// https://qrunch.net/@217tech/entries/NH4PHViZEZV9Hw4C
// https://firebase.google.com/docs/admin/setup?hl=ja
const cac = require('cac')
const cli = cac()

const admin = require('firebase-admin')
const seed = require('firestore-seed')
const serviceAccount = require('../service-account-file.json')
const config = require('../src/firebase/config.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.databaseURL,
  storageBucket: config.storageBucket,
})

const firestore = admin.firestore()

firestore.settings({
  timestampsInSnapshots: true
})

//const imageOptions = seed.imageOptions("assets/books/{id}", "public/books/{id}")

const exec = require('child_process').exec
cli
  .command('sample', '説明') // コマンド
  .option('--opt', '説明') // 引数オプション
  .action((options) => {
    // 実行したいコマンド（e.g. pwdコマンドを実行する）
    exec('pwd', (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      }
      console.log(stdout);
    })
  })

cli.command('notes', 'notesを作成します')
  .action(() => {
    const notes = seed.collection('notes', [
      seed.doc('React-Basic', {
        id: 1,
        categoryId: 1,
        title: 'basic',
        content: 'this is a basic text./nthis...',
        codepenUrl: 'https://codepen.io/kyogen0/details/BaavNYr',
      }),
      seed.doc('React-Setup', {
        id: 2,
        categoryId: 1,
        title: 'setup',
        content: 'how to setup react.',
        codepenUrl: 'https://codepen.io/kyogen0/details/QWbVKza',
      }),
      seed.doc('Vue-Setup', {
        id: 3,
        categoryId: 2,
        title: 'setup',
        content: 'how to setup vue.',
      }),
    ])
    notes.importDocuments(admin).then(() => {
      console.log('finished')
    }).catch(e => {
      console.error(e)
    })
  })

cli.help()

cli.parse()
