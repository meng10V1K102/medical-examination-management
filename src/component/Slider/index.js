import React, { useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import banner1 from "../../assets/image/slide_1.jpg";
import banner2 from "../../assets/image/slide_2.jpg";

import slide1 from "../../assets/image/slide1.jpg";
import slide2 from "../../assets/image/slide2.jpg";

import Fade from "react-reveal/Fade";
import { Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  background-color: rgba(39, 37, 34, 0.8);
  overflow: hidden;
  padding: 0;
  margin-top: 60px;
  .slick-dots {
    bottom: 5px;
    right: calc(50% - 140px);
    position: absolute;
    display: block;
    align-items: center;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: right;
    & > li button:before {
      background: #ffffff;
      content: "";
      width: 20px;
      height: 3px;
    }
  }
  .button_move_down {
    position: absolute;
    /* width: 100%; */
    margin: 0;
    list-style: none;
    text-align: center;
    padding: 0;
    bottom: 15px;
    display: block;
    left: calc(50% - 10px);
    right: calc(50% - 10px);
  }

  .move_down {
    bottom: 0;
    font-size: 0;
    line-height: 0;
    width: 20px;
    height: 20px;
    cursor: pointer;
    color: #ffffff;
    border: 0;
    outline: none;
    background: transparent;
  }
`;
const CarouselItem = styled.div`
  background: url(${(props) => props.background});
  transition: background 0.5s ease 0s;

  width: 100%;
  height: calc(100vh - 60px);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  color: rgb(255, 255, 255);
  .shadow {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
  }
  .carousel_container {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;

    .carousel_content {
      width: 50%;
      height: 50%;
      & > h2 {
        color: rgb(255, 255, 255);
        font-size: 60px;
        margin-bottom: 100px;
        width: 90%;
        max-width: 960px;
        font-weight: 500;
        line-height: 1.5;
        letter-spacing: normal;
        text-transform: uppercase;
      }
      .slide_des > p {
        font-size: 20px;
      }
    }
  }
  @media only screen and (max-width: 1199px) {
  }
  @media only screen and (max-width: 992px) {
    .carousel_container {
      .carousel_content {
        width: 80%;
        & > h2 {
          font-size: 40px;
          margin-bottom: 50px;
        }
        .slide_des > p {
          font-size: 20px;
        }
      }
    }
  }
  @media only screen and (max-width: 767px) {
  }
  @media only screen and (max-width: 575px) {
    .carousel_container {
      .carousel_content {
        width: 100%;
        padding: 0 25px;

        & > h2 {
          font-size: 30px;
          margin-bottom: 20px;
        }
        .slide_des > p {
          font-size: 16px;
        }
      }
    }
  }
`;

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};
const SliderImg = (props) => {
  const [showSlide, setShowSlide] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow className="next_button" />,
    prevArrow: <PrevArrow className="prev_button" />,
    autoplaySpeed: 4000,
    autoplay: true,
    beforeChange: (current, next) => setShowSlide(next),
    afterChange: (current) => setShowSlide(current),
  };
  const slides = [
    {
      key: 0,
      background: banner1,
      title: "HSSW",
      content: "Content",
      description: (
        <p>
          HSSW l?? b???nh vi???n t?? nh??n thu???c s??? h???u c???a t???p ??o??n SWP490_G14. ???????c
          th??nh l???p v??o ng??y 10/05/2021, HSSW ???? l???y s??? tin d??ng c???a kh??ch h??ng
          v???i nh???ng ????ng g??p to l???n ????nh d???u s??? ph??t tri???n trong n???n y h???c. V???i
          c?? s??? v???t ch???t ti??n ti???n, c??ng ngh??? hi???n ?????i, h???p t??c c??ng ?????i ng??
          chuy??n gia n?????c ngo??i gi??u kinh nghi???m nh?? M???, Nh???t, Singapore HSSW
          d?????ng nh?? ???? tr??? th??nh m???t bi???u t?????ng cho n???n y h???c Vi???t.
        </p>
      ),
    },
    {
      key: 1,
      background: banner2,
      title: "?????i ng?? chuy??n gia",
      content: "Content",
      description: (
        <p>
          HSSW quy t??? ?????i ng?? chuy??n gia, b??c s??, d?????c s?? v?? ??i???u d?????ng ???????c ????o
          t???o b??i b???n ?????n chuy??n s??u t???i Vi???t nam v?? nhi???u n?????c c?? n???n y h???c
          ph??t tri???n nh?? M???, Anh, Ph??p... Lu??n l???y ng?????i b???nh l?? trung t??m, HSSW
          cam k???t mang l???i d???ch v??? ch??m s??c s???c kh???e to??n di???n v?? ch???t l?????ng cao
          cho kh??ch h??ng.
        </p>
      ),
    },
    {
      key: 2,
      background: slide1,
      title: "Ng?????i ti??n phong",
      content: "Content",
      description: (
        <p>
          Ho???t ?????ng kh??ng v?? m???c ti??u l???i nhu???n, HSSW lu??n ti??n phong trong ???ng
          d???ng c??c ph????ng ph??p ??i???u tr??? m???i nh???t th??? gi???i c??ng ch???t l?????ng d???ch
          v??? ho??n h???o ????? tr??? th??nh ?????a ch??? ch??m s??c s???c kh???e ti??u chu???n qu???c t???
          t???i Vi???t Nam.
        </p>
      ),
    },
    {
      key: 3,
      background: slide2,
      title: "Trang thi???t b??? t???i t??n nh???t th??? gi???i",
      content: "Content",
      description: (
        <p>
          S??? h???u kh??ng gian kh??m ch???a b???nh v??n minh, sang tr???ng, hi???n ?????i, HSSW
          ch?? tr???ng ?????u t?? ?????ng b??? h??? th???ng trang thi???t b??? hi???n ?????i h??ng ?????u th???
          gi???i, h??? tr??? hi???u qu??? cho vi???c ch???n ??o??n v?? ??i???u tr???.
        </p>
      ),
    },
  ];
  return (
    <Wrapper>
      <Slider {...settings} className="slider">
        {slides.map((slide) => {
          return (
            <CarouselItem background={slide.background} key={slide.key}>
              <div className="shadow">
                <Fade bottom when={slide.key === showSlide}>
                  <div className="carousel_container">
                    <div className="carousel_content">
                      <h2 className="slide_title">{slide.title}</h2>
                      {/* <p className="slide_content">{slide.content}</p> */}
                      <div className="slide_des">{slide.description}</div>
                    </div>
                  </div>
                </Fade>
              </div>
            </CarouselItem>
          );
        })}
      </Slider>
      <div className="button_move_down">
        <Button
          icon={<DownOutlined style={{ fontSize: "20px" }} />}
          className="move_down"
          onClick={props.scrollTo}
        ></Button>
      </div>
    </Wrapper>
  );
};

export default SliderImg;
