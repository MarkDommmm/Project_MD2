import React from 'react'

function VideoReviewPage() {
    return (
        <div>
            <h1 id="review">VIDEO REVIEW ĐÁNH GIÁ SẢN PHẨM</h1>
            <div className="content_review">
                <h5>
                    Kênh youtube chính thức của HH WATCHES 69 chuyên review về các sản phẩm xa
                    xỉ hãy Subscribe để đón xem những video mới nhất nhé.
                </h5>
                <div className="video-review">
                    <iframe
                        width={560}
                        height={315}
                        src="https://www.youtube.com/embed/qavYF96BisU"
                        title="YouTube video player"
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen=""
                    />
                    <iframe
                        width={560}
                        height={315}
                        src="https://www.youtube.com/embed/ajMJ1seNKqo"
                        title="YouTube video player"
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen=""
                    />
                </div>
            </div>
            <nav className="maintenance">
                <ul>
                    <li className="maintenance">
                        <a className="maintenance">Xem thêm Review</a>
                        <span />
                        <span />
                        <span />
                        <span />
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default VideoReviewPage