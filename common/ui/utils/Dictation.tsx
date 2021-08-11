import { SpeechSegment } from '@speechly/react-client'
import React from 'react'

type ITaggedWord = {
  word: string
  serialNumber: number
  entityType: string | null
  isFinal: boolean
}

class Dictation {
  public static getDictation(segment: SpeechSegment): ITaggedWord[] {
    // Assign words to a new list with original index (segments.words array indices may not correlate with entity.startIndex)
    const words: ITaggedWord[] = []
    segment.words.forEach(w => {
      words[w.index] = { word: w.value.toLowerCase(), serialNumber: w.index, entityType: null, isFinal: w.isFinal }
    })

    // Tag words with entities
    segment.entities.forEach(e => {
      if (!['date'].includes(e.type)) {
        for (let index = e.startPosition+1; index < e.endPosition; index++) {
          delete(words[index])
        }
        words[e.startPosition].word = e.value
        words[e.startPosition].entityType = e.type
        words[e.startPosition].isFinal = e.isFinal
      } else {
        // Tag words with entities
        words.slice(e.startPosition, e.endPosition).forEach(w => {
          w.entityType = e.type
          w.isFinal = e.isFinal
        })
      }
    })

    // Remove holes from word array
    // words = words.flat()
    words.filter(e=>e)

    // Capitalize first letter
    if (words[0]) {
      words[0].word = words[0].word.slice(0,1).toUpperCase()+words[0].word.slice(1)
    }

    return words
  }

  public static toHTML(words: ITaggedWord[]): JSX.Element {
    return (
      <>
        {words.map<React.ReactNode>((w) => {
          return (
            <span
              className={`${w.entityType !== null ? 'DictationEntity' : ''} ${w.isFinal ? 'Final' : ''} ${w.entityType ?? ''}`}
              key={w.serialNumber}
            >
              {w.word}{' '}
            </span>
          )
        })}
      </>
    )
  }

  public static toText(words: ITaggedWord[]): string {
    return words.map(w => w.word).join(' ')
  }
}

export default Dictation
