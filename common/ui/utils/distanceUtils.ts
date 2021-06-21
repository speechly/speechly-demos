/* Generated from Java with JSweet 2.2.0-SNAPSHOT - http://www.jsweet.org */
/**
 * Fuzzy String Matching algorithm
 * By Ari Nykänen
 * Loosely based on concepts of Approximate String Matching (ASM)
 * 
 * Usage:
 *
 *   let correctString = "Hello world!"
 *   let userInput = "Hallo world"
 *   let s0 = FuzzyStringMatching.simplifyString(correctString)			// returns "HELLOWORLD"
 *   let s1 = FuzzyStringMatching.simplifyString(userInput)				// returns "HALLOWORLD"
 *   let score = FuzzyStringMatching.match(s0, s1)						// returns 1 (strings differ by 1 edit)
 * 
 * match() calculates "fuzzy edit distance" score
 * Score of 0 means best match
 * Score of 1 means means the string differs by one edit operation
 * Score of 2 means means the string differs by two edit operation and so on
 * 
 * "fuzzy edit distance" roughly corresponding to concept of edit distance:
 * Edit distance is usually defined as the smallest number of defined atomic operations
 * needed to transform one string to another (insert char, delete char, substitute char).
 * 
 * This implementation differs as follows:
 * - strings are "normalized" to use use uppercase 0-9/A-Z/basic punctuaction chars with normalizeString()/simplifyString()
 * - missing char lookup distance is limited (default +3 chars)
 * - optionally, end of string can be de-emhasized
 * - shuffled characters return half score
 * 
 * For further reading, see:
 * - http://en.wikipedia.org/wiki/Approximate_string_matching
 * - http://berghel.net/publications/asm/asm.php
 */
export default class FuzzyStringMatching {
    static MAX_CHAR_LOOKUP = 3;
    public static normalizedChars: string =
        ' !"#$%&\'()*+,-./' +
        '0123456789:;<=>?' +
        '@ABCDEFGHIJKLMNO' +
        'PQRSTUVWXYZ[\\]^_' +
        '\'ABCDEFGHIJKLMNO' +
        'PQRSTUVWXYZ{|}~ ' +
        'E ,F,.++^%S<O Z ' +
        ' \'\'""*--~TS>O ZY' +
        ' !CP$Y||"CA<--R~' +
        'O+23\'M|*,1O>///?' +
        'AAAAAAACEEEEIIII' +
        'DNOOOOOXOUUUUYTS' +
        'AAAAAAACEEEEIIII' +
        'DNOOOOOXOUUUUYTY' +
        'AAAAAACCCCCCCCDD' +
        'DDEEEEEEEEEEGGGG' +
        'GGGGHHHHIIIIIIII' +
        'IIJJJJKKKLLLLLLL' +
        'LLLNNNNNNNNNOOOO' +
        'OOOORRRRRRSSSSSS' +
        'SSTTTTTTUUUUUUUU' +
        'UUUUWWYYYZZZZZZS' +
        'BBBBBBOCCDDDDDEE' +
        'EFFGGHJIKKLLWNNT' +
        'OOGGPPRSSSSTTTTU' +
        'UUVYYZZZZZZZQQTW' +
        'KKKKDDDLLLNNNAAI' +
        'IOOUUUUUUUUUUEAA' +
        'AAAAGGGGKKOOOOZZ' +
        'JDDDGGHPNNAAAAOO' +
        'AAAAEEEEIIIIOOOO' +
        'RRRRUUUUSSTTZZHH' +
        'NDOOZZAAEEOOOOOO' +
        'OOYYLNTJDQACCLTS' +
        'ZGGBUVEEJJQQRRYY';
    public static simplifiedChars: string =
        '                ' +
        '0123456789      ' +
        ' ABCDEFGHIJKLMNO' +
        'PQRSTUVWXYZ     ' +
        ' ABCDEFGHIJKLMNO' +
        'PQRSTUVWXYZ     ' +
        'E  F      S O Z ' +
        '         TS O ZY' +
        '  CP Y   CA   R ' +
        'O 23 M   1O     ' +
        'AAAAAAACEEEEIIII' +
        'DNOOOOOXOUUUUYTS' +
        'AAAAAAACEEEEIIII' +
        'DNOOOOOXOUUUUYTY' +
        'AAAAAACCCCCCCCDD' +
        'DDEEEEEEEEEEGGGG' +
        'GGGGHHHHIIIIIIII' +
        'IIJJJJKKKLLLLLLL' +
        'LLLNNNNNNNNNOOOO' +
        'OOOORRRRRRSSSSSS' +
        'SSTTTTTTUUUUUUUU' +
        'UUUUWWYYYZZZZZZS' +
        'BBBBBBOCCDDDDDEE' +
        'EFFGGHJIKKLLWNNT' +
        'OOGGPPRSSSSTTTTU' +
        'UUVYYZZZZZZZQQTW' +
        'KKKKDDDLLLNNNAAI' +
        'IOOUUUUUUUUUUEAA' +
        'AAAAGGGGKKOOOOZZ' +
        'JDDDGGHPNNAAAAOO' +
        'AAAAEEEEIIIIOOOO' +
        'RRRRUUUUSSTTZZHH' +
        'NDOOZZAAEEOOOOOO' +
        'OOYYLNTJDQACCLTS' +
        'ZGGBUVEEJJQQRRYY';
    /**
     * Returns a normalized version of string
     * @param {string} s
     * @return {string}
     */
    public static normalizeString(s: string): string {
        const work: string[] = Array.from(s)
        for (let i = 0; i < work.length; i++) {
            if (work[i].charCodeAt(0) >= 32 && work[i].charCodeAt(0) <= 591) {
                work[i] = FuzzyStringMatching.normalizedChars.charAt(work[i].charCodeAt(0) - 32)
            }
        }
        return work.join('')
    }
    /**
     * Returns a simplified version of string with all punctuation and whitespace stripped
     * Returned string length may thus differ from original
     * @param {string} s
     * @return {string}
     */
    public static simplifyString(s: string): string {
        const work: string[] = Array.from(s)
        let cc: string
        let j = 0
        for (let i = 0; i < work.length; i++) {
            if (work[i].charCodeAt(0) >= 32 && work[i].charCodeAt(0) <= 591) {
                cc = FuzzyStringMatching.simplifiedChars.charAt(work[i].charCodeAt(0) - 32)
                if (cc !== ' ') work[j++] = cc
            }
        }
        return work.join('').substr(0, j)
    }
    /**
     * Return an approximate "minimal edit distance" between the two words
     * @return 0 when strings match. Otherwise returns approximate number of incorrect chars.
     */
    public static match(s0: string, s1: string): number {
        s0 = FuzzyStringMatching.normalizeString(s0)
        s1 = FuzzyStringMatching.normalizeString(s1)
        if (s1.length > s0.length)
            return FuzzyStringMatching.matchSubstring(s1, s0, 0, s1.length)
        else
            return FuzzyStringMatching.matchSubstring(s0, s1, 0, s0.length)
    }

