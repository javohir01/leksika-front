import React from "react";
import "./Grammar.css";
import Accordion from "../Accordion/Accordion";
const Grammar = () => {
  return (
    <div className="grammar-container">
      <h1>Table of Contents</h1>
      <ul className="grammar-list">
        <li className="grammar-item">
          <Accordion
            title="Present va past"
            index={1}
            id={[1, 2, 3, 4, 5, 6]}
            answer={[
              "Present continuous (I am doing) ",
              "Present simple (I do)",
              "Present continuous va present simple (1) (I am doing va I do)",
              "Present continuous va present simple (2) (I am doing va I do)",
              "Past simple (I did)",
              "Past continuous (I was doing)",
            ]}
          />
        </li>
        <li className="grammar-item">
          <Accordion
            title="Present perfect va past"
            index={2}
            id={[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}
            answer={[
              "Present perfect (1) (I have done)",
              "Present perfect (2) (I have done)",
              "Present perfect continuous (I have been doing)",
              "Present perfect continuous va simple (I have been doing va I have done)",
              "How long have you (been) ...?",
              "When ...? va How long ...? For va since",
              "Present perfect va past (1) (I have done va I did)",
              "Present perfect va past (2) (I have done va I did)",
              "Past perfect (I had done)",
              "Past perfect continuous (I had been doing)",
              "Have va have got",
              "Used to (do)",
            ]}
          />
        </li>
        <li className="grammar-item">
          <Accordion
            title="Future"
            index={3}
            id={[19, 20, 21, 22, 23, 24, 25]}
            answer={[
              "Kelasi zamonni ifodalash uchun hozirgi zamon formalari (I am doing / I do) ",
              "(I’m) going to (do)",
              "Will/shall (1)",
              "Will/shall (2)",
              "I will va I’m going to",
              "Will be doing va will have done",
              "When I do / When I’ve done. When va if",
            ]}
          />
        </li>
        <li className="grammar-item">
          <Accordion
            title="Modal fe’llar"
            index={4}
            id={[26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]}
            answer={[
              "Can, could va (be) able to",
              "Could (do) va could have (done) ",
              "Must va can’t",
              "May va might (1)",
              "May va might (1)",
              "Must va have to",
              "Must, mustn’t, needn’t",
              "Should (1)",
              "Should (2)",
              "Had better. It’s time ...",
              "Can / could / Would you...? va hokazolar",
            ]}
          />
        </li>
        <li className="grammar-item">
          <Accordion
            title="Shart mayil gap (conditional) va ‘wish’"
            index={5}
            id={[37, 38, 39, 40]}
            answer={[
              "If I do ... va If I did ...",
              "If I knew ... I wish I knew ...",
              "If I had known... I wish I had known ...",
              "Would. I wish ... would",
            ]}
          />
        </li>
        <li className="grammar-item">
          <Accordion
            title="Fe’lning majhul nisbati (passive) "
            index={6}
            id={[41, 42, 43, 44, 45]}
            answer={[
              "Passive (1) (is done/was done)",
              "Passive (2) (be/been/being done)",
              "Passive (3)",
              "It is said that... He is said to... (Be) supposed to...",
              "Have something done",
            ]}
          />
        </li>
        <li className="grammar-item">
          <Accordion
            title="Ko‘chirma gap (reported speech)"
            index={7}
            id={[46, 47]}
            answer={[
              "Reported speech (1) (He said that...)",
              "Reported speech (2)",
            ]}
          />
        </li>
        <li className="grammar-item">
          <Accordion
            title="Savollar va yordamchi fe’llar"
            index={8}
            id={[48, 49, 50, 51]}
            answer={[
              "Savollar (1)",
              "Savollar (2) (Do you know where ...? / She asked me where ...)",
              "Yordamchi fe’llar (have/do/can va hkz). I think so / I hope so va hkz ",
              "Mini-savollar (do you? isn’t it? va hkz)",
            ]}
          />
        </li>
        <li className="grammar-item">
          <Accordion
            title="-ing va infinitiv"
            index={9}
            id={[
              52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 67, 68,
            ]}
            answer={[
              "Fe’l + -ing (enjoy doing / stop doing va hkz)",
              "Fe’l + to... (decide to do / forget to do va hkz)",
              "Fe’l + (to‘ldiruvchi) + to... (I want (you) to do va hkz)",
              "Fe’l + -ing yoki to... (1) (remember/regret va hkz)",
              "Fe’l + -ing yoki to... (2) (try/need/help)",
              "Fe’l + -ing yoki to... (3) (like/would like va hkz)",
              "Prefer va would rather",
              "Predlog (in/for/about va hkz) + -ing",
              "Be/get used to something (I’m used to ...)",
              "Fe’l + predlog + -ing (succeed in -ing/accuse somebody of -ing va hkz)",
              "Iboralar + -ing",
              "To... for... va so that... (maqsad)",
              "Sifat + to...",
              "To... (afraid to do) va predlog + -ing (afraid of -ing)",
              "See somebody do va see somebody doing",
              "-ing qatnashgan ergash gap (Feeling tired, I went to bed early.)",
            ]}
          />
        </li>
        <li className="grammar-item">
          <Accordion
            title="Artikllar va otlar"
            index={10}
            id={[68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80]}
            answer={[
              "Sanoqli va sanoqsiz otlar (1)",
              "Sanoqli va sanoqsiz otlar (2)",
              "Sanoqli otlarni a/an va some bilan qo‘llash",
              "A/an va the",
              "The (1)",
              "The (2) (School/the school)",
              "The (3) (Children/the children)",
              "The (4) (The giraffe/the telephone/the piano va hkz; the + sifat)",
              "The’ning atoqli otlar bilan qo‘llanilishi (1)",
              "The’ning atoqli otlar bilan qo‘llanilishi (2)",
              "Birlik va ko‘plik",
              "Ot + ot (a tennis ball / a headache va hkz)",
              "-’s (the girl’s name) va of... (the name of the book)",
            ]}
          />
        </li>
        <li className="grammar-item">
          <Accordion
            title="Olmoshlar (pronouns)"
            index={11}
            id={[81, 82, 83, 84, 85, 86, 87, 88, 89, 90]}
            answer={[
              "A friend of mine. My own house. On my own / by myself",
              "Myself/yourself/themselves va hkz",
              "There... va it...",
              "Some va any",
              "No/none/any",
              "Much, many, little, few, a lot, plenty",
              "All/all of, most/most of, no/none of va hkz",
              "Both/both of, neither/neither of, either/either of",
              "All, every va whole",
              "Each va every",
              "",
            ]}
          />
        </li>
        <li className="grammar-item">
          <Accordion
            title="Aniqlovchi ergash gap (relative clauses) "
            index={12}
            id={[91, 92, 93, 94, 95, 96]}
            answer={[
              "Relative clauses (1) - who/that/which",
              "Relative clauses (2) - who/that/which qatnashgan yoki tushib qolgananiqlovchi ergash gaplar",
              "Relative clauses (3) - whose/whom/where",
              "Relative clauses (4) - “qo‘shimcha ma’lumot” ergash gaplari (1)",
              "Relative clauses (4) - “qo‘shimcha ma’lumot” ergash gaplari (2)",
              "-ing va -ed qatnashgan aniqlovchi ergash gap (the woman talking to Tom, the boy injured in the accident)",
            ]}
          />
        </li>
        <li className="grammar-item">
          <Accordion
            title="Sifat (adjective) va ravish (adverb)"
            index={13}
            id={[97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 109, ,111]}
            answer={[
              "-ing va -ed bilan tugaydigan sifatlar (boring/bored va hkz)",
              "Sifatlar: so‘z tartibi (a nice new house) Sifatning fe’ldan keyin qo‘llanilishi (You look tired)",
              "Sifat va ravish (1) (quick/quickly)",
              "Sifat va ravish (2) (well/fast/late, hard/hardly)",
              "So va such",
              "Quite va rather",
              "Qiyosiy daraja (1) - cheaper, more expensive va hkz",
              "Qiyosiy daraja (2)",
              "Qiyosiy daraja (3) - as... as   than",
              "Orttirma daraja - the longest / the most enoyable va hkz",
              "So‘z tartibi (1) - kesim + to‘ldiruvchi; o‘rin va payt",
              "Soz’ tartibi (2) - ravishning kesim bilan qo‘llanilishi",
              "Still, yet va already. Any more / any longer / no longer",
              "Even",
            ]}
          />
        </li>
        <li className="grammar-item">
          <Accordion
            title="Bog‘lovchi (conjunction) va predloglar (preposition)"
            index={14}
            id={[112, 113, 114, 115, 116, 117, 118, 119]}
            answer={[
              "Although/though/even though. In spite of / despite",
              "In case",
              "Unless. As long as va provided/providing",
              "As (sabab va payt)",
              "Like va as",
              "As if",
              "For, during va while",
              "By va until. By the time...",
            ]}
          />
        </li>
        <li className="grammar-item">
          <Accordion
            title="Predloglar (prepositions)"
            index={15}
            id={[120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130,131,132,133,134,135,136]}
            answer={[
              "At/on/in (payt)",
              "On time / in time. At the end / in the end",
              "In/at/on (o‘rin) (1)",
              "In/at/on (o‘rin) (2)",
              "In/at/on (o‘rin) (3)",
              "To/at/in/into",
              "On/in/at (boshqa qo‘llanilishlar)",
              "By",
              "Ot + predlog (reason for, cause of va hkz)",
              "Sifat + predlog (1)",
              "Sifat + predlog (2)",
              "Fe’l + predlog (1) at va to",
              "Fe’l + predlog (2) about/for/of/after",
              "Fe’l + predlog (3) about va of",
              "Fe’l + predlog (4) of/for/from/on",
              "Fe’l + predlog (5) in/into/with/to/on",
              "Ibora fe’llar (get up / break down / fill in va hkz)",
            ]}
          />
        </li>
      </ul>
    </div>
    // <div className={"container123"}>
    //   <h1 style={styles.title}>Table of Contents</h1>
    //   <ul style={styles.list}>
    //     <li style={styles.item}>
    //       {/* <a style={styles.link} href="/grammar/1">
    //         <span style={styles.number}>01</span> Introduction
    //       </a>
    //       <FAQ question="wassap" answer={["First", "Second"]} /> */}
    //       <Accordion title="Introduction" index={1} />
    //     </li>
    //   </ul>
    // </div>
  );
};

export default Grammar;
