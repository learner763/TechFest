import { useState,useEffect, useRef } from "react";
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

export default function Dashboard()
{
    const [event_input,set_event_input]=useState('All')
    const [event_category,set_event_category]=useState('All Events')
    const [filtered_events,set_filtered_events]=useState([]);
    const [your_events,set_your_events]=useState(0);
    const [ready,set_ready]=useState(false);
    const nav=useNavigate()
    const [events_information,set_event_information]=useState(
        [
            {image:'gaming1.png',title:'Valorant Championship',punch_line:'Compete in the ultimate 5v5 tactical shooter tournament',date:'December 1, 2025',time:'10:00 AM - 6:00 PM',location:'Main Arena, Hall A',registrations:0,trophy:'$5,000 Prize Pool',code:'gaming1',registered:false,difficulty:'Advanced'},
            {image:'gaming2.png',title:'CS:GO Tournament',punch_line:'Classic competitive Counter-Strike action',date:'December 1, 2025',time:'2:00 PM - 8:00 PM',location:'Gaming Zone, Hall B',registrations:0,trophy:'$3,000 Prize Pool',code:'gaming2',registered:false,difficulty:'Intermediate'},
            {image:'gaming3.png',title:'FIFA 25 Cup',punch_line:'Solo football gaming championship',date:'December 2, 2025',time:'11:00 AM - 5:00 PM',location:'Sports Gaming Area',registrations:0,trophy:'$1,500 Prize Pool',code:'gaming3',registered:false,difficulty:'Beginner'},
            {image:'electronics1.png',title:'Robotics Challenge',punch_line:'Build and program robots to complete obstacle course',date:'December 1, 2025',time:'9:00 AM - 5:00 PM',location:'Electronics Lab, Building C',registrations:0,trophy:'$4,000 + Equipment Sponsorship',code:'electronics1',registered:false,difficulty:'Advanced'},
            {image:'electronics2.png',title:'Circuit Design Sprint',punch_line:'Design and implement functional electronic circuits',date:'December 2, 2025',time:'10:00 AM - 4:00 PM',location:'Maker Space, Hall D',registrations:0,trophy:'$2,500 Prize Pool',code:'electronics2',registered:false,difficulty:'Intermediate'},
            {image:'electronics3.png',title:'IoT Innovation Challenge',punch_line:'Create innovative IoT solutions for real-world problems',date:'December 3, 2025',time:'9:00 AM - 6:00 PM',location:'Innovation Hub',registrations:0,trophy:'$6,000 + Mentorship',code:'electronics3',registered:false,difficulty:'Advanced'},
            {image:'coding1.png',title:'Algorithm Sprint',punch_line:'Solve complex algorithmic problems under time pressure',date:'December 1, 2025',time:'1:00 PM - 5:00 PM',location:'Computer Lab 1',registrations:0,trophy:'$3,500 Prize Pool',code:'coding1',registered:false,difficulty:'Advanced'},
            {image:'coding2.png',title:'Web Dev Challenge',punch_line:'Build a complete web application in 6 hours',date:'December 2, 2025',time:'10:00 AM - 4:00 PM',location:'Computer Lab 2',registrations:0,trophy:'$2,000 + Internship Opportunity',code:'coding2',registered:false,difficulty:'Intermediate'},
            {image:'coding3.png',title:'AI/ML Hackathon',punch_line:'Develop machine learning solutions for given datasets',date:'December 2, 2025',time:'9:00 AM - 9:00 PM',location:'AI Research Center',registrations:0,trophy:'$7,000 + Cloud Credits',code:'coding3',registered:false,difficulty:'Advanced'},
            {image:'coding4.png',title:'Code Golf Championship',punch_line:'Write the shortest code to solve programming challenges',date:'December 3, 2025',time:'2:00 PM - 6:00 PM',location:'Computer Lab 3',registrations:0,trophy:'$1,500 Prize Pool',code:'coding4',registered:false,difficulty:'Intermediate'},
            {image:'coding5.png',title:'Capture The Flag',punch_line:'Cybersecurity competition with hacking challenges',date:'December 3, 2025',time:'10:00 AM - 6:00 PM',location:'Security Lab',registrations:0,trophy:'$4,500 Prize Pool',code:'coding5',registered:false,difficulty:'Advanced'},
            {image:'coding6.png',title:'Mobile App Sprint',punch_line:'Design and develop a mobile app prototype in one day',date:'December 3, 2025',time:'9:00 AM - 5:00 PM',location:'Mobile Dev Studio',registrations:0,trophy:'$2,500 + App Store Credits',code:'coding6',registered:false,difficulty:'Beginner'},
        ]
    );
    
    useEffect(()=>
    {
        if(!localStorage.getItem('token') || localStorage.getItem('email') || !localStorage.getItem('logged_in')){nav('/')}
        fetch('/dashboard/my_registered_events',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                token:localStorage.getItem('token')
            })
        })
        .then(responce=>responce.json())
        .then(data=>
        {
            if(data.success)
            {
                document.getElementById('name').innerHTML=data.name
                set_your_events(data.events.length)
                set_event_information(prev=>
                {
                    let previous=[...prev]
                    for(let i=0;i<data.events.length;i++)
                    {
                        for(let j=0;j<previous.length;j++)
                        {
                            if(previous[j].title===data.events[i])
                            {
                                previous[j].registered=true
                            }
                        }
                    }
                    return previous
                }
                )
            }
            else{
                nav('/')
            }
            set_ready(true)
        })
    },[])

    useEffect(()=>{
        set_event_information(prev=>
        {
            let previous=[...prev];
            let filtered=previous.filter(x=>
            {
                if(event_input==='All')
                {
                    if(event_category==='All Events'){return true;}
                    else if(event_category==='gaming' && x.code.startsWith('gaming')){return true;}
                    else if(event_category==='coding' && x.code.startsWith('coding')){return true;}
                    else if(event_category==='electronics' && x.code.startsWith('electronics')){return true;}
                }
                else if(event_input==='My')
                {
                    if(x.registered){return true;}
                }
            })
            set_filtered_events(filtered)
            return previous;
        })
    },[event_input,event_category]);

    return(
        <>
            <div className="circle" style={{display:ready?'none':'flex'}}>    
                <div className='loader' style={{width:'50px',height:'50px',borderRadius:'50%',border:'5px solid white',borderTop:'5px solid #ff008e',animation:'spin 1s linear infinite'}}></div>
            </div>
            <div className="top_bar" style={{display:ready?'flex':'none'}}>
                <div>
                    <label>TechFest 2025</label>
                    <label>December 1-3, 2025</label>
                </div>
                <i className="fas fa-user"></i>
                <label id='name'></label>
                <button onClick={()=>{localStorage.removeItem('logged_in');nav('/')}}>Logout</button>
            </div>
            <div className="events_menu" style={{display:ready?'flex':'none'}}>
                <div className="event_nav">
                    <label onClick={()=>event_input!=='All'?set_event_input('All'):''}
                    style={{ borderRadius:'10px 0px 0px 10px',backgroundColor:event_input==='All'?"white":"#ff008e",color:event_input==='All'?"#ff008e":"white"}}>All Events</label>
                    <label onClick={()=>event_input!=='My'?set_event_input('My'):''}
                    style={{borderRadius:'0px 10px 10px 0px',backgroundColor:event_input==='My'?"white":"#ff008e",color:event_input==='My'?"#ff008e":"white"}}>My Events({your_events})</label>
                </div>
                <browse_label>{event_input==='All'?'Browse Events':'My Registered Events'}</browse_label>
                <reg_label>{event_input==='All' ?'Register for gaming, electronics, and coding competitions':'Track and manage your event registrations'}</reg_label>
            </div>
            <div className="categories" style={{display:event_input==='All' && ready?'flex':'none'}}>
                <label onClick={()=>event_category!=='All Events'?set_event_category('All Events'):''}
                style={{ borderRadius:'10px 0px 0px 10px',color:event_category==='All Events'?'black':'white',backgroundColor:event_category==='All Events'?'white':'black'}}>All Events</label>
                <label onClick={()=>event_category!=='gaming'?set_event_category('gaming'):''}
                style={{color:event_category==='gaming'?'black':'white',backgroundColor:event_category==='gaming'?'white':'black'}}>Gaming</label>
                <label onClick={()=>event_category!=='electronics'?set_event_category('electronics'):''}
                style={{color:event_category==='electronics'?'black':'white',backgroundColor:event_category==='electronics'?'white':'black'}}>Electronics</label>
                <label onClick={()=>event_category!=='coding'?set_event_category('coding'):''}
                style={{borderRadius:'0px 10px 10px 0px',color:event_category==='coding'?'black':'white',backgroundColor:event_category==='coding'?'white':'black'}}>Coding</label>
            </div>
            {filtered_events.map((value,index)=> 
            index<parseInt(filtered_events.length/2)+(filtered_events.length%2===0?0:1)?
            (
                <div className="event_details" style={{display:ready?'flex':'none'}}>
                    <div className="event_card" data-index={filtered_events[index*2].code}>
                        <img src={`/static/${filtered_events[index*2].image}`} />
                        <div>
                            <event_title>{filtered_events[index*2].title}</event_title>
                            <difficulty>{filtered_events[index*2].difficulty}</difficulty>
                        </div>
                        <punch_line>{filtered_events[index*2].punch_line}</punch_line>
                        <date><i class="fa-solid fa-calendar" style={{marginRight:'15px'}}></i>{filtered_events[index*2].date}</date>
                        <time_info><i class="fa-solid fa-clock" style={{marginRight:'12px'}}></i>{filtered_events[index*2].time}</time_info>
                        <location_info><i class="fa-solid fa-location-dot" style={{marginRight:'18px'}}></i>{filtered_events[index*2].location}</location_info>
                        <trophy><i class="fa-solid fa-trophy" style={{marginRight:'11px'}}></i>{filtered_events[index*2].trophy}</trophy>
                        <button onClick={(e)=>{
                            if(e.target.disabled){return}
                            e.target.disabled=true
                            fetch('/dashboard/event_registration',{
                                method:'POST',
                                headers:{'Content-Type':'application/json'},
                                body:JSON.stringify({event_title:filtered_events[index*2].title,token:localStorage.getItem('token'),operation:e.target.innerText==='Register Now'?'add':'remove',code:filtered_events[index*2].code})
                            })
                            .then(response=>response.json())
                            .then(data=>{
                                set_event_information(prev=>
                                {
                                    let previous=[...prev];
                                    if(event_input!=='My')
                                    {
                                        if(e.target.innerText==='Register Now')
                                        {
                                            set_your_events(your_events+1)
                                        }
                                        else{set_your_events(your_events-1)}
                                        previous[previous.findIndex(x=>x.code===data.code)].registered=e.target.innerText==='Register Now'?true:false;
                                    }
                                    else{
                                        set_your_events(your_events-1)
                                        previous[previous.findIndex(x=>x.code===data.code)].registered=false;
                                        let filtered=previous.filter(x=>x.registered)
                                        set_filtered_events(filtered)
                                    }
                                    e.target.disabled=false
                                    return previous;
                                })
                            })
                        }}
                        style={{alignSelf:'stretch',fontWeight:'bold',color:filtered_events[index*2].registered?'#ff008e':'white',backgroundColor:filtered_events[index*2]?.registered?'white':'#ff008e',border:'1px white solid'}}>{ filtered_events[index*2].registered?'Unregister':'Register Now'}</button>
                    </div>
                    
                    <div className="event_card" data-index={!filtered_events[index*2+1]?'':filtered_events[index*2+1].code} style={{display:!filtered_events[index*2+1]?'none':'flex'}}>
                        <img src={!filtered_events[index*2+1]?'':`/static/${filtered_events[index*2+1].image}`} />
                        <div>
                            <event_title>{!filtered_events[index*2+1]?'':filtered_events[index*2+1].title}</event_title>
                            <difficulty>{!filtered_events[index*2+1]?'':filtered_events[index*2+1].difficulty}</difficulty>
                        </div>
                        <punch_line>{!filtered_events[index*2+1]?'':filtered_events[index*2+1].punch_line}</punch_line>
                        <date><i class="fa-solid fa-calendar" style={{marginRight:'15px'}}></i>{!filtered_events[index*2+1]?'':filtered_events[index*2+1].date}</date>
                        <time_info><i class="fa-solid fa-clock" style={{marginRight:'12px'}}></i>{!filtered_events[index*2+1]?'':filtered_events[index*2+1].time}</time_info>
                        <location_info><i class="fa-solid fa-location-dot" style={{marginRight:'18px'}}></i>{!filtered_events[index*2+1]?'':filtered_events[index*2+1].location}</location_info>
                        <trophy><i class="fa-solid fa-trophy" style={{marginRight:'11px'}}></i>{!filtered_events[index*2+1]?'':filtered_events[index*2+1].trophy}</trophy>
                        <button onClick={(e)=>{
                            if(e.target.disabled){return}
                            e.target.disabled=true                            
                            fetch('/dashboard/event_registration',{
                                method:'POST',
                                headers:{'Content-Type':'application/json'},
                                body:JSON.stringify({event_title:filtered_events[index*2+1].title,token:localStorage.getItem('token'),operation:e.target.innerText==='Register Now'?'add':'remove',code:filtered_events[index*2+1].code})
                            })
                            .then(response=>response.json())
                            .then(data=>{
                                set_event_information(prev=>
                                {
                                    let previous=[...prev];
                                    if(event_input!=='My')
                                    {
                                        if(e.target.innerText==='Register Now')
                                        {
                                            set_your_events(your_events+1)
                                        }
                                        else{set_your_events(your_events-1)}
                                        previous[previous.findIndex(x=>x.code===data.code)].registered=e.target.innerText==='Register Now'?true:false;
                                    }
                                    else{
                                        set_your_events(your_events-1)
                                        previous[previous.findIndex(x=>x.code===data.code)].registered=false;
                                        let filtered=previous.filter(x=>x.registered)
                                        set_filtered_events(filtered)
                                    }
                                    e.target.disabled=false
                                    return previous;
                                })
                            })
                        }}
                        style={{alignSelf:'stretch',fontWeight:'bold',color:filtered_events[index*2+1]?.registered?'#ff008e':'white',backgroundColor:filtered_events[index*2+1]?.registered?'white':'#ff008e',border:'1px white solid'}}>{ filtered_events[index*2+1]?.registered?'Unregister':'Register Now'}</button>
                    </div>
                </div>
            ):'')}</>
    )
}
/*<i class="fa-solid fa-calendar"></i> Calendar
  <i class="fa-solid fa-clock"></i> Clock
  <i class="fa-solid fa-users"></i> People
  <i class="fa-solid fa-location-dot"></i> Location
  <i class="fa-solid fa-trophy"></i> Trophy*/