import React, { useEffect, useState } from "react";
import "./SingleArticle.scss";
import Newsletter from "../../../components/Newsletter/Newsletter";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { API_MAP, getAPILink } from "../../../utils/routes";
import { routes } from "../../../utils/routes";

const SingleArticle = (props) => {

    const [article, setArticle] = useState({
        title: '',
        date_created: '',
        tags: [],
        banner_image: '',
        headline_1: '',
        content_1: '',
        image_1: '',
        headline_2: '',
        content_2: '',
        image_2: ''
    })

    const [loading, setLoading] = useState(true)

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
    const [id, setId] = useState(null);

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

        const query = window.location.search
        const queryParams = new URLSearchParams(query)
        const id = queryParams.get('article_id')
        setId(id);
        fetch(
            getAPILink(API_MAP.GET_ARTICLE + id + '/'), {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((res) => res.json())
            .then((res) => {
                setArticle(res[id-1]);
                setLoading(false)
            })
            .catch((err) => { setLoading(false) })
    }, [])

    const formatDate = (inputString) => {
        const date = new Date(inputString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
        return formattedDate;
    }
    return (
        <div className="article">
            {loading ? <LoadingSpinner />
                :
                <React.Fragment>
                    <div className="main-content">
                        {article && <div className="article-content">
                            <div className="title">{article.title}</div>
                            <span className="date">Date {formatDate(article.date_created)}</span>
                            <div className="tags-container">
                                {article?.tags?.map((tag, i) => {
                                    return (
                                        <div key={i} className="tag">
                                            {tag.name}
                                        </div>
                                    )
                                })}
                            </div>
                            <img className="banner" alt="articol" src={article.banner_image} />
                            <div className="content-container">

                                <div className="para">
                                    <div className="headline">{article.headline_1}</div>
                                    <div className="text" dangerouslySetInnerHTML={{__html: article?.content_1}}></div>
                                   {article.image_1 && <img className="art-img" alt="art-img" src={article.image_1} />}
                                </div>
                                <div className="para">
                                    <div className="headline">{article?.headline_2}</div>
                                    <div className="text" dangerouslySetInnerHTML={{__html: article?.content_2}}></div>
                                    {article.image_2 && <img className="art-img" alt="art-img" src={article.image_2} />}
                                </div>

                            </div>
                        </div>
                        }
                        <img className="add"
                            src={addsToDisplay['homepage_5']?.photo} />
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
                </React.Fragment>}
        </div>

    )
}
export default SingleArticle;
