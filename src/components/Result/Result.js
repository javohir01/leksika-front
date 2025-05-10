"use client"

import { useEffect, useState } from "react"
import classes from "./Result.module.css"
import { HiOutlineVolumeUp } from "react-icons/hi"
import { findEngUzb, findUzbEng } from "../../lib/fetchData.js"
import notFound from "./notFound.png"
import Ellipse from "../../static/Ellipse.svg"
import Example from "../Example/Example"
import { EditOutlined } from "@ant-design/icons"
import { useDispatch } from "react-redux"
import { setAuthModal, setEnUzEditStackModal, setUzEnEditStackModal } from "../../redux/modalSlice"
import { useAuthUser } from "react-auth-kit"
import axios from "axios"

// Cache for word existence checks to avoid redundant API calls
const wordExistenceCache = {}

function Result(props) {
  const [none, setNone] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchAlgo(lang, word) {
      let fetchedData
      if (lang === "English-Uzbek") {
        fetchedData = await (await findEngUzb(word)).json()
        setNone(false)
      } else {
        fetchedData = await (await findUzbEng(word)).json()
        setNone(true)
      }
      const notFound = {
        word: 404,
        desc: 404,
        trnasc: 404,
      }
      if (fetchedData.data == null) {
        setData(notFound)
      } else {
        setData(fetchedData.data)
      }
      console.log(fetchedData, word)
    }
    fetchAlgo(props.lang, props.search)
  }, [props.search, props.lang])

  if (data.word === 404 && props.lang === "English-Uzbek") {
    return <NotFoundEngUzb />
  } else if (data.word !== 404 && props.lang === "English-Uzbek") {
    return <ResulComponent lang={props.lang} data={data} none={none} />
  }
  if (data.word === 404 && props.lang === "Uzbek-English") {
    return <NotFoundUzbEng />
  } else if (data.word !== 404 && props.lang === "Uzbek-English") {
    return <ResulComponent lang={props.lang} data={data} none={none} />
  }
}

