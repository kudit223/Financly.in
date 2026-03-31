import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import AddExpense from "../components/Modals/AddExpense";
import AddIncome from "../components/Modals/AddIncome";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { toast } from "react-toastify";
import moment from "moment";

function Dashboard() {
  const [user]=useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [transactions,setTransactions]=useState([]);
  const [loading,setLoading]=useState(false);
  const [currentBalance,setCurrentBalance]=useState(0);
  const [totalIncome,setTotalIncome]=useState(0);
  const [totalExpense,setTotalExpense]=useState(0);


  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish=(values,type)=>{
    const newTransaction={
      type:type,
      date:moment(values.date).format('YYYY-MM-DD'),
      amount:parseFloat(values.amount),
      tag:values.tag,
      name:values.name
    };
    addTransaction(newTransaction);
  }

  //add the transaction to firestore
  async function addTransaction(transaction){
    try{
      const docRef=await addDoc(collection(db,`users/${user.uid}/transactions`),transaction)
      console.log('Document Written with ID:',docRef.id);
      toast.success('Transaction Added!');
      let addNewTransactionArray=transactions;
      addNewTransactionArray.push(transaction);
      console.log(addNewTransactionArray)
      setTransactions(addNewTransactionArray);
      updateIncomeAndExpenseAmount();
    }catch(e){
      console.error('Error adding document:',e);
      toast.error("Couldn't add transaction");
    }
  }

  useEffect(()=>{
    if(user)
    fetchTransactions();
  },[user]);

  async function fetchTransactions(){
    setLoading(true);
    if(user){
      const q=query(collection(db,`users/${user.uid}/transactions`));
      const querySnapshot=await getDocs(q);
      let transactionsArray=[];
      querySnapshot.forEach((doc)=>{
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      toast.success('Transactions Fetched!');

    }
    setLoading(false);
  }
  
  useEffect(()=>{
    updateIncomeAndExpenseAmount();
  },[transactions])

  function updateIncomeAndExpenseAmount(){
    let incomeValue=0;
    let expenseValue=0;
    transactions.forEach((item)=>{
      if(item.type=='income') incomeValue+=item.amount;
      else if(item.type=='expense') expenseValue+=item.amount;
    });
    setCurrentBalance(incomeValue-expenseValue);
    setTotalIncome(incomeValue);
    setTotalExpense(expenseValue);
  }


  return (
    <div>
      <Header />
      {loading?<p>Loading....</p>:<>
      <Cards
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
        currentBalance={currentBalance}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
      />

        <AddExpense
        isExpenseModalVisible={isExpenseModalVisible}
        handleExpenseCancel={handleExpenseCancel}
        onFinish={onFinish}
        />
      
       <AddIncome 
       isIncomeModalVisible={isIncomeModalVisible}
       handleIncomeCancel={handleIncomeCancel}
       onFinish={onFinish}
       /> 
       </>}
    </div>
  );
}

export default Dashboard;
