import React, { useState } from 'react'
import HeadingPage from '../layout/HeadingPage'
import FooterPage from '../layout/FooterPage'
import NewsPage from '../layout/NewsPage'
import NavPage from '../layout/NavPage'
import SilderPage from '../layout/SilderPage'
import SliderNavPage from '../layout/SliderNavPage'
import Patek from '../layout/Patek'
import FM from '../layout/FM'
import VideoReviewPage from '../layout/VideoReviewPage'
import Modal from '../CompChild/Modal'

function HomePage() {

    return (
        <>
            <div id="container header">
                {/* <Modal/> */}
                {/* Thanh heading */}
                {/* <HeadingPage /> */}
                {/* Phần button + Logo + Cart */}
                {/* <NavPage /> */}
                {/* Phần Hình nền */}
                <SilderPage />
                {/* Phần Thương hiệu nổi bật */}
                <SliderNavPage />
            </div>
            {/* các sản phảm Patek */}
            <img
                className="patek"
                id="patek"
                src="https://www.patek.com/resources/img/background_video/background_video_1920.jpg"
                alt="" />
            <Patek />
            <nav>
                <ul>
                    <li>
                        <a href="/ALL_Product/index.html"> Xem tất cả mẫu Patek</a>
                        <span />
                        <span />
                        <span />
                        <span />
                    </li>
                </ul>
            </nav>
            {/* các sản phảm FM */}
            <img
                className="FM"
                id="FM"
                src="https://mindham.com/2022website/wp-content/themes/twentytwenty-child-revert/assets/images/frankmular_logo.png"
                alt=""
            />
            <FM />
            <nav>
                <ul>
                    <li>
                        <a href="/ALL_Product/index.html"> Xem tất cả mẫu Patek</a>
                        <span />
                        <span />
                        <span />
                        <span />
                    </li>
                </ul>
            </nav>
            {/* Phần video review sản phẩm */}
            <div id='reviewVideo'></div>
            <VideoReviewPage />
            {/* Tin tức */}
            <div id='news'></div>

            <NewsPage />
            {/* Footer */}
            {/* <FooterPage /> */}
        </>


    )
}

export default HomePage