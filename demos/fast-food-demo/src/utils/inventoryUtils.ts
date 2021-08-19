import FuzzyStringMatching from '@speechly-demos/common/ui/utils/distanceUtils'
import { IInventoryItemDefinition } from '../../buildconfig'

function getArraySimilarity(a: string[], b: string[]): number {
    return a.filter(element => b.includes(element)).length
}

export function findBestInventoryMatch(
    searchString: string,
    inventory: IInventoryItemDefinition[],
    preferredTags?: string[]): {
        productConfig?: IInventoryItemDefinition,
        score: number,
        tagScore: number
    } {
    // Find best match for utterance
    const searchResults = inventory.reduce<{ productConfig?: IInventoryItemDefinition, score: number, tagScore: number }>((bestFit, p) => {
        p.Keys.forEach(k => {
            const score = FuzzyStringMatching.matchWildcard(String(k), searchString, 0.05)
            if (score <= bestFit.score) {
                if (!preferredTags) {
                    bestFit.score = score
                    bestFit.productConfig = p
                } else {
                    const tagScore = getArraySimilarity(preferredTags, p.Tags)
                    if (score < bestFit.score) {
                        bestFit.score = score
                        bestFit.productConfig = p
                        bestFit.tagScore = tagScore
                    } else if (score === bestFit.score && tagScore > bestFit.tagScore) {
                        bestFit.score = score
                        bestFit.productConfig = p
                        bestFit.tagScore = tagScore
                    }
                }
            }
        })
        return bestFit
    }, { productConfig: undefined, score: Number.POSITIVE_INFINITY, tagScore: 0 })

    return searchResults
}
