class App extends React.Component {
		constructor(props) {
			super(props);

			this.deletePurchase = this.deletePurchase.bind(this);
      		this.newPurchase = this.newPurchase.bind(this);
      		this.searchList = this.searchList.bind(this);

			this.state = {
				purchases: [],
				aPurchases: 0,
				jPurchases: 0,
				arrow: '',
				debt: 0
			};
		}

		componentDidMount() {
			this.loadPurchasesFromDatabase();
		}
		
		loadPurchasesFromDatabase() {
			fetch('http://localhost:8080/api/purchases').then((response) => response.json()).then((responseData) => {
				this.setState({purchases: responseData._embedded.purchases});
				this.setState({aPurchases: 0});
				this.setState({jPurchases: 0});
				this.setState({debt: 0});
				
				var i = 0;
				
				for(i = 0; i < this.state.purchases.length; i++){
					
					var name = responseData._embedded.purchases[i].name;
					var sum = responseData._embedded.purchases[i].sum;
					
					if(name === "Aino"){
						this.setState({aPurchases: this.state.aPurchases + sum});
					}
					
					else {
						this.setState({jPurchases: this.state.jPurchases + sum});
					}
				}
				
				if(this.state.aPurchases > this.state.jPurchases){
					
					this.setState({arrow: "/css/arrowLeft.png"});
					this.setState({debt: this.state.aPurchases - this.state.jPurchases});
				}
				
				else if(this.state.aPurchases < this.state.jPurchases){
					
					this.setState({arrow: "/css/arrowRight.png"});
					this.setState({debt: this.state.jPurchases - this.state.aPurchases});
				}
				
				else {
					
					this.setState({arrow: "/css/equalsIcon.png"});
				}
			});
		}
		
		deletePurchase(purchase) {
			fetch(purchase._links.purchase.href, {method: 'DELETE'})
				.then(res => this.loadPurchasesFromDatabase())
				.catch(err => console.error(err))
		}
		
	  newPurchase(purchase) {
      	fetch('http://localhost:8080/api/purchases', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(purchase)
      	})
      	.then( 
          res => this.loadPurchasesFromDatabase()
      )
      .catch( err => console.error(err))
	}
	  
	  searchList(){
		  
		  var input, filter, table, tr, td, i;
		  input = document.getElementById("myInput");
		  filter = input.value.toUpperCase();
		  table = document.getElementById("myTable");
		  tr = table.getElementsByTagName("tr");

		  for (i = 0; i < tr.length; i++) {
		    td = tr[i].getElementsByTagName("td")[0];
		    if (td) {
		      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
		        tr[i].style.display = "";
		      } else {
		        tr[i].style.display = "none";
		      }
		    }
		  }
		}
	  
	render() {
		return (
			<div>
			<div className="panel panel-default">
            <div className="panel-heading" id='panel'>
            <h2 className='heading'>Velkalaskuri</h2>
            <form id='logout' action="/logout" method="post">
            <input type="submit" value="Kirjaudu ulos" className="btn btn-danger"/>
        	</form>
            </div>
            </div>
 				<PurchaseForm 
					newPurchase={this.newPurchase}/>
				<BalanceForm
					aPurchases={this.state.aPurchases}
 					jPurchases={this.state.jPurchases}
 					arrow={this.state.arrow}
 					deletePurchase={this.deletePurchase}
 					purchases={this.state.purchases}
 					debt={this.state.debt}/>
 				<PurchaseTable
					deletePurchase={this.deletePurchase}
					purchases={this.state.purchases}
 					searchList={this.searchList}/>
			</div>
		);
	}
}

class PurchaseTable extends React.Component {
		constructor(props) {
			super(props);
			this.searchList = this.searchList.bind(this);
		}
		
		searchList() {
			
			this.props.searchList();
		}

		render() {
				var purchases = this.props.purchases.map(purchase => <Purchase
					key={purchase._links.purchase.href}
					deletePurchase={this.props.deletePurchase}
					purchase={purchase}/>);
				
				
				
				return (
					<div>
						<input type="text" id="myInput" onKeyUp={this.searchList} placeholder="Hae..."/>
						<table className="table table-striped" id="myTable">
							<thead>
								<tr>
									<th>Nimi</th>
									<th>Päivämäärä</th>
									<th>Kauppa</th>
									<th>Summa</th>
									<th>Lisätiedot</th>
									<th></th>
								</tr>
							</thead>
							<tbody>{purchases}</tbody>
						</table>
					</div>
				);
		}
}

