const fs = require('fs')
const sample = fs.readFileSync('sample.md', 'utf-8').toString()

sanityCheck(sample)
extractKeymapData(sample)

function sanityCheck(sample) {
    const headerCheck = operationFieldComesBeforeShortcutField(sample)
    const allSectionsWritenInh3Orh4 = markdownStructure(sample)

    if (headerCheck && allSectionsWritenInh3Orh4) { console.log('all check passes') }

    function markdownStructure(sample) {
        const predefined_sections = ['Productivity', 'Live Template', 'Postfix Completion', 'Language Elements',
                                     'Editing', 'Navigation', 'Refactor', 'Searching', 'Runtime']
        return sample.match(/#{3,4}.*/gm).filter(h3orh4 => {
            return predefined_sections.find(pre => h3orh4.includes(pre)) === undefined
        }).length === 0
    }

    function operationFieldComesBeforeShortcutField(sample) {
        return sample.match(/^\|.*\|$/gm).filter(line => { line.includes('Operation')
            && (line.includes('Mac') || line.includes('Windows'))
        }).filter(header => header.match(/(Mac|Windows).*Operation/i)).length === 0
    }
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

    // console.log(keymaps)
}
