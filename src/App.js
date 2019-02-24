import React, {Component} from 'react';
import './App.css';
import {NumberItem} from './NumberItem';
import _ from 'lodash';

function createNumbers(numbers) {
    let numbersArray = [];
    for (let i = 1; i <= numbers; i++) {
        numbersArray.push({text: (i).toString(), disabled: false});
    }
    return numbersArray;
}

const MaxNumbers = 80;
const One = 1;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfTickets: 5,
            numberOfSelections: 20,
            numberOfDisabled: 0,
            maxNumbers: 80,
            numbers: createNumbers(MaxNumbers),
            tickets: []
        };
    }

    handleClick = (event) => {
        const index = parseInt(event.target.name);
        this.setState((prevState) => {
            const {numbers, numberOfDisabled} = prevState;
            const newNumberOfDisabled = numbers[index - One].disabled ? numberOfDisabled - One : numberOfDisabled + One;
            numbers[index - One].disabled = !numbers[index - One].disabled;
            return {
                numbers,
                numberOfDisabled: newNumberOfDisabled
            };
        });
    };

    createTickets = () => {
        let tickets = [];
        for (let i = 0; i < this.state.numberOfTickets ; i++) {
            let selections = [];
            for (let j = 0; j < this.state.numberOfSelections; j++) {
                selections.push(this.getRandomNumber(selections));
            }
            selections.sort((a,b) => a-b);
            tickets.push(selections);
        }
        this.setState({tickets});
    };

    getRandomNumber = (selections) => {
        let found = false;
        const { maxNumbers, numbers  } = this.state;
        let randomNumber = -1;
        while (!found) {
            randomNumber = Math.floor(Math.random() *  maxNumbers) + One;
            if (!(numbers[randomNumber-One].disabled || _.includes(selections, randomNumber))){
                found = true;
            }
        }
        return randomNumber;
    };

    render() {
        const rows = [];
        for (let i = 0; i < this.state.maxNumbers; i = i + 10) {
            let row = [];
            for (let j = 0; j < 10; j++) {
                const {text, disabled} = this.state.numbers[i + j];
                row.push(
                    <NumberItem key={i + j} disabled={disabled} text={text}
                                handleClick={this.handleClick}/>);
            }
            rows.push(<div key={i}>{row}</div>);
        }

        const ticketRows = this.state.tickets.map((ticket, index) => {
            return <div key={index}>
                <h4>{index+One}.Kupon</h4>
                <p> {ticket.toString()}</p>
            </div>;
        });
        return (
            <div className="App">
                {rows}
                <h4>Toplam Silinen Numara Sayısı: {this.state.numberOfDisabled}</h4>
                <button onClick={this.createTickets}> Kalan Sayilardan Kupon Olustur</button>
                <div style={{ marginTop: 20, fontSize: 15 }}>
                    {ticketRows}
                </div>
            </div>
        );
    }
}

export default App;
