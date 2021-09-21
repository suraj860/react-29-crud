
import React from "react";
import axios from "axios";

class ContactApp extends React.Component{
    constructor(){
        super();
// declareing states for the data
        this.state = {
            posts: [],
            id: "",
            name: "",
            avatar:"",
            createdAt: ""
        }
    }

    //getData
    getData = async ()=>{
        try{
            let  response = await axios.get("https://611f26499771bf001785c736.mockapi.io/profile");
            this.setState({posts: response.data})
          
        }catch(error){
            console.log(error)
        }
    }
  
// create new data
    createData = async ()=>{
        try{
            let response = await axios.post("https://611f26499771bf001785c736.mockapi.io/profile",{
            name: this.state.name,
            avatar: this.state.avatar
        });
        const data = [...this.state.posts];
        data.push(response.data)
        // console.log(data)
        this.setState({posts:data})
        this.setState({
            id: "",
            name: "",
            avatar:"",
            createdAt: ""
           })
        }catch(error){
            console.log(error)
        }  
        
    }

    //updateData
    updateDetails = async ()=>{
        // console.log(this.state)
       let response = await axios.put("https://611f26499771bf001785c736.mockapi.io/profile/"+ this.state.id,{
           id: this.state.id,
           avatar:this.state.avatar,
           name:this.state.name,
           createdAt:this.state.createdAt
       })
       let prevData = [...this.state.posts]
       let index = prevData.findIndex((item)=>item.id===response.data.id)
       prevData[index] = response.data
       this.setState({posts:prevData})
       this.setState({
        id: "",
        name: "",
        avatar:"",
        createdAt: ""
       })
    }

    //deletData 
    deleteContact = async (id)=>{
        try{
            await axios.delete("https://611f26499771bf001785c736.mockapi.io/profile/"+id)
            // console.log(response.data)
            const data =[...this.state.posts];
            const newData = data.filter((items)=>items.id !== id)
            this.setState({posts:newData})
        }catch(error){
            console.log(error)
        }
    }
    
    componentDidMount(){
        this.getData()
    }

    contactAdder = (e)=>{
        e.preventDefault();
        console.log(this.state.id)
        if(this.state.id !== ""){
            this.updateDetails()
        }else{
            this.createData()
        }
       
    }

 // set the values to the edit values
    updateContact =(post)=>{
        this.setState({
            id: post.id,
            name: post.name,
            createdAt: post.createdAt,
            avatar:post.avatar
        })
       
    }

    
    render(){
        return(
            <>
            <div className="parent-Div">
                {/* form */}
                <form onSubmit = {this.contactAdder}>

                    <input type="text" value ={this.state.name} placeholder="Enter Name"
                    onChange={(event)=>this.setState({name:event.target.value})}></input>

                    <input type="text" value ={this.state.avatar} placeholder="Avatar Link"
                     onChange={(event)=>this.setState({avatar:event.target.value})}></input><br/>
                    
                    <button  className = "submitbtn" type="submit">SUBMIT</button>
                    

                </form>
                {
                    this.state.posts.map((items)=>{
                        const date = new Date(items.createdAt).toDateString()
                        return (
                            <div key={items.id} className="card">
                               <div className="profilePic">
                                   <img src= {items.avatar} alt=""></img>
                               </div>
                               <div className="info">
                                   <p className="name">{items.name}</p>
                                   <p className="date">{date}</p>
                               </div>
                               <div className="aa">
                                   <button className="editbtn" onClick = {()=>{this.updateContact(items)}}>EDIT</button><br/>
                                   <button className="deletebtn" onClick = {()=>{this.deleteContact(items.id)}}>DELETE</button>
                               </div>
                               
                            </div>
                        )
                    })
                }
                
            </div>
            </>
        )
    }
}

export default ContactApp ;