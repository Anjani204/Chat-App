const socket = io('http://localhost:8000',{transports:['websocket']})
// const socket = io('http://localhost:8000')

const form=document.getElementById('send-container')
const messageInp=document.getElementById('messageInp')
const messsageContainer=document.querySelector('.container')
var audio=new Audio('ting.mp3')



const append= (message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');    
    messageElement.classList.add(position);
    messsageContainer.append(messageElement);
    if(position=='right'){
        audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();//will not load the page again
    const message=messageInp.value;
    append(`You:${message}`,'left');
    socket.emit('send',message);
    messageInp.value='';
    
}
)
const name=prompt('Enter your name to join')
socket.emit('new-user-joined',name);


socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'left')
})


socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'right')
})


socket.on('left',name=>{
    append(`${name} left the chat`,'left')
})
