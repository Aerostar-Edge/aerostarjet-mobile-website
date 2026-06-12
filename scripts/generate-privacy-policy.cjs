const fs = require('fs')
const path = require('path')

const xmlPath = path.join(process.env.TEMP || '/tmp', 'privacy-docx', 'word', 'document.xml')
const outPath = path.join(__dirname, '..', 'src', 'data', 'privacyPolicy.ts')

const xml = fs.readFileSync(xmlPath, 'utf8')

function decodeXml(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
}

function paragraphText(pXml) {
  const runs = [...pXml.matchAll(/<w:r[^>]*>([\s\S]*?)<\/w:r>/g)]
  return runs
    .map((run) => {
      const bold = /<w:b(?:\s|\/>|\/)/.test(run[1])
      const text = [...run[1].matchAll(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g)]
        .map((match) => decodeXml(match[1]))
        .join('')
      return bold && text ? `**${text}**` : text
    })
    .join('')
    .trim()
}

function paragraphStyle(pXml) {
  const styleMatch = pXml.match(/<w:pStyle w:val="([^"]+)"/)
  return styleMatch ? styleMatch[1] : null
}

function isListItem(pXml) {
  return /<w:ind w:left="720"/.test(pXml)
}

const paragraphs = [...xml.matchAll(/<w:p[^>]*>([\s\S]*?)<\/w:p>/g)].map((match) => ({
  style: paragraphStyle(match[0]),
  list: isListItem(match[0]),
  text: paragraphText(match[1]),
}))

const blocks = []
let listBuffer = []

function flushList() {
  if (listBuffer.length === 0) return
  blocks.push({ type: 'list', items: listBuffer })
  listBuffer = []
}

for (const paragraph of paragraphs) {
  const text = paragraph.text
  if (!text) continue

  if (paragraph.list) {
    listBuffer.push(text)
    continue
  }

  flushList()

  if (paragraph.style === 'Heading1') {
    blocks.push({ type: 'heading', level: 1, text })
    continue
  }

  if (paragraph.style === 'Heading2') {
    blocks.push({ type: 'heading', level: 2, text })
    continue
  }

  blocks.push({ type: 'paragraph', text })
}

flushList()

const file = `export type PrivacyPolicyBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 1 | 2; text: string }
  | { type: 'list'; items: string[] }

export const privacyPolicyMeta = {
  title: 'Privacy Policy',
  subtitle: 'Aerostar Aviation Academy \u2014 aerostarjet.in',
} as const

export const privacyPolicyBlocks: PrivacyPolicyBlock[] = ${JSON.stringify(blocks, null, 2)}
`

fs.writeFileSync(outPath, file, 'utf8')
console.log(`Wrote ${blocks.length} blocks to ${outPath}`)