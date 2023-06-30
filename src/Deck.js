import React, {Component} from "react";
import Card from "./Card";
import axios from "axios";
const API_BASE_URL="https://www.deckofcardsapi.com/api/deck"

class Deck extends Component{
    constructor(props){
        super(props);
        this.state={
            deck:null,
            drawn:[]
        }
        this.getCard=this.getCard.bind(this)
    }
    async componentDidMount(){
        let deck=await axios.get(`${API_BASE_URL}/new/shuffle/`);
        this.setState({
            deck:deck.data
        });
    }
    async getCard(){
        let deck_id=this.state.deck.deck_id;
        try{
            let cardUrl=`${API_BASE_URL}/${deck_id}/draw/`;
            let cardRes= await axios.get(cardUrl);
            if(!cardRes.data.success){
                throw new Error("No Cards Remaing");
            }
            let card=cardRes.data.cards[0];
            console.log(cardRes.data)
            this.setState(st => ({
                drawn:[
                    ...st.drawn,
                    {id:card.code,
                    image:card.image,
                name:`${card.value} of ${card.suit}`}
                ]
            }));
        }catch(err){
            alert(err);
        }
    }
    render(){
        const cards=this.state.drawn.map(c =>(
            <Card key={c.id} name={c.name} image={c.image} />
        ));
        return (
            <div className="Deck">
                <h1 className="Deck-title">Card dealer</h1>
                <h2 className="Deck-title subtitle">my react demo</h2>
                <button className="deck-btn" onClick={this.getCard}>get card</button> 
            <div className="deck-cardArea">{cards}</div>
            </div>
        )
    }
}
export default Deck