import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import query from 'qs';
import '../../assets/output.css';
import Photos from './Photos';
import Introduction from './Introduction';
import Title from './Title';
import Icons from './Icons';
import Description from './Description';
import CalendarDetail from './CalendarDetail';
import Payment from './Payment';
import Beds from './Beds';
import Reviews from './Reviews';
import Map from './Map';
import Host from './Host';
import ThingsToKnow from './ThingsToKnow';
import RoomDetailHeader from './RoomDetailHeader';
import RoomDetailSafetyModal from './RoomDetailSafetyModal';
import RoomDetailGuestEditModal from './RoomDetailGuestEditModal';
import RoomDetailReviewModal from './RoomDetailReviewModal';

const RoomDetailTemplate = ({ accommodation, loading }) => {
  const {
    gu,
    address,
    title,
    bathroomNum,
    bedroomNum,
    bedNum,
    capacity,
    price,
    latitude,
    longitude,
    transportationDesc,
    accommodationDesc,
    rating,
    reviewNum,
    accommodationType,
    buildingType,
    hostName,
    hostDesc,
    hostReviewNum,
    reviews,
    accommodationPictures,
  } = accommodation;

  const [visible, setVisible] = useState({
    state: false,
    scroll: true,
    type: null,
  });

  // 타입에 맞는 모달창을 보여줌
  const onShowModal = type =>
    setVisible({
      ...visible,
      state: true,
      scroll: false,
      type,
    });

  // 타입에 맞는 Payment 관련 팝업창을 보여줌
  const onShowPopup = type =>
    setVisible({
      ...visible,
      state: true,
      type,
    });

  // 타입에 맞는 모달창을 닫음
  const onCloseModal = ({ target }) => {
    if (target.dataset.name === 'close') {
      console.log(1);
      setVisible({
        ...visible,
        state: false,
        scroll: true,
      });
    }
  };

  const onClosePopup = ({ target }) => {
    // console.log(target.dataset.name);
    if (!target.dataset.name === 'popup') {
      setVisible({
        ...visible,
        state: false,
        scroll: true,
      });
    }
  };

  // 모달창 팝업시 body 스크롤 방지
  useEffect(() => {
    if (!visible.scroll) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [visible.scroll]);

  // 인원수 상태관리
  const [count, setCount] = useState({
    adult: 0,
    child: 0,
    infant: 0,
    status: false,
  });

  // URL query 가져오기
  // http://localhost:3000/accommodation/101?checkIn=2021-03-08&checkOut=2021-03-12&totalNights=4&adult=3&child=2&infant=1&totalGuest=6&totalPrice=294900
  const location = useLocation();
  const qs = query.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  // console.log(qs.checkIn);
  // console.log(qs.checkOut);
  // console.log(qs.adult);
  // console.log(qs.child);
  // console.log(qs.infant);
  // console.log(qs.totalPrice);

  return (
    <>
      {visible.type === 'review' && visible.state && (
        <RoomDetailReviewModal
          onCloseModal={onCloseModal}
          rating={rating}
          reviewNum={reviewNum}
          reviews={reviews}
        />
      )}
      {visible.type === 'safety' && visible.state && (
        <RoomDetailSafetyModal
          onCloseModal={onCloseModal}
          onClosePopup={onClosePopup}
        />
      )}
      {/* {visible.type === 'refund' && visible.state && (
        <RoomDetailRefundModal onCloseModal={onCloseModal} />
      )} */}
      {/* {visible.type === 'date' && visible.state && (
          <RoomDetailDateEditModal onCloseModal={onCloseModal} />
      )} */}
      {visible.type === 'guest' && visible.state && (
        <RoomDetailGuestEditModal onCloseModal={onCloseModal} />
      )}
      <RoomDetailHeader />
      {loading === false && (
        <div className="max-w-screen-2xl mt-32" id="photos">
          <div className="mx-48 px-32">
            <Title
              title={title}
              rating={rating}
              reviewNum={reviewNum}
              address={address}
            />
            <Photos id="photos" accommodationPictures={accommodationPictures} />
          </div>
          <div className="mx-48 px-32 mt-4.8rem flex justify-between">
            <div className="w-3/5">
              <Introduction
                hostName={hostName}
                buildingType={buildingType}
                capacity={capacity}
                bedroomNum={bedroomNum}
                bedNum={bedNum}
                bathroomNum={bathroomNum}
              />
              <Icons
                accommodationType={accommodationType}
                buildingType={buildingType}
              />
              <Description accommodationDesc={accommodationDesc} />
              <Beds bedroomNum={bedroomNum} bedNum={bedNum} />
              <CalendarDetail gu={gu} />
            </div>
            <div className="w-1/3 h-full sticky top-44">
              <Payment
                rating={rating}
                reviewNum={reviewNum}
                price={price}
                visible={visible}
                onShowPopup={onShowPopup}
                onCloseModal={onCloseModal}
                count={count}
              />
              {/* {visible.type === 'date' && visible.state && (
          <RoomDetailDateEditModal onCloseModal={onCloseModal} />
      )} */}
              {visible.type === 'guest' && visible.state && (
                <RoomDetailGuestEditPopup
                  onCloseModal={onCloseModal}
                  count={count}
                  setCount={setCount}
                />
              )}
            </div>
          </div>
          <div className="mx-48 px-32">
            <Reviews
              rating={rating}
              reviewNum={reviewNum}
              reviews={reviews}
              onShowModal={onShowModal}
            />
            <Map
              address={address}
              latitude={latitude}
              longitude={longitude}
              transportationDesc={transportationDesc}
            />
            <Host
              hostName={hostName}
              hostDesc={hostDesc}
              hostReviewNum={hostReviewNum}
            />
            <ThingsToKnow onShowModal={onShowModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetailTemplate;
