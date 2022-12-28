import axios from 'axios';
import React from 'react';

async function createCreditAccount(data) {
    return await axios.post('http://localhost:8080/creditaccounts', data);
  }
export class CreateCreditCardForm  extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        data: {},
        errors: []
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        const tempData = {...this.state}
        tempData.data[event.target.name] = event.target.value
      this.setState(tempData);
    }
  
    async handleSubmit(event) {
      event.preventDefault();
      createCreditAccount(this.state.data)
      .catch((res)=>{
        debugger;
        const { response: data} = res;
        const tempData = {...this.state}
        tempData.errors = data.data.errors;
        this.setState(tempData);
        this.props.onSuccessFullAdd()
      });
      
    }
    render(){
        return <>
        {this.state.errors.map(e=><div>{e.defaultMessage}</div>)}
        <form onSubmit={this.handleSubmit}> 
        <div className="container">
          <div className="item">
            <label>Name</label>
            <input type="text" name="name"  value={this.state['name']} onChange={this.handleChange}/>
          </div>
          <div className="item">
            <label>Card Number</label>
            <input type="text" name="cardNo"  value={this.state['cardNo']} onChange={this.handleChange}/>
          </div>
          <div className="item">
            <label>Limit</label>
            <input type="text" name="amountLimit"  value={this.state['amountLimit']} onChange={this.handleChange}/>    
          </div>
          <div className='item'>
            <input type="submit" value="Add Card"/>
          </div>
          </div>
      </form>
        </>
    }
}