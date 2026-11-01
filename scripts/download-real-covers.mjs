import https from "https"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, "../public/images/books")

const books = [
  {
    filename: "clean-code.jpg",
    title: "Clean Code",
    author: "Robert C. Martin",
    urls: [
      "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
    ],
  },
  {
    filename: "solid-modeling.jpg",
    title: "Parametric Solid Modeling",
    author: "Randy H. Shih",
    urls: [
      "https://covers.openlibrary.org/b/isbn/9781630573829-L.jpg",
      "https://covers.openlibrary.org/b/isbn/9781585038039-L.jpg",
      "https://covers.openlibrary.org/b/isbn/9781558600676-L.jpg",
      "https://covers.openlibrary.org/b/id/11197825-L.jpg",
    ],
  },
  {
    filename: "ai-engineering.jpg",
    title: "Deep Learning & AI",
    author: "Ian Goodfellow & Yoshua Bengio",
    urls: [
      "https://covers.openlibrary.org/b/isbn/9780262035613-L.jpg",
      "https://covers.openlibrary.org/b/isbn/9780136042594-L.jpg",
    ],
  },
  {
    filename: "embedded-systems.jpg",
    title: "Making Embedded Systems",
    author: "Elecia White",
    urls: [
      "https://covers.openlibrary.org/b/isbn/9781449302146-L.jpg",
      "https://covers.openlibrary.org/b/isbn/9780596007553-L.jpg",
    ],
  },
  {
    filename: "computer-org.jpg",
    title: "Computer Organization and Design",
    author: "David A. Patterson & John L. Hennessy",
    urls: [
      "https://covers.openlibrary.org/b/isbn/9780124077263-L.jpg",
    ],
  },
  {
    filename: "designing-data-intensive.jpg",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    urls: [
      "https://covers.openlibrary.org/b/isbn/9781449373320-L.jpg",
    ],
  },
]

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`))
      }
      const file = fs.createWriteStream(dest)
      res.pipe(file)
      file.on("finish", () => {
        file.close(() => {
          const stats = fs.statSync(dest)
          if (stats.size < 1000) {
            fs.unlinkSync(dest)
            return reject(new Error(`File too small (${stats.size}b) - likely placeholder`))
          }
          resolve(stats.size)
        })
      })
    }).on("error", (err) => {
      if (fs.existsSync(dest)) fs.unlinkSync(dest)
      reject(err)
    })
  })
}

async function main() {
  for (const book of books) {
    const dest = path.join(outDir, book.filename)
    let downloaded = false
    for (const url of book.urls) {
      try {
        console.log(`Trying ${url} -> ${book.filename}...`)
        const size = await download(url, dest)
        console.log(`✓ Downloaded ${book.filename} (${size} bytes) from ${url}`)
        downloaded = true
        break
      } catch (e) {
        console.log(`  Failed: ${e.message}`)
      }
    }
    if (!downloaded) {
      console.error(`✗ Failed to download any cover for ${book.title}`)
    }
  }
}

main()
