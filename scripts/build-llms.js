import fs from 'fs/promises'

const mdFiles = [
    './src/lib/content/resume/Introduction.svx',
    './src/lib/content/resume/EmploymentHistory.svx',
    './src/lib/content/resume/Education.svx',
    './src/lib/content/resume/Skills.svx',
    './src/lib/content/resume/References.svx',
    './src/lib/content/resume/AdditionalNotes.svx',
    './src/lib/content/projects/Introduction.svx',
    './src/lib/content/testimonials/Introduction.svx',
]

let promises = []
for (const file of mdFiles) {
    promises.push(fs.readFile(file, 'utf-8'))
}

Promise.all(promises).then((files) => {
    let llmsTxt = ''
    for (const file of files) {
        llmsTxt += file + '\n\n'
    }
    fs.writeFile('./static/llms.txt', llmsTxt)
})
