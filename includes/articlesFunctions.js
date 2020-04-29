const fetch = require('node-fetch')

const API_URL = 'https://api.github.com/repos/teonomia/articles/contents/authors'
const RAW_URL = 'https://raw.githubusercontent.com/teonomia/articles/master/authors'

async function getAuthors () {
  const response = await fetch(API_URL)
  const rawJsonResponse = await response.json()
  const authors = rawJsonResponse.map(i => i.name)
  return authors
}

async function getArticlesFromAuthor (author, language = 'pt-br') {
  // https://api.github.com/repos/teonomia/articles/contents/authors/r.j.rushdoony/POs/pt-br
  const articlesResponse = await fetch(`${API_URL}/${author}/POs/${language}`)
  const articles = await articlesResponse.json()
  const articlesName = articles.map(article => article.name)
  return articlesName
}

async function createArticlesIndexFromAuthor (author, language = 'pt-br') {
  const articles = await getArticlesFromAuthor(author,language)
  const articlesIndex = articles.map(articleName => {
    // https://raw.githubusercontent.com/teonomia/articles/master/authors/r.j.rushdoony/POs/pt-br/<ARTICLE>
    // const articleFile = await fetch(`${RAW_URL}/${author}/POs/${language}/${articleName}`)
    return {
      name: articleName.split('.')[0],
      slug: articleName,
    }
  })
  return articlesIndex
}

async function createIndexOfAuthor (author, language = 'pt-br') {
  // const response = await fetch(`${API_URL}/${author}/POs/${language}`)
  // const rawJsonResponse = await response.json()
  // const authors = rawJsonResponse.map(async i => {
  //   const fileRequest = await fetch(`${RAW_URL}/${author}/POs/${language}/${i.name}`)
  // })
  return authors
}

module.exports = {
  getAuthors,
  getArticlesFromAuthor,
  createArticlesIndexFromAuthor,
  createIndexOfAuthor
}