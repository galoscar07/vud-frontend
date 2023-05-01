import { useEffect, useState } from "react";
import Newsletter from "../../components/Newsletter/Newsletter";
import Dropdown from "../../components/Dropdown/Dropdown";
import "./Articles.scss";
const ArticlesPage = () => {

    const articles = [
        {
            title: "Title",
            date: "12.04.2022",
            tags: [{ title: "tag1", link: "" }, { title: "tag2", link: '' }],
            banner: "/images/Placeholder.svg",
            preview: "Dacă măcar odată ai roșit atunci când ai primit un compliment, când te-ai simțit stânjenit de vreun comentariu ori când ceva te-a scos din sărite peste măsură atunci deja ai dovada că pielea poate ajuta la exprimarea emoțiilor sau sentimentelor rezultate din interacțiunea cu lumea înconjurătoare. Într-un fel, pielea poate fi considerată ca fiind organul cu cele mai mai dimensiuni. Ea mediază interacțiunea noastră cu mediul în multiple împrejurări de la expunerea la soare (razele ultraviolete) la protecție termică. Reprezintă, în egală măsură, prima barieră contra agenților patogeni de tot felul. Creierul și sistemul nervos influențează capacitatea de apărare a pielii. Se știe deja că anumite tipuri de stres pot influența capacitatea de vindecare a pielii.",
            paragraphs: [
                {
                    headline: "Creierul și sistemul nervos influențează ",
                    content: "Dacă măcar odată ai roșit atunci când ai primit un compliment, când te-ai simțit stânjenit de vreun comentariu ori când ceva te-a scos din sărite peste măsură atunci deja ai dovada că pielea poate ajuta la exprimarea emoțiilor sau sentimentelor rezultate din interacțiunea cu lumea înconjurătoare.Într-un fel, pielea poate fi considerată ca fiind organul cu cele mai mai dimensiuni. Ea mediază interacțiunea noastră cu mediul în multiple împrejurări de la expunerea la soare (razele ultraviolete) la protecție termică. Reprezintă, în egală măsură, prima barieră contra agenților patogeni de tot felul. Creierul și sistemul nervos influențează capacitatea de apărare a pielii. Se știe deja că anumite tipuri de stres pot influența capacitatea de vindecare a pielii. Nu toată lumea răspunde emoțional prin intermediul pielii și nu toată lumea va răspunde la stres cu o afecțiune a pielii. Când acest lucru se întâmplă, există mai multe situații posibile. Prima este aceea în care stresul declanșează sau accentuează o afecțiune a pielii. În această categorie pot intra acneea, dermatitele atopice sau psoriazisul. A doua situație este aceea în care stresul induce o reacție de auto-afectare a pielii. Este cazul tricotilomaniei sau a dermatitelor sau ulcerațiilor autoinduse. Cea de-a treia situație este aceea în care afecțiunea pielii afectează grav imaginea de sine și induce o reacție emoțională care are consecințe mai severe decât boala în sine. În această categorie poate intra vitiligo sau psoriazisul extins. Deci practica sugerează problemele psihologice se pot intersecta cu afecțiunile dermatologice și că abordarea unui tratament care să includă nu numai abordarea medicală ci și cea psihologică poate avea rezultate bune. Ce include abordarea psihoterapeutică a afecțiunilor pielii? Stresul a fost deja identificat ca factor de influența al afecțiunilor dermatologice. Sindromul depresiv sau cel anxios au fost deja identificate ca având prevalență ridicată în cadrul afecțiunilor dermatologice. Problemele de interelaționare în familie sau în afara acestora pot fi un element agravant al dermatitei atopice, de exemplu. Frustrarea intensă sau furia pot fi elemente care să contribuie la întreținerea sau agravarea acneei. Sigur că fiecare caz în parte va avea nevoie de o abordare personalizată dar abordarea generală vizează reducerea stresului și a anxietății și redirecționarea energiei și a resurselor pacientului către vindecare. È˜edințele pot include sesiuni de imagerie dirijată concepute pentru a adresa situația specifică, precum și învățarea de tehnici de relaxare și de meditație. Pielea este interfața noastră cu lumea și de multe ori, este percepută ca fiind cartea noastră de vizită. Atunci când este afectată semnificativ viața de fiecare zi devine chinuitoare. Ne simțim fără valoare, neaaceptabili, respinși, nedreptățiți de viață. Un război pierdut este însă doar cel pe care încetezi să-l mai lupți. Împreună cu un tratament medical adecvat, psihoterapia poate fi un aliat important în mobilizarea resurselor pentru vindecare. Dacă ai împrumutat în mod firesc persoana I a acestei descrieri și te regăsești in aceste situatii, te invit să descoperim împreună motive și soluții. Ma poti contacta la Cabinet Terapie Miruna Stanculescu.",
                    image: "/images/art1.svg",
                }
            ]
        },
        {
            title: "Title 2",
            date: "12.04.2022",
            tags: [{ title: "tag1", link: "" }, { title: "tag2", link: '' }],
            banner: "/images/Placeholder.svg",
            preview: "Dacă măcar odată ai roșit atunci când ai primit un compliment, când te-ai simțit stânjenit de vreun comentariu ori când ceva te-a scos din sărite peste măsură atunci deja ai dovada că pielea poate ajuta la exprimarea emoțiilor sau sentimentelor rezultate din interacțiunea cu lumea înconjurătoare. Într-un fel, pielea poate fi considerată ca fiind organul cu cele mai mai dimensiuni. Ea mediază interacțiunea noastră cu mediul în multiple împrejurări de la expunerea la soare (razele ultraviolete) la protecție termică. Reprezintă, în egală măsură, prima barieră contra agenților patogeni de tot felul. Creierul și sistemul nervos influențează capacitatea de apărare a pielii. Se știe deja că anumite tipuri de stres pot influența capacitatea de vindecare a pielii.",
            paragraphs: [
                {
                    headline: "Creierul și sistemul nervos influențează ",
                    content: "Dacă măcar odată ai roșit atunci când ai primit un compliment, când te-ai simțit stânjenit de vreun comentariu ori când ceva te-a scos din sărite peste măsură atunci deja ai dovada că pielea poate ajuta la exprimarea emoțiilor sau sentimentelor rezultate din interacțiunea cu lumea înconjurătoare.Într-un fel, pielea poate fi considerată ca fiind organul cu cele mai mai dimensiuni. Ea mediază interacțiunea noastră cu mediul în multiple împrejurări de la expunerea la soare (razele ultraviolete) la protecție termică. Reprezintă, în egală măsură, prima barieră contra agenților patogeni de tot felul. Creierul și sistemul nervos influențează capacitatea de apărare a pielii. Se știe deja că anumite tipuri de stres pot influența capacitatea de vindecare a pielii. Nu toată lumea răspunde emoțional prin intermediul pielii și nu toată lumea va răspunde la stres cu o afecțiune a pielii. Când acest lucru se întâmplă, există mai multe situații posibile. Prima este aceea în care stresul declanșează sau accentuează o afecțiune a pielii. În această categorie pot intra acneea, dermatitele atopice sau psoriazisul. A doua situație este aceea în care stresul induce o reacție de auto-afectare a pielii. Este cazul tricotilomaniei sau a dermatitelor sau ulcerațiilor autoinduse. Cea de-a treia situație este aceea în care afecțiunea pielii afectează grav imaginea de sine și induce o reacție emoțională care are consecințe mai severe decât boala în sine. În această categorie poate intra vitiligo sau psoriazisul extins. Deci practica sugerează problemele psihologice se pot intersecta cu afecțiunile dermatologice și că abordarea unui tratament care să includă nu numai abordarea medicală ci și cea psihologică poate avea rezultate bune. Ce include abordarea psihoterapeutică a afecțiunilor pielii? Stresul a fost deja identificat ca factor de influența al afecțiunilor dermatologice. Sindromul depresiv sau cel anxios au fost deja identificate ca având prevalență ridicată în cadrul afecțiunilor dermatologice. Problemele de interelaționare în familie sau în afara acestora pot fi un element agravant al dermatitei atopice, de exemplu. Frustrarea intensă sau furia pot fi elemente care să contribuie la întreținerea sau agravarea acneei. Sigur că fiecare caz în parte va avea nevoie de o abordare personalizată dar abordarea generală vizează reducerea stresului și a anxietății și redirecționarea energiei și a resurselor pacientului către vindecare. È˜edințele pot include sesiuni de imagerie dirijată concepute pentru a adresa situația specifică, precum și învățarea de tehnici de relaxare și de meditație. Pielea este interfața noastră cu lumea și de multe ori, este percepută ca fiind cartea noastră de vizită. Atunci când este afectată semnificativ viața de fiecare zi devine chinuitoare. Ne simțim fără valoare, neaaceptabili, respinși, nedreptățiți de viață. Un război pierdut este însă doar cel pe care încetezi să-l mai lupți. Împreună cu un tratament medical adecvat, psihoterapia poate fi un aliat important în mobilizarea resurselor pentru vindecare. Dacă ai împrumutat în mod firesc persoana I a acestei descrieri și te regăsești in aceste situatii, te invit să descoperim împreună motive și soluții. Ma poti contacta la Cabinet Terapie Miruna Stanculescu.",
                    image: "/images/art1.svg",
                }
            ]
        }
    ]
    const default_adds = {
        'homepage_1': {
            id: 1,
            href: 'www.google.com',
            alt: 'add-1',
            photo: "/images/ads/add7.svg",
            size: '437x437',
        },
        'homepage_2': {
            id: 2,
            href: 'www.google.com',
            alt: 'add-2',
            photo: "/images/ads/add4.svg",
            size: '211x882'
        },
        'homepage_3': {
            id: 3,
            href: 'www.google.com',
            alt: 'add-3',
            photo: "/images/ads/add5.svg",
            size: '154x224'
        },
        'homepage_4': {
            id: 4,
            href: 'www.google.com',
            alt: 'add-4',
            photo: "/images/ads/ad1.svg",
            size: '224x224'
        },
        'homepage_5': {
            id: 5,
            href: "www.google.com",
            alt: "add-5",
            photo: "/images/ads/add9.svg",
            size: "1102x464"
        }

    }
    const [addsToDisplay, setAddsToDisplay] = useState({})
    const label_ads = [
        'homepage_1', 'homepage_2', 'homepage_3', 'homepage_4', 'homepage_5'
    ]
    const [state, setState] = useState('')

    const [tags, setTags] = useState({
        tags: ['tag1', 'tag2', 'tag3'],
    })

    const handleSearch = () => {
        console.log('search')
    }

    const onSelect = (elems) => {
        setState({ ...state, selected: elems })
    }


    useEffect(() => {
        const jsonArray = JSON.parse(localStorage.getItem('ads'));
        const filteredAds = jsonArray.filter(item => item.location.includes('homepage'));
        let dictAdds = {}
        for (const label of label_ads) {
            const exists = filteredAds.find((el) => el.location === label)
            if (exists) {
                dictAdds[label] = exists
            } else {
                dictAdds[label] = default_adds[label]
            }
        }
        setAddsToDisplay(dictAdds)
    })

    return (
        <div className="articles-page">
            <div className="main-content">
                <div className="title">Informatii Medicale</div>
                <div className="search-container">                <form onSubmit={(ev) => { ev.preventDefault() }} className="searchbar">
                    <input value={state} onChange={(ev) => setState(ev.target.value)} className="search" type="text" placeholder="Cauta" name="search" />
                    <button className="button border-button" onClick={handleSearch}>Cauta</button>
                </form>
                    <Dropdown onSelect={onSelect} options={tags} />
                </div>
                <div className="articles-container">
                    {articles.map((article, i) => {
                        return (
                            <div className="article-preview">
                                <div className="text">
                                    <div className="art-title">{article.title}</div>
                                    <div className="date">{article.date}</div>
                                    <div className="content">{article.preview}</div>
                                    <div className="read">Citeste articolul</div>
                                </div>
                                <img className="art-banner" src={article.banner} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="side-content">
                <img className="add"
                    src={addsToDisplay['homepage_2']?.photo} />
                <img className="add"
                    src={addsToDisplay['homepage_3']?.photo} />
                <Newsletter />
                <img className="add"
                    src={addsToDisplay['homepage_4']?.photo} />
            </div>
        </div>
    )
}
export default ArticlesPage;