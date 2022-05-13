import React from "react";
import styles from "./App.module.css";
import UniqeButton from "./components/Button/UniqeButton";
import UniqeInput from "./components/Input/UniqeInput";
import Contract from "./contract";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratio: 0,
      amount: "",
      currentAmount: 0,
	  mentalLoss: 0,
      totalAmount: 10,
      compatible: true,
	  isSuccessful: false,
	  isSnatched: false,
	  account: ""
    };
  }

  render() {
    if (this.state.compatible && !this.state.isSuccessful && !this.state.isSnatched)
      return (
        <div className={styles.bg}>
          <div className={styles.card} style={{ width: "50%", height: "50%"}}>
            <h1 style={{marginTop: "50px"}}>FundMe </h1>
            <h4 style={{ marginTop: 10 }}>Your address: {this.state.account.toLocaleString()}</h4>
			
            <div className={styles.container}>
              <div style={{ width: "50%", marginTop: "20px", marginLeft: "83px" }}>

                <div className={styles.back}>
                  <div
                    className={styles.front}
                    style={{ width: `${this.state.ratio}%` }}
                  ></div>
                </div>
				
				<h3 style={{width: "120%", marginTop: "40px", marginLeft: "50px"}} >
                  Progress: {this.state.currentAmount.toLocaleString()} ETH raised of{" "}
                  {this.state.totalAmount.toLocaleString()} ETH
                </h3>
				
              </div>
			  
			  
              <div style={{ marginTop: "30px"}}>
                <UniqeInput
                  onChange={(event) =>
                    this.setState({ amount: event.target.value })
                  }
                  value={this.state.amount}
                  placeholder="ETH amount"
                  height="30px"
                  width="200px"
                />
                <div style={{ marginTop: "25px" }}></div>
                <UniqeButton				
                  onClick={() => {
					if (isNaN(Number(this.state.amount)) || this.state.amount === ""){
						alert('Please input a valid amount!')
					}
					else if (Number(this.state.amount) <= 0){
						alert('Please input a positive amount!')
					}
					else if (Number(this.state.amount) + this.state.currentAmount > this.state.totalAmount){
						alert('You can fund ' + (this.state.totalAmount - this.state.currentAmount) + 'ETH at most!')
					}
					else{
						Contract.fund(this.state.amount);
                    }
                  }}
                >
                  Fund
                </UniqeButton>
				⠀⠀
				<UniqeButton onClick={() => {Contract.refund(this.state.amount);}}>
				  Refund
				</UniqeButton>
				
				
              </div>
            </div>
          </div>
        </div>
      );
	  
	else if (this.state.compatible && !this.state.isSuccessful && this.state.isSnatched)
      return (
        <div className={styles.bg}>
          <div className={styles.card} style={{ width: "50%", height: "50%"}}>
            <h1 style={{marginTop: "40px"}}>FundMe</h1>
			<h3 style={{ marginTop: "0px"}}>Hey! I need 10 ETH for my tuition and {this.state.mentalLoss.toLocaleString()} ETH more for mental loss!</h3>
            <h4 style={{ marginTop: "8px"}}>Your address: {this.state.account.toLocaleString()}</h4>
			
            <div className={styles.container}>
              <div style={{ width: "50%", marginTop: "20px", marginLeft: "83px" }}>

                <div className={styles.back}>
                  <div
                    className={styles.front}
                    style={{ width: `${this.state.ratio}%` }}
                  ></div>
                </div>
				
				<h3 style={{width: "120%", marginTop: "40px", marginLeft: "50px"}} >
                  Progress: {this.state.currentAmount.toLocaleString()} ETH raised of{" "}
                  {this.state.totalAmount.toLocaleString()} ETH
                </h3>
				
              </div>
			  
			  
              <div style={{ marginTop: "30px"}}>
                <UniqeInput
                  onChange={(event) =>
                    this.setState({ amount: event.target.value })
                  }
                  value={this.state.amount}
                  placeholder="ETH amount"
                  height="30px"
                  width="200px"
                />
                <div style={{ marginTop: "25px" }}></div>
                <UniqeButton
                  onClick={() => {
					if (isNaN(Number(this.state.amount)) || this.state.amount === ""){
						alert('Please input a valid amount!')
					}
					else if (Number(this.state.amount) <= 0){
						alert('Please input a positive amount!')
					}
					else if (Number(this.state.amount) + this.state.currentAmount > this.state.totalAmount){
						alert('You can fund ' + (this.state.totalAmount - this.state.currentAmount) + ' ETH at most!')
					}
					else{
						Contract.fund(this.state.amount);
                    }
                  }}
                >
                  Fund
                </UniqeButton>
				⠀⠀
				<UniqeButton onClick={() => {Contract.refund(this.state.amount);}}>
				  Refund
				</UniqeButton>
				
				
              </div>
            </div>
          </div>
        </div>
      );
	
	else if(this.state.compatible && this.state.isSuccessful)
		return (
				<div className={styles.bg}>
				  <div className={styles.card} style={{ width: "50%", height: "50%" }}>
					<div className={styles.container}>
					  <div style={{marginTop: "50px"}}>
						<h1>
						  Thanks for your support!
						</h1>
						<h2 style={{marginTop: "50px"}}>
						  This funding will help Zihao
						</h2>
						<h2>
						  in his further study in Columbia.
						</h2>
						<h3 style={{marginTop: "50px"}}>
						  by: Zihao Huang (zh2481)
						</h3>
						
						<UniqeButton onClick={() => {
							Contract.snatch();
							}}>
						  <strong>Snatch his {this.state.totalAmount.toLocaleString()} eth!</strong>
						</UniqeButton>
						
					  </div>
					  <img src='http://engineering.columbia.edu/files/engineering/NewEngineeringDkBlue.png' style={{marginTop:"20px", width: "85%", height: "15%" }} alt="" />
					</div>
				  </div>
				</div>
			);
	
    else return <NotCompatible />;
  }
  async getAmount() {
    let current = await Contract.current();
    let total = await Contract.total();
    let success_state = await Contract.success();
	let snatch_state = await Contract.snatched();
	let account_addr = await Contract.account();
    this.setState({
      ratio: (current / total) * 100,
      currentAmount: parseFloat(current),
	  mentalLoss: parseFloat(total-10),
      totalAmount: parseFloat(total),
	  isSuccessful: success_state,
	  isSnatched: snatch_state,
	  account: account_addr
    });
    console.log(this.state.ratio);
  }

  componentDidMount() {
    Contract.checkCompatible().then((res) => {
      if (res) {
        this.getAmount();
        setInterval(() => {
          this.getAmount();
        }, 2000);
      } else this.setState({ compatible: false });
    });
  }
}

const NotCompatible = () => {
  return (
    <div
      className={styles.bg}
      style={{
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <h1>Your browser is not Dapps compatible</h1>
    </div>
  );
};

export default App;
