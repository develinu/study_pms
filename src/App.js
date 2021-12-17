import React, { useState } from 'react';
import Modal from 'react-modal'
import './App.css';

/* 
※ 첫번째 숙제 
 - 객실관리프로그램 -
1. aryData 값을 useState에 저장한다.
2. .room에 map함수를 이용해 aryData를 리스팅한다.
3. Reservation, Room 컴포넌트에서 객실배정 로직을 구현(이름 입력 => 배정추가)
4. 내림차순 기능 구현. 
5. 배정삭제 기능을 구현.
6. 시간이 남으면 원하는 기능을 추가로 구현
*/

function App() {

  const [aryData, setAryData] = useState([
    {idx: 0, name: '동주'}, 
    {idx: 1, name: '정대지'}, 
    {idx: 2, name: '이누'}, 
    {idx: 3, name: '정가을'}, 
    {idx: 4, name: '류뚱'}
  ]);
  const [inputName, setInputName] = useState('')
  const [message, messageModify] = useState('')
  const [isCheckedDesc, setIsCheckedDesc] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState('')

  function checkHandler(e) {
    setIsCheckedDesc(!isCheckedDesc)
    sortAryData()
  }

  function sortAryData() {
    console.log(aryData.sort())
    isCheckedDesc 
    ? setAryData(aryData.sort( (a, b) => { return a.idx - b.idx } ))
    : setAryData(aryData.sort( (a, b) => { return b.idx - a.idx } ))
  }

  function reservationValidation() {
    messageModify('')

    if (inputName === '') {
      messageModify('이름을 입력해주세요.')
      return false
    }

    return true
  }

  function addRoom() {
    if (!reservationValidation()) {
      return
    }
    setAryData([...aryData, {idx: aryData.length, name: inputName}])
  }

  function deleteRoom() {
    if (!deleteTarget) {
      return true
    }
    console.log(deleteTarget)

    let _aryData = [...aryData]
    let _findIndex = _aryData.findIndex( (e) => e.idx === deleteTarget.idx )
    _aryData[_findIndex].name = ''
    setAryData(_aryData)
    setModalIsOpen(false)
  }

  function modalOpenHandler(room) {
    setDeleteTarget(aryData.find( (_aryData) => _aryData.idx === room ))
    setModalIsOpen(true)
  }

  return (
    <>
    <div className="app">
      <div className="reservation">
        <input type="text" placeholder="이름을 입력해주세요." onChange={ (e) => { setInputName(e.target.value) } }/>
        <button type="button" onClick={ addRoom }>배정</button>
        <label>
          {isCheckedDesc}
          <input type="checkbox" checked={isCheckedDesc} onChange={checkHandler} /> 내림차순
        </label>
      </div>
      {
        message !== '' 
        ? <div className="select_room_helper">
          <p>{message}</p>
        </div>
        : null
      }
      <ul className="rooms">
      {
        aryData.map( (_aryData) => {
          return (
            <Room key={_aryData.idx} room={_aryData.idx} name={_aryData.name} deleteRoom={modalOpenHandler} />            
          )
        })
      }
      </ul>
      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={() => setModalIsOpen(false)} 
        ariaHideApp={false}
        >
        <div className="deleteForm">
          <span>{deleteTarget.name}님을 삭제 하시겠습니까?</span>
          <div className="btn">
            <button className="btn-delete" type="button" onClick={ deleteRoom }>삭제</button>
            <button className="btn-cancel" type="button" onClick={ () => {setModalIsOpen(false)} } >취소</button>
          </div>
        </div>
      </Modal>
    </div>
    </>
  );
}
 

function Room( props ) {
  return (
    <li className="room"> 
      <div className="box">
        <div className="head">
          <p>{props.room}</p> 
          <button type="button" className="cancel" onClick={ ()=> {props.deleteRoom(props.room)} }>삭제</button>
        </div>
        <div className="name">{props.name}</div>
      </div>
    </li>
  )
}

export default App;