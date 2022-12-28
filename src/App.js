import logo from './logo.svg';
import './App.css';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { CreateCreditCardForm } from './components/CreateCreditCardForm';

function getCreditAccounts(){
  return axios.get(`${process.env.REACT_APP_API_BASE}/creditaccounts`)
}
function App() {
  const queryClient = useQueryClient();
  const query = useQuery('creditaccounts', getCreditAccounts);
  if(query.isLoading){
    return <div>Loading..</div>
  }
  const creditCards = query.data.data || {};
  return (
    <div className="App">
      <h2>Credit card System</h2>
      <CreateCreditCardForm onSuccessFullAdd={(creditCard)=>{
        creditCards.push(creditCard);
      }}></CreateCreditCardForm>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Card Number</th>
            <th>Balance</th>
            <th>Card Limit</th>
          </tr>
        </thead>
        <tbody>
          {creditCards.map((e,i)=><tr key={i}>
            <td>{e.name}</td>
            <td>{e.cardNo}</td>
            <td>${e.balance}</td>
            <td>${e.amountLimit}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}

export default App;
