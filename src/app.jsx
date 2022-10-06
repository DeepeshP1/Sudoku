import { useState, } from 'react'
import axios from 'axios'
import './sudoku.css'
import options from './abc.js'
export function App() {
  const [puzz, setPuzz] = useState([])
  const [Res, setRes] = useState()  
  var newPuzzle = []
  
  
  var arr = [];
   const options = {
    method: 'GET',
    url: 'https://sudoku-generator1.p.rapidapi.com/sudoku/generate',
    
    headers: {
      'X-RapidAPI-Key': '',
      'X-RapidAPI-Host': 'sudoku-generator1.p.rapidapi.com'
    }
  };
  axios.request(options).then(function (response) {
    arr = response.data
    console.log(arr)
  }).catch(function (error) {
    console.error(error);
  });

  var empty = []
  function Store() {
    var puzzle = Array.from(arr.puzzle)
    setPuzz(puzzle)
    puzzle.map((e) => {
      if (empty.length <= 8)
        empty.push(e)
      if (empty.length == 9) {
        newPuzzle.push(empty)
        empty = []
      }
    })
    console.log(puzz)
  }

  function Input() {
    return (
      puzz.map((e, index) => {
        if (e.includes('.') == true)
          return (
            <input onChange={Value}>{e}</input>
          )
        else
          return (
            <div className='para'>
              <p>{e}</p>
            </div>
          )
      }))

  }
  let answer = []
  let answerNew = []
  let answerNeww = []
  let emptyArray = []
  let a = 0;
  function Value(c) {
    answer.push(c.target.value)
  }
  function Result(){
    return(
      <h1 style={{color:'white', marginTop:'1rem'}}>{Res}</h1>
    )
  }
  function Submit() {

    puzz.map((current) => {
      if (current.includes('.')) {
        answerNew.push(answer[a])

        a += 1
      }
      else {
        answerNew.push(current)
      }
    })
    answerNew.map((e) => {
      if (empty.length <= 8)
        empty.push(e)
      if (empty.length == 9) {
        answerNeww.push(empty)
        empty = []
      }
    })
    let columnArray = []
    answerNeww.map(() => {
      columnArray.push([])
    })
    answerNeww.map((current) => {
      let j = 0;
      current.map((e) => {
        columnArray[j++].push(e)
      })
    })
    
    let row;
    answerNeww.map((current) => {
      row = current.filter((e, i) => current.indexOf(e) != i)
      if (row.length > 0)
        emptyArray.push('falseR')
    })
    let col;
    columnArray.map((current) => {
      col = current.filter((e, i) => current.indexOf(e) != i)
      if (col.length > 0)
        emptyArray.push('falseC')
    })
    let Empty = [] 
    function LastArrayIndex() {
      let n = 0
      for (let f = 0; f < 3; f++) {
        for (let m = 0; m < 3; m++) {
          for (let k = 0; k < 3; k++) {
            for (let l = 0; l < 3; l++) {
              Empty.push(n)
              n++
            }
            n += 6
          }
          n -= 24
        }
        n += 18
      }
    }
    let lastArray = []
    LastArrayIndex();
    Empty.map((e) =>{
      if (empty.length <= 8)
        empty.push(answerNew[e])
      if (empty.length == 9) {
        lastArray.push(empty)
        empty = []
      }
    })
    let mix;
    lastArray.map((current) => {
      mix = current.filter((e, i) => current.indexOf(e) != i)
      if (mix.length > 0)
        emptyArray.push('falseM')
    })
    if(emptyArray.length==0){
      setRes('You Won')
    }
    else{
      setRes('You Lost')
    }
        
  }
  return (
    <>  
      <div className='Parent'>
        <h1 id='Heading'>SUDOKU</h1>
        <div className='inputs'><Input /></div>
        <span><button onClick={Store}>Start</button>
        <button onClick={Submit}>Submit</button></span>
        <Result/>
      </div>
      
    </>
  )
}