class Purchase extends React.Component {
		constructor(props) {
			super(props);

			this.deletePurchase = this.deletePurchase.bind(this);
		}

		deletePurchase() {
			this.props.deletePurchase(this.props.purchase);
		}

		render() {
				return (
					<tr>
						<td>{this.props.purchase.name}</td>
						<td>{this.props.purchase.date}</td>
						<td>{this.props.purchase.store}</td>
						<td>{this.props.purchase.sum}</td>
						<td>{this.props.purchase.info}</td>
						<td>
							<button className="btn btn-danger" onClick={this.deletePurchase}>Poista</button>
						</td>
					</tr>
				);
		}
}

class PurchaseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', date: '', store: '', sum: null, info: ''};
        this.handleSubmit = this.handleSubmit.bind(this);   
        this.handleChange = this.handleChange.bind(this);     
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }    
    
    handleSubmit(event) {
        event.preventDefault();
        var newPurchaseObject = {name: this.state.name, date: this.state.date, store: this.state.store, sum: this.state.sum, info: this.state.info};
        this.props.newPurchase(newPurchaseObject);        
    }
    
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading" id='createHeading'>Lisää ostos</div>
                <div className="panel-body">
                <form className="form-inline">
                    <div className="col-md-2">
                        <select className="form-control" name="name" onChange={this.handleChange}>
                        	<option selected="selected" disabled="disabled">Valitse...</option>
                        	<option value="Aino">Aino</option>
                        	<option value="Juha">Juha</option>
                        </select>
                    </div>
                    <div className="col-md-2">       
                        <input type="date" placeholder="Päivämäärä" className="form-control" name="date" onChange={this.handleChange}/>
                    </div>
                    <div className="col-md-2">       
                        <input type="text" placeholder="Kauppa" className="form-control" name="store" onChange={this.handleChange}/>
                    </div>
                    <div className="col-md-2">
                        <input type="number" step="0.01" min="0" placeholder="Summa" className="form-control" name="sum" onChange={this.handleChange}/>
                    </div>
                    <div className="col-md-2">       
                        <input type="text" placeholder="Lisätiedot" className="form-control" name="info" onChange={this.handleChange}/>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-success" onClick={this.handleSubmit}>Tallenna</button>   
                    </div>        
                </form>
                </div>      
            </div>         
        );
    }
}

class BalanceForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.deletePurchase = this.deletePurchase.bind(this);
	}
	
	deletePurchase() {
		this.props.deletePurchase(this.props.purchase);
	}
	
	handleSubmit(event) {
        event.preventDefault();
        
        if (confirm("Nollaus poistaa peruuttamattomasti kaikki tallennetut ostokset. Nollataanko balanssi?") == true) {
        	for(var i=0; i < this.props.purchases.length; i++){
            	
            	var entry = this.props.purchases[i];
            	this.props.deletePurchase(entry);
            	
            }
        }
    }
	
    render() {
    	
    	var jPurchases = this.props.jPurchases.toFixed(2);
    	var aPurchases = this.props.aPurchases.toFixed(2);
    	var arrow = this.props.arrow;
    	var debt = this.props.debt.toFixed(2);
       
    	return (
            <div className="panel panel-default" id="balance">
                <div className="panel-heading" id='createHeading'>Balanssi</div>
                <div className="panel-body">
                <form className="form-inline">
                
                	<div className="col-md-4">
                	<h2 className="heading">Aino</h2>
                	<h3 className="heading">{aPurchases} euroa</h3>
                	</div>
                	<div className="col-md-4">
                	<img src={arrow}/>
                	<h3 className="heading">Erotus {debt} euroa</h3>
                	<button className="btn btn-danger" onClick={this.handleSubmit}>Nollaa</button>
                	</div>
                	<div className="col-md-4">
                	<h2 className="heading">Juha</h2>
                	<h3 className="heading">{jPurchases} euroa</h3>
                	</div>
    
                </form>
                </div>      
            </div>         
        );
    }
}

ReactDOM.render(
		<App/>, document.getElementById('root'));