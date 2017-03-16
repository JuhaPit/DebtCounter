class App extends React.Component {
		constructor(props) {
			super(props);

			this.deleteStudent = this.deleteStudent.bind(this);

			this.state = {
				students: []
			};
		}

		componentDidMount() {
			this.loadStudentsFromServer();
		}

		// Load students from database
		loadStudentsFromServer() {
			fetch('http://localhost:8080/students').then((response) => response.json()).then((responseData) => {
				this.setState({students: responseData._embedded.students});
			});
		}

		deleteStudent(student) {
			fetch(student._links.student.href, {method: 'DELETE'})
				.then(res => this.loadStudentsFromServer())
				.catch(err => console.error(err))
		}
		
	render() {
		return (
			<div>
				<StudentTable
					deleteStudent={this.deleteStudent}
					students={this.state.students}/>
			</div>
		);
	}
}

class StudentTable extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
				var students = this.props.students.map(student => <Student
					key={student._links.student.href}
					deleteStudent={this.props.deleteStudent}
					student={student}/>);

				return (
					<div>
						<table className="table table-striped">
							<thead>
								<tr>
									<th>Firstname</th>
									<th>Lastname</th>
									<th>Email</th>
									<th></th>
								</tr>
							</thead>
							<tbody>{students}</tbody>
						</table>
					</div>
				);
		}
}

class Student extends React.Component {
		constructor(props) {
			super(props);

			this.deleteStudent = this.deleteStudent.bind(this);
		}

		deleteStudent() {
			this.props.deleteStudent(this.props.student);
		}

		render() {
				return (
					<tr>
						<td>{this.props.student.firstName}</td>
						<td>{this.props.student.lastName}</td>
						<td>{this.props.student.email}</td>
						<td><button className="btn btn-danger" onClick={this.deleteStudent}>Delete</button></td>
					</tr>
				);
		}
}

ReactDOM.render(<App/>, document.getElementById('root'));