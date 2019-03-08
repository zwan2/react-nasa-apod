import React, { Component } from 'react';
import ViewerTemplate from './components/ViewerTemplate';
import SpaceNavigator from './components/SpaceNavigator';
import Viewer from './components/Viewer';
import moment from 'moment';
import * as api from './lib/api';

class App extends Component {
  state = {
    loading: false,
    maxDate: null,
    date: null,
    url: null,
    mediaType: null
  }

  //data handling
  getAPOD = async (date) => {
    if (this.state.loading) return; // 이미 요청중이라면 무시

    // 로딩 상태 시작
    this.setState({
      loading: true
    });


    try {
      const response = await api.getAPOD(date);
      const { date: retrievedDate, url, media_type: mediaType } = response.data;


      if (!this.state.maxDate) {
        // 만약에 maxDate 가 없으면 지금 받은 date 로 지정
        this.setState({
          maxDate: retrievedDate
        })
      }

      this.setState({
        date: retrievedDate,
        mediaType: mediaType,
        url: url
      })

    } catch (e) {
      console.log(e);
    };

    // 로딩 상태 종료
    this.setState({
      loading: false
    });
  }

  //state로부터 날짜를 받아서,
  //moment로 하루 전 날짜를 계산해서
  //getAPOD(prevdate)
  handlePrev = () => {
    const { date } = this.state;
    const prevDate = moment(date).subtract(1, 'day').format('YYYY-MM-DD');
    console.log(prevDate);

    this.getAPOD(prevDate);
  }

  handleNext = () => {
    const { date } = this.state;
    const nextDate = moment(date).add(1, 'day').format('YYYY-MM-DD');
    console.log(nextDate);
    this.getAPOD(nextDate);
  }

  componentDidMount() {
    this.getAPOD();
  }

  render() {
    const { date, url, mediaType, loading } = this.state;
    const { handlePrev, handleNext } = this;
    return (

      <ViewerTemplate
        date={date}
        spaceNavigator={<SpaceNavigator onPrev={handlePrev} onNext={handleNext} />}
        viewer={(
          <Viewer
            url={url}
            mediaType={mediaType}
            loading={loading}
          />
        )}
      />

    );
  }
}

export default App;
