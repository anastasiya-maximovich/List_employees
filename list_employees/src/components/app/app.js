import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import { Component } from 'react';
import './app.css';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          data: [
              {name: 'Arizona R.', salary: 1200, increase: true, rise: true, id: 1},
              {name: 'Alex C.', salary: 900, increase: false, rise: false, id: 2},
              {name: 'Derek S.', salary: 1050, increase: false, rise: false, id: 3}
          ]
      }
      this.maxId = 4;
  }

  deleteItem = (id) => {
      this.setState(({data}) => {
          return {
              data: data.filter(item => item.id !== id)
          }
      })
  }

  addItem = (name, salary) => {
      const newItem = {
          name, 
          salary,
          increase: false,
          rise: false,
          id: this.maxId++
      }
      this.setState(({data}) => {
          const newArr = [...data, newItem];
          return {
              data: newArr
          }
      });
  }

//   onToggleIncrease = (id) => {
    // this.setState(({data}) => {               ===================  1 method  =============
    //     const index = data.findIndex(elem => elem.id === id);
    //     const old = data[index];
    //     const newItem = {...old, increase: !old.increase};
    //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

    //     return {
    //         data: newArr
    //     }
    // })
//   }
//     onToggleIncrease = (id) => {
//         this.setState(({data}) => ({                 // ================ 2 method ==================
//         data: data.map(item => {
//             if(item.id === id){
//                 return {...item, increase: !item.increase}
//             } return item;
//         })
//     }))
//   }
//   onToggleRise = (id) => {
//     this.setState(({data}) => ({                 // ================ 2 method ==================
//         data: data.map(item => {
//             if(item.id === id){
//                 return {...item, rise: !item.rise}
//             } return item;
//         })
//     }))
// }
onToggleProp = (id, prop) => {                       // ================ тут мы об\единили два тогла в один ==============
    this.setState(({data}) => ({                 
         data: data.map(item => {
            if(item.id === id){
                return {...item, [prop]: !item[prop]}
            } return item;
        })
    }))
}                            

  render() {
      const employees = this.state.data.length;
      const increased = this.state.data.filter(item => item.increase).length;

      return (
          <div className="app">
              <AppInfo
                employees={employees}
                increased={increased}/>
  
              <div className="search-panel">
                  <SearchPanel/>
                  <AppFilter/>
              </div>
              
              <EmployeesList 
                  data={this.state.data}
                  onDelete={this.deleteItem}
                  onToggleProp={this.onToggleProp}/>
              <EmployeesAddForm
                  onAdd={this.addItem}/>
          </div>
      );
  }
}
export default App;