function ResulComponent(props) {
  const auth = useAuthUser()()
  const dispatch = useDispatch()
  const [processedDescription, setProcessedDescription] = useState("")
  const [isProcessing, setIsProcessing] = useState(true)

  const start = () => {
    var msg = new SpeechSynthesisUtterance(props.data.word)
    msg.voice = speechSynthesis.getVoices().filter((voice) => voice.lang === "en-US")[0]
    speechSynthesis.speak(msg)
  }

  useEffect(() => {
    // Process description text to add links to words
    async function processDescriptionText() {
      if (!props.data.description) {
        setProcessedDescription("")
        setIsProcessing(false)
        return
      }

      try {          
        const description = props.data.description
        const wordsToCheck = []

        if(props.lang === "English-Uzbek") {
          // So'zlarni aniqlash uchun yangilangan regexlar
          const numberedPointsRegex = /(\d+\))\s*([\w’‘`']+(?:,\s*[\w’‘`']+)*)/g
          const italicTagsRegex = /<i>[^<]+<\/i>(?:\s*<br>\s*|\s*)([a-zA-Z''ʼ'`]+)(?!\s*\d+\))/g
          const afterItalicWithBrRegex = /<i>[^<]+<\/i>\s*<br>\s*([a-zA-Z''ʼ'`]+)(?!\s*\d+\))/g
          const semicolonSeparatedRegex = /;\s*([a-zA-Z''ʼ'`]+)(?!\s*\d+\))/g
          const paragraphTagsRegex = /<p>(?:<em>[^<]+<\/em>)?\s*([a-zA-Z''ʼ'`]+(?:\s*[a-zA-Z''ʼ'`]+)*)/g

          // 1. Raqamli nuqtalar (numbered points)
          const numberedMatches = [...description.matchAll(numberedPointsRegex)]
          numberedMatches.forEach((match) => {
            const wordList = match[2].split(/,\s*/)
            wordList.forEach((word) => {
              if (word.trim().length > 1) {
                wordsToCheck.push(word.trim())
              }
            })
          })

          // 2. <i> teglaridan keyin keladigan so'zlar
          const italicMatches = [...description.matchAll(italicTagsRegex)]
          italicMatches.forEach((match) => {
            const word = match[1].trim()
            if (word.length > 1) {
              wordsToCheck.push(word)
            }
          })

          // 3. <i> tegidan keyin <br> bo'lgan holat
          const afterItalicBrMatches = [...description.matchAll(afterItalicWithBrRegex)]
          afterItalicBrMatches.forEach((match) => {
            const word = match[1].trim()
            if (word.length > 1) {
              wordsToCheck.push(word)
            }
          })

          // 4. Verguldan keyin keladigan so'zlar
          const semicolonMatches = [...description.matchAll(semicolonSeparatedRegex)]
          semicolonMatches.forEach((match) => {
            const word = match[1].trim()
            if (word.length > 1) {
              wordsToCheck.push(word)
            }
          })
            // 5. <p> teglaridagi so'zlar (yangi format)
          const paragraphMatches = [...description.matchAll(paragraphTagsRegex)]
          paragraphMatches.forEach((match) => {
            const wordList = match[1].split(/\s+|,\s*/)
            wordList.forEach((word) => {
              const cleanWord = word.trim().replace(/[()]/g, "") // Qavslar ichidagi matnni olib tashlash
              if (cleanWord.length > 1) {
                wordsToCheck.push(cleanWord)
              }
            })
          }) 
        } else {
          const numberedPointsRegex = /(\d+\))\s*([\w’‘`']+(?:,\s*[\w’‘`']+)*)/g
          // const firstLineSemicolonRegex = /^([^;]+(?:;\s*[^;]+)*)/
          const firstLineSingleWordRegex = /^([a-zA-Z''ʼ'`]+(?:\s+[a-zA-Z''ʼ'`]+)*)/

          // 1. Numbered translations (e.g., 1) book, 2) notebook)
          const numberedMatches = [...description.matchAll(numberedPointsRegex)]
          numberedMatches.forEach((match) => {
            const wordList = match[2].split(/,\s*/)
            wordList.forEach((word) => {
              if (word.trim().length > 1) {
                wordsToCheck.push(word.trim())
              }
            })
          })

          // 2. First line with semicolon-separated translations (e.g., dictionary; glossary; vocabulary)
          // const firstLineMatch = description.match(firstLineSemicolonRegex)
          // if (firstLineMatch) {
          //   const firstLineWords = firstLineMatch[1].split(/;\s*/)
          //   firstLineWords.forEach((word) => {
          //     const cleanWord = word.trim().replace(/[<][^>]*[>]/g, "") // Remove any HTML tags
          //     if (cleanWord.length > 1) {
          //       wordsToCheck.push(cleanWord)
          //     }
          //   })
          // }

          // 3. Single word/phrase on the first line (e.g., notebook)
          // if (!firstLineMatch) {
            const singleWordMatch = description.match(firstLineSingleWordRegex)
            if (singleWordMatch) {
              const cleanWord = singleWordMatch[1].trim().replace(/[<][^>]*[>]/g, "") // Remove any HTML tags
              if (cleanWord.length > 1) {
                wordsToCheck.push(cleanWord)
              }
            }
          // }
        }
        console.log("wordsToCheck", wordsToCheck)

        // So'zlar topilmagan bo'lsa, original matnni qaytarish
        if (wordsToCheck.length === 0) {
          setProcessedDescription(description)
          setIsProcessing(false)
          return
        }

        // Takrorlanadigan so'zlarni olib tashlash
        const uniqueWords = [...new Set(wordsToCheck)]
        console.log("uniqueWords", uniqueWords);
        // API orqali so'zlarning mavjudligini tekshirish
        const wordExistsMap = {}
        for (const word of uniqueWords) {
          const cacheKey = `${props.lang}-${word.toLowerCase()}`
          if (wordExistenceCache[cacheKey] !== undefined) {
            wordExistsMap[word] = wordExistenceCache[cacheKey]
          } else {
            const exists = await checkWordExists(word)
            wordExistenceCache[cacheKey] = exists
            wordExistsMap[word] = exists
          }
        }
        console.log("wordExistsMap", wordExistsMap)
        // HTML matnni linklar bilan almashtirish
        let processedHTML = description
        const sortedWords = uniqueWords.sort((a, b) => b.length - a.length)

        for (const word of sortedWords) {
          if (wordExistsMap[word]) {
            const regex = new RegExp(
              `((?<!</?[a-z]+[^>]*>)|(?<=</[a-z]+>))\\b${word.replace(/'/g, "[''`]?")}\\b(?![^<]*>|[^<]*</a>)`,
              "g"
            )
            const targetLang = props.lang === "English-Uzbek" ? "Uzbek-English" : "English-Uzbek"
            const routePrefix = "/en-uz"
            processedHTML = processedHTML.replace(
              regex,
              `<a href="${routePrefix}?s=${encodeURIComponent(word)}&lang=${targetLang}">${word}</a>`
            )
          }
        }

        setProcessedDescription(processedHTML)
      } catch (error) {
        console.error("Error processing description:", error)
        setProcessedDescription(props.data.description)
      } finally {
        setIsProcessing(false)
      }
    }

    processDescriptionText()
  }, [props.data.description, props.lang])

  // Function to check if a word exists in the API
  async function checkWordExists(word) {
    if (!word || word.length < 2) return false

    try {
      let response = null
      if (props.lang === "English-Uzbek") {
        response = await axios.get(`https://back.leksika.uz/words/uz-en?s=${word.toLowerCase()}`)
      } else {
        response = await axios.get(`https://back.leksika.uz/words/en-uz?s=${word.toLowerCase()}`)
      }
      console.log('response',response?.data?.data?.description);
      return (
        response.data &&
        response.data.data &&
        response.data.data.description &&
        response.data.data.description.trim() !== ""
      )
    } catch (error) {
      console.error(`Error checking word "${word}":`, error)
      return false
    }
  }

  return (
    <div className={classes.result}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h2>{props.data.word}</h2>
        <button
          onClick={() => {
            if (!auth) return dispatch(setAuthModal())
            props.lang === "Uzbek-English"
              ? dispatch(setUzEnEditStackModal({ ...props.data, type: "POST" }))
              : dispatch(setEnUzEditStackModal({ ...props.data, type: "POST" }))
          }}
          className={classes.search_btn_search}
        >
          <EditOutlined />
        </button>
      </div>
      {props.data.transc && (
        <div className={classes.resultSound}>
          <HiOutlineVolumeUp style={{ cursor: "pointer" }} onClick={() => start()} />
          <p>/{props.data.transc}/</p>
        </div>
      )}
      <div
        className={classes.description}
        style={{ lineHeight: 1.8 }}
        dangerouslySetInnerHTML={{ __html: isProcessing ? props.data.description : processedDescription }}
      ></div>

      <Example word={props.data.word} />
    </div>
  )
}

const styleClass = {
  lineHeight: "50px",
  fontSize: "20px",
  marginLeft: "50px",
  marginTop: "24px",
  fontStyle: "italic",
}

function NotFoundEngUzb() {
  return (
    <div className={classes.result404}>
      <img src={notFound || "/placeholder.svg"} alt="Shakespear" style={{ textAlign: "center" }} />
      <div className={classes.con} style={{ display: "flex", alignItems: "center" }}>
        <h2 style={{ textAlign: "center" }}> Oops, no such word found!</h2>
        <div
          className={classes.description}
          style={{
            backgroundImage: `url(${Ellipse})`,
            padding: "35px 0",
            textAlign: "center",
          }}
        >
          If you believe there is such a word in the language of <br />
          Shakespeare, please take a few seconds to report it via <br />
          <a href="https://t.me/+998507533366">Telegram</a> or
          <a href="mailto:akbarbankir@gmail.com">Gmail</a> and we will add it asap!
        </div>
      </div>
    </div>
  )
}

function NotFoundUzbEng() {
  return (
    <div className={classes.result404}>
      <img src={notFound || "/placeholder.svg"} alt="Shakespear" style={{ textAlign: "center" }} />
      <div className={classes.con} style={{ display: "flex", alignItems: "center" }}>
        <h2 style={{ textAlign: "center" }}> Oops, no such word found!</h2>
        <div
          className={classes.description}
          style={{
            backgroundImage: `url(${Ellipse})`,
            padding: "35px 0",
            textAlign: "center",
          }}
        >
          If you believe there is such a word in the language of <br />
          Shakespeare, please take a few seconds to report it via <br />
          <a href="https://t.me/+998507533366">Telegram</a> or
          <a href="mailto:akbarbankir@gmail.com">Gmail</a> and we will add it asap!
        </div>
      </div>
    </div>
  )
}

export default Result