import React, { useState } from 'react';
import './App.css';

/* 
※ 첫번째 숙제 
 - 객실관리프로그램 -
1. aryData 값을 useState에 저장한다.
2. .room에 map함수를 이용해 aryData를 리스팅한다.
3. Reservation, Room 컴포넌트에서 객실배정 로직을 구현(이름 입력 => 배정추가)
 예) 101호를 선택하고 "정가을"을 입력 후 배정 버튼을 누르면 해당 객실에 "정가을"이 표시
4. 내림차순 기능 구현. 
5. 배정삭제 기능을 구현.
6. 시간이 남으면 원하는 기능을 추가로 구현
*/

function App() {

  let aryData = ['동주', '정대지', '이누', '정가을', '류뚱'];

  return (
    <div className="app">
      <div className="reservation">
        <input type="text" placeholder="이름을 입력해주세요." />
        <button type="button" >배정</button>
        <label>
          <input type="checkbox" /> 내림차순
        </label>
      </div>
      <ul className="rooms">
        <Room room="1" name={aryData[0]} />
        <Room room="2" name={aryData[1]} />
        <Room room="3" name={aryData[2]} />
        <Room room="4" name={aryData[3]} />
      </ul>
    </div>
  );
}
 

function Room( props ) {
  return (
    <li className="room"> 
      <div className="box">
        <div className="head">
          <p>{props.room}</p> 
          <button type="button" className="cancel">삭제</button>
        </div>
        <div className="name">{props.name}</div>
      </div>
    </li>
  )
}

export default App;
