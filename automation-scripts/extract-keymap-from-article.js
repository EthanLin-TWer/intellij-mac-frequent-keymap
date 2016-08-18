const fs = require('fs')
const sample = fs.readFileSync('sample.md', 'utf-8').toString()

extractKeymapData(sample)

function sanityCheck(sample) {

}

function extractKeymapData(sample) {
    const all_keymaps = sample.match(/^\|.*\|$/gm).filter(line => !line.includes('---')) // format line
                                .filter(line => !line.includes('Operation'))        // table header line
                                .filter(line => line.replace(/(\|)*/, '').length > 0) // separator


    const indecies = sample.match(/#{3,4}.*/gm).map(section => {
        return {
            title: /#*\s*(.*)（/gm.exec(section)[1],
            index: sample.indexOf(section)
        }
    })
    const sections = []
    for (let i = 0; i < indecies.length - 1; i++) {
        const content = sample.substring(indecies[i].index, indecies[i + 1].index)
        sections.push({
            title: indecies[i].title,
            content: content
        })
    }
    sections.push({
        title: indecies[indecies.length - 1].title,
        content: sample.substring(indecies[indecies.length - 1], sample.length)
    })

    const keymaps = {}
    sections.forEach(section => keymaps[section.title] = [])
    all_keymaps.forEach(keymap => {
        const belongs = sections.filter(section => section.content.includes(keymap))[0].title
        const value = keymap.match(/^(\|.*?)(\|.*?)\|/g)[0].split('|').filter(part => !!part.length)
            .map(part => part.trim())

        keymaps[belongs].push({
            action: value[0],
            shortcut: value[1]
        })
    })

    console.log(keymaps)
}
