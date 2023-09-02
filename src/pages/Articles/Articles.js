import React, { useEffect, useState } from "react";
import Newsletter from "../../components/Newsletter/Newsletter";
import Dropdown from "../../components/Dropdown/Dropdown";
import "./Articles.scss";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { API_MAP, getAPILink } from "../../utils/routes";
import { routes } from "../../utils/routes"
import { useNavigate } from "react-router-dom";

const ArticlesPage = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState({
        title: '',
        date: '',
        tags: [],
        banner: '',
        headline1: '',
        content1: '',
        image1: '',
        headline2: '',
        content2: '',
        image2: ''
    })

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
    const [selected, setSelected] = useState({})

    const [tags, setTags] = useState({
        tags: [],
    })

    const [loading, setLoading] = useState(true)

    const onSelect = (elems) => {
        setSelected(elems)
        fetch(
            getAPILink(API_MAP.GET_ARTICLES + '/' + elems.map(item => "?tags=" + item.label).join("&")), {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-type': 'application/json; charset=UTF-8',
            }
        }
        )
            .then((res) => res.json())
            .then((res) => {
                setArticles(res)
                setLoading(false)
            })
    }

    const formatDate = (inputString) => {
        const date = new Date(inputString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

        return formattedDate;
    }

    const trimText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        const trimmedText = text.slice(0, maxLength - 3) + '...';
        return trimmedText;
    }

    useEffect(() => {
        const jsonArray = JSON.parse(localStorage.getItem('ads') || '[]');
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

        fetch(
            getAPILink(API_MAP.GET_ARTICLES), {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }
        )
            .then((res) => res.json())
            .then((res) => {
                setArticles(res)
                setLoading(false)
            })
        fetch(
            getAPILink(API_MAP.GET_TAGS), {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }
        ).then((res) => res.json())
            .then((res) => {
                setTags(res.map(item => ({
                    value: item.id,
                    label: item.name
                })))
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
            })
    }, [])

    return (

        <div className="articles-page">
            {loading ? <LoadingSpinner />
                :
                <React.Fragment>
                    <div className="main-content">
                        <div className="title">Informatii Medicale</div>
                        <div className="search-container">
                            <Dropdown
                                onSelect={onSelect}
                                options={tags}
                                isMulti />
                        </div>
                        <div className="articles-container">
                            {articles.length >= 0 && articles?.map((article, i) => {
                                return (
                                    <div key={i} className="article-preview">
                                        <div className="text">
                                            <div className="art-title">{article.title}</div>
                                            <div className="date">Date {formatDate(article.date_created)}</div>
                                            <div className="content">{trimText(article.content_1, 300)}</div>
                                            <div className="read" onClick={() => navigate((routes.SINGLE_ARTICLE) + '/?article_id=' + `${article.id}`)}>Citeste articolul</div>
                                        </div>
                                        <img className="art-banner" src={article.banner_image} onError={(event) => event.target.style.display = 'none'}/>
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
                </React.Fragment>
            }
        </div>
    )
}
export default ArticlesPage;
