const articlesFC = require('./includes/articlesFunctions')
const {writeFile} = require('fs')
const util = require('util')
const Wfile = util.promisify(writeFile)
const cwd = process.cwd()

async function indexArticlesByAuthor (author, language) {
  const index = await articlesFC.createArticlesIndexFromAuthor(author, language)
  await Wfile(`${cwd}/repository/articles/authors/${language}/${author}.json`, JSON.stringify(index), {encoding:'utf-8'})
}

async function indexAllArticlesByAuthors (language='pt-br') {
  const authors = await articlesFC.getAuthors()
  authors.map(author=>{
    indexArticlesByAuthor(author, language)
  })
}

async function indexAllArticlesAuthors ( language='pt-br') {
  const authors = await articlesFC.getAuthors()
  await Wfile(`${cwd}/repository/articles/authors/allAuthors-${language}.json`, JSON.stringify(authors), {encoding:'utf-8'})
}

// indexAllArticlesByAuthors()
indexAllArticlesAuthors()