    /**
    * compares given string to array of strings
    * and returns the one from array that resembles given string the most
    */
    public static getClosestMatch(s0: string, s1: Array<string>): string {
        interface DistanceObject {
            s: string,
            distance: number
        }
        const result: DistanceObject[] = []
        let distance: number
        s1.forEach((s) => {
            if (s1.length > s0.length) {
                distance = FuzzyStringMatching.matchSubstring(s, s0, 0, s.length)
                result.push({ s, distance })
            }
            else {
                distance = FuzzyStringMatching.matchSubstring(s0, s, 0, s0.length)
                result.push({ s, distance })
            }
        })

        const closestMatchingDistanceObject = result.reduce(function (prev, current) {
            return (prev.distance < current.distance) ? prev : current
        })

        return closestMatchingDistanceObject.s
    }
    /**
     * Return an approximate "minimal edit distance" between the two words
     * @return 0 when strings match. Otherwise returns approximate number of incorrect chars.
     * s0 should contain the optional wildcard '*' at end
     */
    public static matchWildcard(s0: string, s1: string, excessCharPenalty = 0): number {
        let excessPenalty = 0
        if (s0.endsWith('*')) {
            s0 = s0.substring(0, s0.length - 1)
            if (s1.length > s0.length) {
                excessPenalty = (s1.length - s0.length) * excessCharPenalty
                s1 = s1.substring(0, s0.length)
            }
        }
        return this.match(s0, s1) + excessPenalty
    }
    /**
     * Return an approximate "minimal edit distance" between the two words
     * Assumes normalized or simplified strings for best function
     * @param {string} s0
     * @param {string} s1
     * @return
     * @return {number}
     */
    public static matchRaw(s0: string, s1: string): number {
        if (s1.length > s0.length)
            return FuzzyStringMatching.matchSubstring(s1, s0, 0, s1.length)
        else
            return FuzzyStringMatching.matchSubstring(s0, s1, 0, s0.length)
    }
    static matchSubstring(s0: string, s1: string, start0: number, end0: number): number {
        let score = 0
        let chnum = 0
        let p0: number = start0
        let p1 = 0
        let c0: string
        let c1: string
        while (p0 < end0 && p1 < s1.length) {
            c0 = s0.charAt(p0)
            c1 = s1.charAt(p1)
            if (c0 === c1) {
                if (chnum === 0)
                    score += 0.5
                else if (chnum === 1)
                    score += 1.5
                else
                    score += 1.0
                chnum++
                p0++
                p1++
            } else {
                let j: number = p1
                while (j < p1 + FuzzyStringMatching.MAX_CHAR_LOOKUP && j + 1 < s1.length && c0 !== c1) {
                    j++
                    c1 = s1.charAt(j)
                }
                if (c0 === c1) {
                    p1 = j
                } else {
                    p0++
                }
                chnum = 0
            }
        }
        score = end0 - start0 - score
        return score
    }
}